import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createReadStream, readFileSync, statSync } from "node:fs";
import http from "node:http";
import { once } from "node:events";
import path from "node:path";
import test, { after, before } from "node:test";
import { fileURLToPath } from "node:url";

import { PACKAGE_FILES } from "../scripts/build-package.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_FILES = new Set(["index.html", "about.html", "styles.css", "claude-skills.zip", ...PACKAGE_FILES]);
const HTML_FILES = ["index.html", "about.html"];
const SKILL_FILES = PACKAGE_FILES.filter((name) => name !== "skill-file-builder-prompt.md" && name !== "seven-tools-why-when-how.md");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".zip": "application/zip",
};

let server;
let baseUrl;

function source(name) {
  return readFileSync(path.join(ROOT, name), "utf8");
}

function attributes(html, attribute) {
  return [...html.matchAll(new RegExp(`${attribute}=["']([^"']+)["']`, "g"))].map((match) => match[1]);
}

function relativeLinks(html) {
  return attributes(html, "href").filter((href) => !/^(?:https?:|mailto:|#)/.test(href));
}

function frontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, "skill must begin with YAML frontmatter");
  const fields = Object.fromEntries(
    match[1].split("\n").filter(Boolean).map((line) => {
      const separator = line.indexOf(":");
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }),
  );
  return fields;
}

before(async () => {
  server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://site.invalid").pathname);
    const name = pathname === "/" ? "index.html" : pathname.slice(1);
    if (!SITE_FILES.has(name)) {
      res.writeHead(404, { "content-type": "text/plain" });
      return res.end("Not found");
    }
    res.writeHead(200, {
      "content-type": contentTypes[path.extname(name)] ?? "application/octet-stream",
      "content-length": statSync(path.join(ROOT, name)).size,
      "x-content-type-options": "nosniff",
    });
    return createReadStream(path.join(ROOT, name)).pipe(res);
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  server.close();
  await once(server, "close");
});

test("U01 the landing page is served as HTML", async () => {
  const response = await fetch(`${baseUrl}/`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/html/);
  assert.match(await response.text(), /Seven skills for nonprofit fundraising/);
});

test("U02 the About and install page is reachable", async () => {
  const response = await fetch(`${baseUrl}/about.html`);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /id="install"/);
});

test("U03 the shared stylesheet is reachable and nonempty", async () => {
  const response = await fetch(`${baseUrl}/styles.css`);
  assert.equal(response.status, 200);
  assert.ok((await response.text()).length > 1000);
});

test("U04 the landing page lists seven tool links in order", () => {
  const links = relativeLinks(source("index.html")).filter((href) => href.endsWith(".md"));
  assert.deepEqual(links, PACKAGE_FILES.slice(0, 7));
});

test("U05 every linked skill or prompt is downloadable", async () => {
  for (const name of PACKAGE_FILES.slice(0, 7)) {
    const response = await fetch(`${baseUrl}/${name}`);
    assert.equal(response.status, 200, name);
    assert.ok((await response.text()).length > 500, name);
  }
});

test("U06 the package download is a valid ZIP response", async () => {
  const response = await fetch(`${baseUrl}/claude-skills.zip`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "application/zip");
  assert.deepEqual([...bytes.slice(0, 2)], [0x50, 0x4b]);
});

test("U07 the ZIP contains exactly the eight published Markdown files", () => {
  const names = execFileSync("unzip", ["-Z1", path.join(ROOT, "claude-skills.zip")], { encoding: "utf8" })
    .trim().split("\n");
  assert.deepEqual(names, PACKAGE_FILES);
});

test("U08 each page publishes canonical and share metadata", () => {
  for (const name of HTML_FILES) {
    const html = source(name);
    assert.match(html, /<link rel="canonical" href="https:\/\/wayan\.com\/claude-skills\//, name);
    assert.match(html, /<meta property="og:title" content="[^"]+">/, name);
    assert.match(html, /<meta property="og:description" content="[^"]+">/, name);
    assert.match(html, /<meta property="og:url" content="https:\/\/wayan\.com\/claude-skills\//, name);
  }
});

test("U09 each page has a skip link, main landmark, and primary navigation", () => {
  for (const name of HTML_FILES) {
    const html = source(name);
    assert.match(html, /class="skip-link" href="#main"/, name);
    assert.match(html, /<main id="main">/, name);
    assert.match(html, /<nav[^>]+aria-label="Primary"/, name);
  }
});

test("U10 responsive CSS has mobile, tablet, and desktop layouts", () => {
  const css = source("styles.css");
  assert.match(css, /grid-template-columns:\s*1fr/);
  assert.match(css, /@media \(min-width: 640px\)/);
  assert.match(css, /@media \(min-width: 1024px\)/);
});

test("A01 every relative HTML link resolves to a published file", () => {
  for (const htmlName of HTML_FILES) {
    for (const href of relativeLinks(source(htmlName))) {
      const clean = href.split("#")[0] || htmlName;
      assert.ok(SITE_FILES.has(clean), `${htmlName}: ${href}`);
    }
  }
});

test("A02 the test server rejects unknown and traversal-style paths", async () => {
  for (const pathname of ["/missing.html", "/..%2FREADME.md", "/.%2e/README.md"]) {
    const response = await fetch(`${baseUrl}${pathname}`);
    assert.equal(response.status, 404, pathname);
  }
});

test("A03 public pages contain no mixed-content asset or link URLs", () => {
  for (const name of HTML_FILES) {
    assert.doesNotMatch(source(name), /(?:href|src)=["']http:\/\//i, name);
  }
});

test("A04 public pages contain no executable script", () => {
  for (const name of HTML_FILES) {
    const html = source(name);
    assert.doesNotMatch(html, /<script\b/i, name);
    assert.doesNotMatch(html, /\son\w+\s*=/i, name);
    assert.doesNotMatch(html, /javascript:/i, name);
  }
});

test("A05 every external anchor uses rel=noopener", () => {
  for (const name of HTML_FILES) {
    const html = source(name);
    for (const match of html.matchAll(/<a\b([^>]*href=["']https?:\/\/[^>]+)>/gi)) {
      assert.match(match[1], /rel=["'][^"']*noopener[^"']*["']/i, `${name}: ${match[0]}`);
    }
  }
});

test("A06 all HTML ids are unique within their page", () => {
  for (const name of HTML_FILES) {
    const ids = attributes(source(name), "id");
    assert.equal(new Set(ids).size, ids.length, name);
  }
});

test("A07 each page has one h1 and ordered heading levels", () => {
  for (const name of HTML_FILES) {
    const headings = [...source(name).matchAll(/<h([1-6])\b/g)].map((match) => Number(match[1]));
    assert.equal(headings.filter((level) => level === 1).length, 1, name);
    for (let index = 1; index < headings.length; index += 1) {
      assert.ok(headings[index] <= headings[index - 1] + 1, `${name}: h${headings[index - 1]} to h${headings[index]}`);
    }
  }
});

test("A08 skill frontmatter has unique machine-readable names", () => {
  const names = SKILL_FILES.map((name) => frontmatter(source(name)).name);
  assert.equal(new Set(names).size, names.length);
  assert.ok(names.every((name) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)));
});

test("A09 skill frontmatter has usable descriptions and no placeholders", () => {
  for (const name of SKILL_FILES) {
    const fields = frontmatter(source(name));
    assert.ok(fields.description?.length >= 80, name);
    assert.doesNotMatch(fields.description, /\b(?:TODO|TBD|FIXME)\b/i, name);
  }
});

test("A10 every file in the ZIP matches its repository source byte-for-byte", () => {
  for (const name of PACKAGE_FILES) {
    const archived = execFileSync("unzip", ["-p", path.join(ROOT, "claude-skills.zip"), name]);
    const original = readFileSync(path.join(ROOT, name));
    assert.deepEqual(archived, original, name);
  }
});
