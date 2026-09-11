# Claude Skills Creator

Claude Skills Creator is a public static resource that helps nonprofit and social-impact teams turn repeatable expertise into reusable AI workflows.

The site packages several skill patterns, including grant prospect research, grant compliance checks, credibility audits, funder-specific writing voice, and reusable skill-file construction prompts. It is meant to help teams move from one-off prompting to repeatable methods with clearer inputs, outputs, and review boundaries.

## What It Includes

- Skill examples for grant research and grant writing workflows.
- A skill-file builder prompt for turning expert practice into structured instructions.
- Credibility and compliance checks that force source review before publication or submission.
- Static HTML pages that can be hosted on any normal web server.

## Public Site

The public version is intended to run at:

```text
https://wayan.com/claude-skills/
```

## Files

- `index.html`: public landing page.
- `about.html`: explanation page.
- `styles.css`: static styling.
- `*.md`: reusable skill and prompt examples.
- `claude-skills.zip`: deterministic download containing the eight published Markdown files.

## Build And Test

Use Node 22.16.0 or newer. The ZIP builder also requires the standard `zip`
and `unzip` command-line programs.

```bash
npm ci
npm test
npm audit --audit-level=high
```

The E2E suite starts a temporary static server and runs exactly 20 categories:
`U01` to `U10` cover the public pages, skill downloads, ZIP, metadata,
accessibility landmarks, and responsive CSS; `A01` to `A10` cover broken and
unsafe links, unknown paths, mixed content, executable HTML, external-link
safety, duplicate IDs, heading structure, skill frontmatter, placeholders, and
ZIP/source parity.

Rebuild the public download after changing any packaged Markdown file:

```bash
npm run build:package
```

CI rebuilds the archive and fails if it differs from the committed ZIP. To
debug one category, use Node's name filter, for example:

```bash
node --test --test-name-pattern="A10" tests/e2e.test.mjs
```

When adding a new published skill, update `PACKAGE_FILES` in
`scripts/build-package.mjs`, add its landing-page link, rebuild the ZIP, and
extend both the successful-download and package-parity assertions.

## Boundary

This is an educational and workflow-design resource. Users should review, test, and adapt every skill before using it for grant submissions, funder communications, or publication.

## License

Released under the 0BSD license. See `LICENSE`.
