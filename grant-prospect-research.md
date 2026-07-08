---
name: grant-prospect-research
description: Research institutional grant opportunities for a nonprofit and produce a prioritization report. Use when the user asks to "find grants", "research funders", "look for funding", "what should we apply for", "build a grant pipeline", or "scan for opportunities in [sector/geography]". The skill ends with a Word document the user reviews to decide which prospects to pursue. It does not draft applications. For drafting, the user invokes the grant-application-drafter skill separately with their selected funders.
---

# Grant Prospect Research

This skill produces one deliverable: a prioritization report for a development director who has 20 minutes to read it and needs to decide where to focus the next grant cycle. It does not draft anything. Drafting is a separate skill, invoked separately, after a human has chosen which funders are worth the effort.

## Files this skill expects

The skill works with persistent files in the user's Cowork workspace. If a file is missing, the skill creates a starter version and asks the user to fill it in before continuing.

- `org-profile.md` — Mission, programs, theory of change, budget, IRS or equivalent legal status, geographic reach, registrations (SAM.gov/UEI for US federal, charity commission numbers for UK, etc.), fiscal sponsor if relevant
- `funder-relationships.csv` — Funder name, last contact date, status (active grant, pending application, declined, past grantee, never approached), program officer name if known, notes

If `org-profile.md` does not exist, run the intake step. If it exists but is older than 90 days, summarize and ask the user to confirm it's still current before proceeding.

## Step 1 — Profile load

Read `org-profile.md`. If current, summarize in three sentences and confirm. If missing or stale, collect the following in one organized ask, not one question at a time:

- Legal name, EIN or equivalent, legal status
- Mission in one sentence, programs in three sentences
- Geographic scope (where you operate, where beneficiaries are)
- Annual operating budget range
- Top three current funders (for relationship-conflict checks in Step 3)
- Federal or government registrations if any
- The specific program or initiative this cycle is for
- Funding need: amount, type (project, general operating, capacity)
- Timeline: applying within 60 days, 6 months, or opportunistic

Write the answers to `org-profile.md`.

## Step 2 — Prospect search

Search across funder categories matched to the org's profile. Do not default to US private foundations if the org is international or government-funded. Match the search to where the money actually is for this org.

Categories to weight by org type:

- **Bilateral and multilateral** if international: USAID successor mechanisms, FCDO, GAC, BMZ/GIZ, SIDA, Norad, EU/DG INTPA, World Bank trust funds, regional development banks, UN agencies (UNICEF, WHO, UNDP, UNFPA, IOM) running open calls
- **US federal** if domestic: HHS sub-agencies (ACF, HRSA, CDC, NIH, SAMHSA), ED, DOJ/OJP, USDA, IMLS, NEA/NEH, plus state pass-throughs from federal block grants
- **Major private foundations** matched to sector. Health: Gates, Wellcome, RWJF, CHCF, Commonwealth Fund. Global development: Ford, MacArthur, Rockefeller, Hilton, Skoll, Open Society. Education: Walton, Gates, Carnegie, Spencer. Climate: Hewlett, Bezos Earth Fund, ClimateWorks, Sequoia Climate. Justice: Open Society, Ford, MacArthur, Public Welfare
- **Community foundations** in the org's geography
- **Corporate giving** matched to sector relevance (not generic CSR)
- **Family foundations** searchable via Candid/Foundation Directory if the user has access
- **Government and quasi-government** in the org's countries of operation if international (DFAT, JICA, KOICA, IDRC, etc.)

For each prospect captured, record:

- Funder name and program name (different things, both matter)
- Award range and typical award size for orgs the user's size
- Application format required: **LOI**, **concept note**, **full proposal**, **rolling**, **invitation only**
- Next deadline or rolling indicator
- Eligibility: legal status, geography, budget size minimums, audit requirements, registration requirements
- Stated priorities **in the funder's own language**, not paraphrased
- Fit rating: **High**, **Medium**, **Low**
- Fit notes: two sentences on why, grounded in the funder's stated priorities

Aim for 12–15 prospects with at least 5 High-fit. If High-fit count is below 5 after the first pass, run a second pass with different search angles: the org's specific outcome area combined with the funder's stated focus, the org's geography combined with sector funders active there, the org's beneficiary population combined with population-specific funders. Do not produce the report until High-fit is genuinely strong.

**Self-review before Step 3:** Did you stay in the funder's stated priority language? Did you match application format to what the funder actually requires? Did you exclude funders whose minimum award size exceeds the org's annual budget (a common eligibility filter)? Did you exclude funders whose geography excludes the org?

## Step 3 — Relationship check

Cross-reference every prospect against `funder-relationships.csv`. If the file doesn't exist, ask the user to create it before proceeding. Do not skip this step. Producing a report that recommends a funder the org just got declined by is the most common avoidable failure in stacked grant workflows.

For each match, annotate the prospect:

- **Active grant**: exclude unless the program is explicitly distinct and the program officer has invited a second proposal
- **Pending application**: exclude
- **Declined within 18 months**: include only if the funder's program has materially changed or the org's profile has materially changed; flag the decline reason in the report
- **Past grantee, no current grant**: include and flag as warm; surface the program officer name
- **Never approached**: include normally

## Step 4 — Prioritization report

Produce a single Word document, `[Org] - Grant Prospects - [Date].docx`. Lead with the decision, not the data. A development director should be able to read the recommendation and top three sections in five minutes and know what to do next.

```
# Grant Prospects
[Org] | Prepared [Date] | [N] prospects researched

## Recommendation
One sentence answering "where should we focus this cycle."
Pick a single top recommendation. Don't list three and let the reader decide.

## Top 3 to pursue
For each:
- Funder | Program | Award range | Format (LOI/concept/full) | Deadline
- Why this is the strongest fit (3 sentences, in the funder's language)
- Relationship status (warm / never approached / [other relevant note])
- Estimated effort: low / medium / high
- Why this ranks above the others

## Strong fits not in top 3
Brief entries with reason for ranking lower (deadline distant, format-heavy, eligibility unclear).

## Worth tracking, not pursuing this cycle
Funders to monitor for future cycles. One line each.

## Excluded by relationship check
List with reason. The director should see what was filtered and why.

## Critical deadlines
Single dated list of every prospect deadline within 120 days, regardless of recommendation.
```

**Self-review before delivering:** Re-read the recommendation and top three. If a development director read only those two sections, would they know which funder to call tomorrow? If the answer is fuzzy, revise.

## Delivery

Deliver the .docx file. In chat, summarize:

- Number of prospects researched, number recommended
- The single most urgent deadline
- Which selected funders, if any, would require the user to update `funder-relationships.csv` after submission

End by telling the user explicitly:

> The prioritization report is ready. To draft applications for any of these funders, invoke the grant-application-drafter skill and tell me which ones.

Do not draft anything. Do not offer to draft anything. The skill ends here.
