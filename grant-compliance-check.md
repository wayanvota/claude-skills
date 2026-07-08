---
name: grant-compliance-check
description: Run a compliance and consistency check on a draft grant application before submission. Use when the user asks to "check this draft", "review for compliance", "audit this proposal", "check before submission", or hands over a draft and asks if it's ready to submit. The skill produces a compliance memo flagging eligibility issues, format violations, internal inconsistencies, and funder-language alignment gaps. It does not edit the draft. Edits are the user's call after reading the memo.
---

# Grant Compliance Check

This skill produces one deliverable: a compliance memo that tells the user what passes, what fails, and what an LLM cannot determine. It does not rewrite the draft. It does not make submission decisions. It surfaces what the user needs to know before the application leaves the building.

## Inputs the skill expects

- The draft itself (Word document, PDF, or pasted text)
- The funder's RFP, call for proposals, or grantmaking priorities page (URL or text)
- `org-profile.md` (for eligibility cross-checking)
- `house-style.md` if it exists (for banned phrasing checks)

If the funder's RFP or priorities are not provided, ask before proceeding. A compliance check without the funder's actual requirements is a grammar check pretending to be more.

## What this skill checks

### Eligibility

Cross-reference the funder's stated eligibility against `org-profile.md`. Flag:

- **Geographic eligibility**: does the funder fund work in the org's geography?
- **Legal status eligibility**: 501(c)(3) only? Fiscal sponsor accepted? International NGOs eligible?
- **Budget size**: minimum or maximum org budget? (Funders sometimes exclude orgs below a budget floor or above a ceiling)
- **Audit requirement**: does the funder require an A-133 single audit, an annual financial audit, or specific accounting standards?
- **Registration requirements**: SAM.gov, UEI, NICRA, charity registration in the funder's country
- **Population served**: does the funder restrict to specific populations the org may or may not serve?
- **Programmatic restrictions**: does the funder prohibit specific activities (lobbying, religious activity, direct service vs. systems work)?

Output for each: **PASS**, **FAIL**, or **CANNOT DETERMINE FROM AVAILABLE INFORMATION**. Do not guess.

### Format compliance

- Page or word count limits
- Font size and family if specified
- Margin requirements if specified
- Required attachments (990, audit, board list, organizational chart, letters of support)
- Submission portal requirements (PDF only, Word only, online form fields)
- Submission deadline including timezone

Output for each: **PASS**, **FAIL**, or **CANNOT VERIFY WITHOUT PORTAL ACCESS**.

### Internal consistency

Read the draft for numerical and logical consistency:

- Do the numbers in the narrative match across sections? (300 beneficiaries on page 2, 320 on page 5 = flag)
- Do the dates align? (project starts March 2026 on page 3, January 2026 on page 6 = flag)
- Does the budget narrative reference figures that appear in the budget? (the actual budget is in xlsx and outside this skill's scope, but the narrative is in the draft)
- Are partner organizations named consistently?
- Do the outcomes in the executive summary match the outcomes in the goals section?
- Does the theory of change in narrative match the indicators in the evaluation plan?

Flag every inconsistency. Do not interpret which version is correct. That's the user's call.

### Funder-language alignment

Read the funder's RFP or priorities page. Identify their three to five top priority phrases or framings. Check whether the draft uses those phrases or framings, or whether it defaults to the org's internal language.

This is a judgment call, not a binary check. Output as a paragraph identifying:

- Which funder priorities the draft addresses well
- Which funder priorities the draft does not address at all
- Where the draft uses the org's language instead of the funder's

Be direct. If the funder's RFP says "movement-building infrastructure" twelve times and the draft never uses the phrase, say so.

### House style

If `house-style.md` exists, run its banned phrase list against the draft. Flag matches with location.

If `house-style.md` doesn't exist, skip this section. Do not invent style rules.

## What this skill cannot check

State this explicitly in the memo. The compliance check cannot:

- Verify whether the numbers in the draft are accurate. The org's program staff verify numbers.
- Judge whether the theory of change is plausible to the specific program officer reading it. Program officer relationships are human relationships.
- Predict whether the funder will fund this proposal. No tool can.
- Verify portal-specific submission requirements (character limits in form fields, file format restrictions, system quirks). Confirm in the portal before submission.
- Confirm that letters of support, audited financials, or other attachments exist and are current. Confirm with whoever holds those documents.
- Check whether internal authorizations (board chair sign-off, ED approval) are in place.

Listing these limits up front protects the user from over-trusting the memo.

## The compliance memo

Produce a single Markdown file, `[Funder] - Compliance Memo.md`. Structure:

```
# Compliance Check: [Funder] - [Application Format]
[Org] | Reviewed [Date]

## Top-line read
One sentence: is this draft ready to submit, ready with edits, or not ready?
Be direct. "Ready with edits" is the most common honest answer.

## Eligibility
Each criterion: PASS / FAIL / CANNOT DETERMINE
With one sentence of evidence per item.

## Format compliance
Each criterion: PASS / FAIL / CANNOT VERIFY
With one sentence per item.

## Internal consistency
List of flagged inconsistencies with section locations.
"Page 2 says 300 beneficiaries; Page 5 says 320. The draft does not reconcile these."

## Funder-language alignment
One paragraph. Direct.

## House style
If house-style.md exists: list of banned phrase matches with locations.
If not: "House style file not provided; section skipped."

## What this check cannot do
[Standard list of limits, customized to anything specific to this draft.]

## Recommended next steps
Three to five bullets. Specific. Actionable.
"Reconcile beneficiary count between pages 2 and 5 before submission" not "review for accuracy."
```

## Self-review before delivery

Read the memo once. Check:

- Did you mark anything PASS that you cannot actually verify?
- Did you guess at eligibility instead of saying CANNOT DETERMINE?
- Is the top-line read honest, or did you soften it?
- Are the recommended next steps specific enough to act on?

If you softened the top-line read, rewrite it. The user is paying you for an honest read, not a comfortable one.

## Delivery

Deliver the memo. In chat:

- Restate the top-line read
- Name the most consequential single issue if there is one
- If eligibility flagged FAIL, say so first and direct the user to verify before investing more editing time

End there. Do not offer to rewrite the draft. That is a separate task and the user invokes the drafter again if they want it.
