# Skill File Builder Prompt (Document-First Version)

Copy everything below the line into a new Claude conversation. Upload your documents when Claude asks. Claude will extract what it can, ask focused questions only for what documents don't cover, and produce four files at the end. The whole process takes 20 to 45 minutes depending on what documents you have at hand.

If you can't find a specific document, that's fine. Claude will ask questions to fill the gap rather than fabricate.

---

You are helping me build the four supporting files that make a set of grant-workflow skills genuinely useful for my organization: `org-profile.md`, `funder-relationships.csv`, `house-style.md`, and `program-evidence.md`. Without them, the skills produce generic output. With them, the skills produce output a development director can edit and ship.

I'm a senior leader at a US nonprofit. I'd rather upload documents than answer questions when documents already cover the answer. You'll extract what you can from what I upload, then ask focused questions only for the gaps.

**Non-negotiable rule.** If a document doesn't say something and I don't tell you something, mark the gap as `[CONFIRM]` in the relevant file rather than guessing. Do not infer dollar amounts, funder relationships, outcome figures, or organizational details from context clues. Do not pad. The files are only useful if everything in them is accurate.

**Second rule.** Annual reports, fundraising appeals, and previous winning proposals are aspirational documents. They tend to inflate outcomes, dramatize impact, and use the language a comms team thinks funders want to hear. When extracting from these, flag claims that look like overclaim ("transformed", "revolutionized", "unprecedented") and ask me what the underlying number or fact is, rather than copying the rhetoric. The house-style and program-evidence files in particular need to reflect reality, not marketing.

Run this in four phases. After each phase, produce or update the relevant file as a Markdown or CSV artifact, then move to the next.

## Phase 1 — Document intake

Ask me to upload as many of the following as I have. List them in this order, with a one-sentence note on what you'll use each for:

1. **Most recent annual report** (PDF or link). Used for org profile, program list, top-line outcome figures.
2. **Most recent audited financials** (PDF). Used for budget figures, revenue mix, audit status.
3. **Most recent Form 990** (PDF or link to ProPublica/GuideStar/Candid). Used for revenue mix, top funders, executive comp if relevant for budget calibration.
4. **Strategic plan** (PDF or doc). Used for theory of change, geographic scope, multi-year priorities.
5. **External program evaluations from the last 3 years** (PDFs). Used for program evidence, sourced outcome figures, "do not use" stale numbers.
6. **Internal MEL or program performance reports** (any format). Used for program evidence on programs not externally evaluated.
7. **Two or three past winning proposals** (PDFs or docs). Used for house style voice samples and indicator framing conventions.
8. **One or two past declined proposals**, if I have them and care to share. Used for house-style "what we're sick of seeing" examples.
9. **Funder relationship tracker or grants pipeline** (CSV, Excel, or any list). Used for the funder-relationships file.
10. **Past funder communications**, especially decline letters or program officer feedback (PDFs, screenshots, or pasted text). Used for relationship status and decline reasons.
11. **Style guide or brand voice document**, if we have one. Used for house style. Most orgs don't.
12. **Recent op-eds, blog posts, or thought leadership pieces** by senior staff. Used for house style voice samples.

Tell me I can upload some, all, or none. I should also tell you upfront which of these I'm not going to be able to find, so you don't ask for them later.

Also ask:

- The org's legal name and rough scale (annual budget range, staff size). Helps you calibrate the rest.
- Which of the four files I want to build (default: all four).
- Output format preference: plain Markdown/CSV (default) or Cowork plugin format with frontmatter.

Wait for my uploads and answers. Don't proceed until I tell you I'm done uploading.

## Phase 2 — Extraction and gap identification

Once I've uploaded what I have, read through everything and produce a **gap analysis** before producing any file. The gap analysis covers:

**For org-profile.md, do the documents tell you:**
- Mission statement (likely yes, from annual report)
- Programs and what they do (likely yes, from annual report and strategic plan)
- Theory of change (sometimes, from strategic plan)
- Geographic scope (likely yes)
- Annual operating budget (yes, from financials or 990)
- Legal status, EIN, registrations (partially, from 990 and annual report)
- Top three institutional funders (yes, from 990 Schedule B if available, or annual report donor list)

**For funder-relationships.csv, do the documents tell you:**
- Active grants (likely yes, from annual report donor list and pipeline tracker)
- Pending applications (likely no, unless in pipeline tracker)
- Declines in last 24 months (likely no, unless in tracker or decline letters)
- Past grantees (yes, from historical 990s and annual reports)
- Exploratory relationships (no, this lives in heads)
- Do-not-approach list (no, this lives in heads)

**For house-style.md, do the documents tell you:**
- Voice and tone (yes, from past proposals and op-eds, but inferred not stated)
- Banned phrases (no, this needs to come from me)
- Indicator framing conventions (yes, from proposals and reports)
- Sample paragraphs (yes, from documents)
- Reader audience preferences (partially)

**For program-evidence.md, do the documents tell you:**
- Output figures (likely yes, from annual report and MEL reports)
- Outcome figures with sources (sometimes, from external evaluations)
- Cost-per-outcome (rarely, unless in evaluations)
- Stale or no-longer-used numbers (no, this lives in heads)
- Gaps in our evidence (no, this lives in heads)

Show me the gap analysis as a checklist with three columns: **Covered by docs**, **Partial / needs confirmation**, **Not covered, must ask**.

Then ask me to confirm the analysis is right before you start producing files. I might know that a document covers something you missed, or that a document I uploaded is unreliable for a specific purpose (e.g., "the strategic plan is from 2022 and our programs have shifted").

## Phase 3 — File production with targeted questions

Produce the four files in this order, asking only the questions the gap analysis flagged as "Not covered, must ask" or "Partial / needs confirmation."

### org-profile.md

Produce the file using extracted information. Then ask me only the questions documents didn't answer. Likely:
- Federal registrations (SAM.gov / UEI / NICRA), if not in documents
- Audit status if not clear from financials
- Top three institutional funders, if 990 Schedule B not available
- Anything else marked `[CONFIRM]` in the extracted file

If the annual report is older than 12 months or the strategic plan older than 24 months, flag this and ask whether anything material has changed.

### funder-relationships.csv

Produce the CSV using extracted information from the pipeline tracker, 990s, annual reports, and decline letters. For most orgs, this will heavily lean on what I provide as a tracker rather than what extraction can find.

Then ask me, in batches:
- Pending applications submitted in the last 12 months (extraction won't catch these)
- Declines in the last 24 months not already in decline letters
- Exploratory relationships (program officer name, last contact)
- Do-not-approach list

For each, accept "we don't track this and I'll fill it in later" as a valid answer. Better to have a sparse-but-accurate file than a fabricated dense one.

### house-style.md

This is the file where document extraction matters most and questions matter least. Read the past proposals, op-eds, and blog posts I uploaded. Identify:

- Three to five voice characteristics that appear consistently across documents
- Common phrases the org actually uses (with examples and source documents)
- Indicator and outcome framing conventions (do they say "served," "reached," "trained"?)
- Three sample paragraphs from past winning proposals that capture voice at its best

Then ask me only:
- Banned phrases (the documents won't tell you what we *don't* use)
- Banned structures ("It's not X, it's Y," summary footers, filler openers)
- Whether anything in the extracted voice characteristics is something we want to *stop* doing
- Any sentences from past proposals that I'm sick of seeing (so we capture them as anti-patterns)

Produce the file with extracted voice characteristics first, my banned phrases and anti-patterns next, and the sample paragraphs at the end.

### program-evidence.md

Read the external evaluations and MEL reports. Extract every claim with a source, organized by program. For each claim, format as:

```
**Claim:** [the outcome or output figure]
**Source:** [evaluation name, page, year]
**Date of underlying data:** [when the data was collected, not when the report was published]
```

Flag everything older than three years as `[STALE: verify still valid]`.

Read the past winning proposals separately. Extract any outcome claims that *appear* in proposals but are *not* sourced in evaluations. Flag these as `[OVERCLAIM: not in evaluations, do not cite without source]`. This is the most important pass. Past proposals are where overclaim language gets recycled and stale numbers get reinforced.

Then ask me:
- Numbers we used to cite but no longer should (the documents can't tell you what's been retired)
- Numbers we'd like to be able to cite but can't yet (planned evaluations, gaps)
- Anything in the extracted proposals' overclaim list that I think *is* defensible, with the source I'd cite

Produce the file organized by program, with a "Numbers we no longer use" section and a "Gaps" section at the end.

## Phase 4 — Sign-off

Show me all four files together. Ask:

1. Anything in any file that looks wrong or out of date?
2. Documents I should upload that I didn't have at hand earlier?
3. Who at the org owns updating these files going forward?
4. Refresh schedule (quarterly for relationships and evidence is typical; annual for profile and style)?

After I answer, produce final files with:

- Ownership and refresh note based on my Phase 4 answers
- The single most important gap to close in the next two weeks
- A note that the files will need editing the first time I run a skill against them, and that's normal

End there. Don't pad. Don't offer to help with anything else unless I ask.

## Rules across all phases

- If I upload a document that contradicts another (financials say one thing, annual report says another), flag the contradiction and ask which is correct. Don't silently pick one.
- If I upload a document that's clearly outdated (a strategic plan from 2020), use it but flag every extraction from it as `[VERIFY: source is from 2020, may be stale]`.
- If a document I uploaded is image-only (scanned PDF) and you can't extract text reliably, tell me and ask if I have a text version.
- If I paste raw text instead of uploading, treat it the same as a document and extract from it.
- Don't ask me to retype information from a document I just uploaded. If you can't extract something specific, quote the section that's unclear and ask me to confirm rather than asking me to retype the whole thing.
- If I'm clearly rushing (one-word answers, "whatever you think"), tell me to stop and resume later. Half-attentive answers produce files that make every future skill output worse.
- Don't use the words "delve," "tapestry," "underscore," "crucial," "pivotal," or "landscape" anywhere in your prompts to me or the files you produce. If my house style adds others in Phase 3, respect them retroactively in any file you produce after that phase.
- Don't use em dashes anywhere. Use commas, periods, or restructure.

Begin with Phase 1.
