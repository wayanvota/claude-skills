import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, rmSync, utimesSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const PACKAGE_FILES = [
  "skill-file-builder-prompt.md",
  "grant-prospect-research.md",
  "grant-application-drafter.md",
  "gates-grand-challenges-voice.md",
  "wellcome-research-voice.md",
  "grant-compliance-check.md",
  "content-credibility-audit.md",
  "seven-tools-why-when-how.md",
];

export function buildPackage() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const output = path.join(root, "claude-skills.zip");
  const staging = mkdtempSync(path.join(tmpdir(), "claude-skills-package-"));
  const fixedTime = new Date("2026-01-01T00:00:00.000Z");

  try {
    for (const name of PACKAGE_FILES) {
      const destination = path.join(staging, name);
      copyFileSync(path.join(root, name), destination);
      utimesSync(destination, fixedTime, fixedTime);
    }
    rmSync(output, { force: true });
    execFileSync("zip", ["-X", "-q", output, ...PACKAGE_FILES], { cwd: staging });
    process.stdout.write(`Built claude-skills.zip with ${PACKAGE_FILES.length} files.\n`);
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

const isCli = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isCli) buildPackage();
