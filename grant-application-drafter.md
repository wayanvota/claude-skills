---
name: grant-application-drafter
description: Draft an institutional grant application in the format the funder requires (LOI, concept note, or full proposal). Use when the user asks to "draft an application for [funder]", "write an LOI", "draft a concept note", "write a proposal for [funder]", or names a specific funder and asks for a draft. The skill produces a draft document and a list of gaps the org must fill before submission. It does not run a compliance check, that is a separate skill the user invokes after reviewing the draft.
---

# Grant Application Drafter

This skill produces one deliverable per funder: a draft application in the correct format with a clearly marked list of gaps the org must fill. It assumes the user has decided to apply to this funder. It does not second-guess the selection.

## Files this skill expects

- `org-profile.md` — Mission, programs, theory of change, budget, registrations
- `house-style.md` — Voice rules, banned phrases, indicator language, framing conventions, sample paragraphs from past winning proposals
- `program-evidence.md` — Outcome data, evaluation findings, beneficiary numbers, cost-per-outcome figures the org is willing to cite

If `house-style.md` or `program-evidence.md` is missing, draft anyway but flag every place where they would have changed the output. Do not invent voice or numbers.

## Step 1 — Funder framing

Before drafting, establish what this funder cares about. Sources, in priority order:

1. The funder's published RFP or call for proposals if the user provides it
2. The funder's grantmaking priorities page on their website
3. Recent grants the funder has made (look for patterns in what gets funded)
4. The funder's annual report or strategic plan if available

Capture in working notes (do not include in the final draft):

- The funder's three to five top priorities, in their own language
- The funder's preferred outcome framing (do they fund "systems change," "direct service," "research," "movement building"?)
- Award range and typical grant size
- Required application format (confirm what the user asked for matches what the funder requires)
- Page or word limits, attachment requirements, registration requirements
- Submission portal and any portal-specific quirks the user should know about

If the user has not specified a format and you cannot determine it from public sources, ask before drafting. Do not default to "full proposal." Most institutional funders gate first contact through LOIs or concept notes, and submitting a full proposal unsolicited gets it discarded.

## Step 2 — Draft, branched by format

### LOI (letter of inquiry)

Two to three pages. Open with the funder's language about what they want to fund, before introducing the org. Sections:

- Opening paragraph: the problem the org addresses, framed in the funder's priority language
- The org in two sentences: what it does, why it's positioned to do this work
- The proposed initiative: what, where, who benefits, over what period
- Intended outcomes with specific numbers from `program-evidence.md`
- Requested amount and timeline
- Closing: invitation to submit a full proposal, contact information

Keep it under three pages. Funders use page count as a discipline test.

### Concept note

Four to six pages. Funder-priority alignment up front, then more depth than an LOI. Sections:

- Executive summary (half a page, written last)
- Problem statement with evidence specific to the population and geography
- Proposed approach
- Theory of change in plain language, ideally one paragraph plus a simple diagram description the user can build later
- Target outcomes with numbers, baseline-to-target
- Organizational capacity in one paragraph
- Budget range with line-item categories (not full budget)
- Partnerships if relevant

### Full proposal

Match the funder's RFP if the user has it. Default sections if no RFP is in hand:

- Executive summary (one page, written last)
- Statement of need (data-grounded, specific to population and geography, citing `program-evidence.md` where possible)
- Project description (what, who, how, when)
- Goals and measurable outcomes (specific numbers, baseline-to-target, not aspirational verbs)
- Implementation plan with milestones
- Evaluation and learning plan
- Sustainability after grant period
- Organizational capacity
- Budget narrative (the budget itself stays in xlsx, the narrative explains it)

## Step 3 — Drafting rules across all formats

Pull voice from `house-style.md`. Pull outcome numbers from `program-evidence.md`. If a number is needed and not in `program-evidence.md`, mark it `[NEEDS DATA: specific request]` and continue. Do not invent numbers.

Open every draft with the funder's language about what they want to fund. The strongest proposals start with what the funder wants and then show how the org delivers it. The weakest proposals start with the org's history and ask the funder to find themselves in it.

Banned phrasings, regardless of `house-style.md`:

- Do not use "leverage" as a verb meaning "use"
- Do not use "innovative" or "transformative" without showing what is innovative or transformative about the work
- Do not write "research-based" or "evidence-based" unless you can name the research
- Do not use the words "stakeholder" or "ecosystem" unless the funder uses them first

Theory of change sections must be specific. "We will improve outcomes" is not a theory of change. "We will train 40 community health workers in case identification, who will reach 1,200 households over 18 months, increasing early diagnosis rates from 22% to 35%" is a theory of change.

## Step 4 — Gap list

At the end of every draft, append a clearly marked section:

```
## Needs from [Org] before submission
- [ ] [Specific data point] for [section] — example: "Average cost per beneficiary served in 2024, for the Statement of Need"
- [ ] [Budget figure] for [line item] — example: "Salary and fringe for the project lead, year 1"
- [ ] [Letter of support] from [partner] — example: "Letter from [partner clinic] confirming patient referral pathway"
- [ ] [Authorization] from [board chair / executive director] — example: "Board chair signature on cover letter"
- [ ] [Compliance item] — example: "Confirm SAM.gov registration is current through grant period"
- [ ] [Funder-specific requirement] — example: "Form 990 from most recent fiscal year as attachment"
```

Be specific. "We need data" is useless. "We need the average intake processing time in days, before and after the program, for the Project Description section" is useful.

The gap list is the most important output of this skill after the draft itself. A program officer at the org should be able to fill these gaps in one focused work session. If the gap list runs longer than 12 items for a full proposal, the draft is too speculative; tighten it.

## Step 5 — Self-review before delivery

Read the draft once. Check:

- Does the draft open in the funder's language, not the org's?
- Is every claim either sourced from `program-evidence.md` or marked `[NEEDS DATA]`?
- Are the gap list items specific enough that a program officer could fill them in 30 minutes each?
- Did any banned phrasings slip in?
- Does the format match what this funder actually requires?

Be honest about what this self-review cannot do. It cannot verify whether numbers are accurate. It cannot judge whether the theory of change is plausible to this specific program officer. It cannot predict whether the funder will respond. State this in the delivery message.

## Delivery

Deliver `[Funder] - [Format] Draft.docx`. In chat:

- Confirm the format used and why
- List the most consequential gaps the org must fill
- Note any funder-specific requirements that fall outside the gap list (portal quirks, submission cutoffs, attachment formats)

End by telling the user explicitly:

> Draft is ready. To run a compliance check on it before submission, invoke the grant-compliance-check skill. To draft for another funder, invoke this skill again with the new funder name.

Do not run a compliance check. That is a separate skill. The user decides when to run it, after reading the draft.
