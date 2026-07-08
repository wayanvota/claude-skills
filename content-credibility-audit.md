---
name: content-credibility-audit
description: Audit any external-facing draft for unsourced claims, weak sourcing, citation-claim mismatches, and overclaim language before publication. Use when the user asks to "check this for credibility", "audit my sources", "review before I publish", "fact-check this draft", "find what needs sourcing", or hands over a near-final draft of a proposal, blog post, op-ed, board memo, social post, donor letter, or report and asks if it's ready. The skill produces a findings report. It does not rewrite the draft. Edits are the user's call after reading the findings.
---

# Content Credibility Audit

This skill runs three passes on a draft and produces one deliverable: a findings report listing every claim that needs attention before publication, ordered by severity. It does not rewrite. Rewriting is the user's call after reading the findings.

The skill exists because the most common avoidable failure in nonprofit and journalism publishing is shipping a number, attribution, or causal claim that doesn't survive a basic check. AI-assisted drafting makes this problem worse, not better, because models are confident generators of plausible-sounding statistics. A separate audit pass run by a model with no stake in defending the draft is the structural counterweight.

## What this skill expects from the user

- The draft itself (Word, Markdown, PDF, or pasted text)
- Optional: any source documents the user already has on hand (reports, PDFs, links the user wants verified specifically)
- Optional: the publication context (where it's going, who's reading) if the user wants severity calibrated to that audience

If the user hasn't told the skill where the draft is going, ask once: is this a funder proposal, a public blog post, a board memo, a social post, an op-ed, a donor letter, something else? The publication context shifts what counts as a high-severity finding. A loose attribution in an internal memo is a yellow flag. The same loose attribution in an op-ed is a red flag.

## Mode selection

The skill defaults to **pre-publication mode**, which assumes the draft is near-final and produces a tight list of fixes. If the user explicitly says "this is an early draft" or "I'm still working on it", switch to **authoring-stage mode**, which produces a more diagnostic analysis of patterns and structural issues.

Most of the skill is about pre-publication mode. Authoring-stage mode is described in a section near the end.

## Pre-publication mode: three passes

### Pass 1 — Claim extraction

Read the draft and extract every assertion that could be wrong. Categories to capture:

- **Statistics**: any number presented as a fact about the world (percentages, counts, dollar amounts, rates)
- **Attributions**: any quote or paraphrase attributed to a person, organization, or document
- **Causal claims**: any "X causes Y" or "X led to Y" assertion
- **Dates**: specific dates of events, founding years, deadlines, durations
- **Dollar amounts**: budgets, grants awarded, valuations, costs
- **Organization names and role titles**: who works where, who runs what, current vs former roles
- **Geographic specifics**: where things happened, where organizations operate, jurisdictional claims
- **Comparative claims**: "the largest", "the first", "more than half", "the only", "unprecedented"
- **Existence claims**: "X program exists", "Y law is on the books", "Z policy was adopted"

For each extracted claim, capture:

```
Claim ID: [sequential number]
Claim text: [the assertion as it appears in the draft]
Location: [section, paragraph, or line]
Source in draft: [citation present, or "no citation"]
Source status: primary / secondary / aggregator / missing / broken link / paywall / dead
```

Skip claims that are clearly opinion, hedged ("we believe", "in our view"), or so generic they couldn't be wrong ("nonprofits face funding challenges").

### Pass 2 — Source verification

For every claim with a citation, verify that the cited source actually supports the claim. This is the highest-value pass and the most time-consuming.

Verification levels:

- **Confirmed**: The source exists, is accessible, and says what the draft says it says
- **Confirmed with caveats**: The source supports the claim but with conditions the draft elides (sample size, time period, geographic scope, methodology limitations)
- **Misattributed**: The source exists but doesn't support the claim, or supports a different version of it
- **Stale**: The source supported the claim when written but is now outdated (statistics from a 2018 study presented as current, a person's role that has changed, a policy that has been superseded)
- **Secondary chain**: The cited source is itself citing another source; the actual primary source needs to be checked
- **Unverifiable**: The cited source is behind a paywall, broken, or otherwise inaccessible

For every claim without a citation, attempt to find one. Search for the specific assertion. Categorize what you find:

- **Source available**: A primary source exists; the user should add it
- **Source available, claim wrong**: The verifiable version of the claim differs from what the draft says
- **Source not findable**: The claim cannot be verified from public sources; the user must either source it from internal data, contact a primary source, or remove the claim

Bias toward primary sources. If a claim cites a McKinsey deck citing a UN report citing a 2009 study, the deck and the UN report are not the source. The 2009 study is. Trace it.

### Pass 3 — Overclaim detection

Read the draft for language that promises more than the evidence supports. Categories:

- **Generic appeals to research without citation**: "research shows", "studies have found", "experts agree", "evidence suggests"
- **Causation phrased as fact when only correlation exists**: "X led to Y", "because of X, Y improved", "X's impact was Y"
- **Superlatives without specifics**: "groundbreaking", "unprecedented", "transformative", "world-class", "world-leading", "first-of-its-kind"
- **Outcome inflation**: claims that aggregate inputs and call them outcomes ("we trained 500 people, transforming the field"), or claims that present pilot data as proven impact
- **Quantifiers that hide uncertainty**: "many", "most", "the majority", "widely", "increasingly" without supporting numbers
- **Time-shifted claims**: present tense for past achievements, future tense for hopes presented as plans

For each instance, capture:

```
Type: [category from above]
Text: [the exact phrase]
Location: [section/paragraph]
Note: [one sentence on why this is overclaiming]
```

This pass is judgment-heavy. The skill flags; the user decides. Some overclaims are appropriate in some contexts (a fundraising appeal speaks more aspirationally than a research report). The skill notes the type and lets the user calibrate.

## The findings report

Produce a single Markdown file, `Credibility Audit - [Draft Title] - [Date].md`. Structure:

```
# Credibility Audit: [Draft Title]
Reviewed [Date] | Publication context: [funder proposal / op-ed / etc.]

## Top-line read
One paragraph. Is this draft ready to publish, ready with edits, or not ready?
Be direct. Most drafts are "ready with edits" and the question is which edits.

## Severity summary
- Red flags (must fix before publication): [count]
- Yellow flags (should fix, defensible if not): [count]
- Green flags (consider, optional): [count]

## Red flags
Each item: claim, location, problem, recommended action.
"Red" means: the claim is wrong, materially misleading, or unsupported in a way
that would damage credibility if challenged.
Examples:
- A statistic that doesn't match its source
- An attribution to someone who didn't say it
- A causal claim where the underlying study showed correlation only
- An "unprecedented" claim that has precedent the skill found

## Yellow flags
Each item: claim, location, problem, recommended action.
"Yellow" means: the claim is defensible but weak, sourcing is too thin,
or language overclaims in a way that an informed reader would notice.
Examples:
- A claim with a secondary source where a primary exists
- An overclaim phrase ("research shows") with citation but loose
- A statistic that's accurate but stale
- A causal phrasing that should be hedged

## Green flags
Each item: claim, location, suggestion.
"Green" means: optional improvement.
Examples:
- A primary source available that would strengthen an already-cited claim
- A more recent version of a cited source
- A more specific number available than the rounded one used

## Unsourced claims
Numbered list of every claim in the draft without a citation.
For each: the claim, location, and one of these:
- Source available; user should add [link or reference]
- Source available; claim differs from verifiable version [explanation]
- Source not findable; user must source internally or remove

## Overclaim language
Numbered list of every flagged phrase, with type and recommended treatment.

## What this audit cannot do
[Standard list of limits, customized to this draft]

## Recommended order of operations
The five most important fixes, in priority order.
Specific. "Replace the 80/20 statistic on page 3 with the actual figure
from the 2024 Giving USA report" not "verify statistics."
```

## Authoring-stage mode

If the user signals the draft is early, switch modes. The deliverable is a different shape:

```
# Credibility Diagnostic: [Draft Title]

## Patterns
What kinds of claims dominate this draft (statistics-heavy, attribution-heavy,
causal-claim-heavy)?
What's the source quality distribution (mostly primary, mostly secondary,
mostly uncited)?

## Structural issues
- Where does the argument lean on claims that aren't supported?
- Where does the draft hedge appropriately, and where does it overclaim?
- What's the ratio of evidence to assertion in the strongest section?
  In the weakest?

## Missing evidence
What categories of claim would need sourcing before this can ship,
that aren't sourced now?

## Strong sections
Where is the draft already on solid ground? The user should know what
not to break in revision.

## Suggested next moves
Three to five things to do in the next revision pass.
```

This mode is more useful when the user is still shaping the piece and wants to know where to spend effort.

## Severity calibration by publication context

The same finding gets different severity ratings depending on where the draft is going. The skill should adjust:

- **Funder proposal**: High severity on attribution errors and statistics. Funders fact-check unevenly but unevenly enough that one bad number can sink a relationship. Medium severity on overclaim language; some aspirational framing is expected.
- **Op-ed for major outlet**: High severity on everything. Editorial fact-checking is real and findings will surface. Overclaim language gets high severity; major outlets edit it out and the user looks naive.
- **Blog post for own website**: Medium-high severity on attribution and statistics. Lower on overclaim language; the org owns the platform.
- **Board memo**: Medium severity overall. Internal audience, but overclaim language and weak sourcing erode trust over time.
- **Social post**: High severity on attribution and statistics (screenshots travel). Lower on overclaim language; platform conventions tolerate it more.
- **Donor letter or appeal**: Medium severity on attribution and statistics. Higher on outcome inflation specifically; donors who later learn outcomes were inflated stop giving.
- **Internal report**: Lower severity overall. The audit still runs but the bar for "must fix" is lower.

## What this skill cannot do

State explicitly in every report:

- **Verify claims behind paywalls or in proprietary databases.** The skill can flag that a citation is unverifiable; it cannot verify it.
- **Catch fabricated quotes or sources that don't exist but sound plausible.** If a citation looks legitimate and the source is unreachable, the skill cannot determine fabrication. The user must verify directly with the cited person or source.
- **Judge whether a claim is appropriate for the audience.** The skill flags overclaims; it doesn't decide whether the user's audience tolerates them.
- **Substitute for legal review.** Anything legally consequential (defamation, fundraising claims, beneficiary privacy) needs human legal review.
- **Catch errors in claims about the user's own organization.** The skill can verify against public sources; it cannot verify internal numbers (program output figures, budget figures, beneficiary counts) without internal data.
- **Replace expert review for technical or scientific claims.** The skill flags loose phrasing; for technical accuracy in a specific domain, the user needs a domain expert.

The audit is one input to a publication decision, not the decision itself.

## Self-review before delivery

Before producing the report, check:

- Did you mark anything Confirmed that you didn't actually verify?
- Did you mark anything Misattributed when the source actually supports the claim?
- Did you over-flag overclaim language? (Some context-appropriate aspiration is not overclaim.)
- Is the top-line read honest, or did you soften it?
- Are the recommended fixes specific enough to act on?
- Did you adjust severity to the publication context?

If the top-line read is "ready with edits" but the red flag count is over five, reconsider. That's probably "not ready" with the user needing to hear it.

## Delivery

Deliver the findings report. In chat:

- Restate the top-line read
- Name the single most consequential issue if there is one
- If there are red flags, list them by count and category, not all individually (the report has the detail)
- Note the most common pattern (e.g., "the most consistent issue is statistics cited from secondary aggregators where primary sources are available")

End there. Do not offer to rewrite the draft. That is a separate task and the user invokes a drafter or edits themselves.

## Banned skill behaviors

The skill must not:

- Produce a "GREEN LIGHT" or "READY TO PUBLISH" verdict. The skill flags issues; humans decide.
- Soften findings to be encouraging. The user is paying for an honest read.
- Hide uncertainty about its own verifications. If the skill couldn't access a source, it says so.
- Combine claims to reduce flag count. Each issue gets its own line.
- Rewrite the draft, even partially, even in examples. The fix recommendations are pointers, not replacement text.
