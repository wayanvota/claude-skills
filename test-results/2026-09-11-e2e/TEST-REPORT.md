# End-to-End Test Report

Repository: `wayanvota/claude-skills`  
Branch: `test/e2e-harness-2026-09-11`  
Date: 2026-09-11  
Environment: macOS, Node 22.16.0

## Result

PASS. All 20 static-site and package categories passed. The npm dependency
audit reported zero vulnerabilities. Rebuilding `claude-skills.zip` twice
produced the same SHA-256 digest:
`9099763329ce5dfbb4ddff40514f36d53601841e02e007c97453733b21b056d3`.

Before this change, the public pages linked to `claude-skills.zip`, but the
repository ignored ZIP files and did not contain the download. There was no
automated validation of pages, links, skill frontmatter, or package contents.

## Test boundary

The harness starts a temporary HTTP server from the repository root and fetches
the same static files a visitor requests. It verifies the generated ZIP with
the system archive tools and compares every archived file to its source. No
browser, network service, model, or credential is required.

## User-behavior categories

| ID | Behavior | Final |
| --- | --- | --- |
| U01 | Serve the landing page as HTML | PASS |
| U02 | Reach the About and install page | PASS |
| U03 | Serve the shared stylesheet | PASS |
| U04 | List seven tool links in the intended order | PASS |
| U05 | Download every linked skill or prompt | PASS |
| U06 | Download a valid ZIP response | PASS |
| U07 | Package exactly eight published Markdown files | PASS |
| U08 | Publish canonical and social-sharing metadata | PASS |
| U09 | Provide skip links and navigation landmarks | PASS |
| U10 | Provide mobile, tablet, and desktop CSS layouts | PASS |

## Adversarial categories

| ID | Behavior | Final |
| --- | --- | --- |
| A01 | Resolve every relative link to a published file | PASS |
| A02 | Reject unknown and traversal-style paths | PASS |
| A03 | Contain no mixed-content URLs | PASS |
| A04 | Contain no executable script or event handlers | PASS |
| A05 | Protect every external anchor with `rel=noopener` | PASS |
| A06 | Keep HTML IDs unique per page | PASS |
| A07 | Use one H1 and ordered heading levels | PASS |
| A08 | Give skill frontmatter unique machine-readable names | PASS |
| A09 | Give skills usable descriptions with no placeholders | PASS |
| A10 | Match every ZIP entry to its source byte-for-byte | PASS |

## Failure found and fixed

The public download target did not exist in GitHub and was explicitly ignored
by `.gitignore`. The new deterministic builder stages the eight published files
with a fixed timestamp, strips host-specific ZIP metadata, and writes the
tracked archive. CI rebuilds it and rejects stale package contents.

## Verification evidence

```text
$ npm test
20 tests passed in 177 ms

$ npm audit --audit-level=high
found 0 vulnerabilities

$ shasum -a 256 claude-skills.zip
9099763329ce5dfbb4ddff40514f36d53601841e02e007c97453733b21b056d3
```

## Known boundary

This suite proves the repository's static and downloadable artifacts. It does
not prove that an independent FTP deployment copied the latest commit to
`wayan.com`; that remains a deployment check outside this repository.
