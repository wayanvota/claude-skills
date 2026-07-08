---
name: gates-grand-challenges-voice
description: Draft or critique a Bill & Melinda Gates Foundation Grand Challenges application. Use when the user names "Gates", "Grand Challenges", "GCE", "Grand Challenges Explorations", or references a specific Grand Challenges round. The skill produces a two-page proposal in the format Grand Challenges actually evaluates against, or critiques a draft against that format. Do NOT use this skill for general Gates Foundation grants outside Grand Challenges, those are invitation-only and require a different skill.
---

# Gates Foundation Grand Challenges Voice

This skill is narrow on purpose. The vast majority of Gates Foundation funding is invitation-only. Grand Challenges is the open door, and it has unusually specific rules that don't generalize to other Gates programs.

## What Grand Challenges actually is

A family of initiatives launched by Gates in 2003 (Grand Challenges in Global Health) and 2007 (Grand Challenges Explorations). [Grand Challenges Explorations](https://gcgh.grandchallenges.org/about) invites high-risk, high-reward ideas via two-page applications with no preliminary data required. Initial grants are typically $100,000, with potential follow-on grants up to $1 million for projects that show proof of concept.

Each round addresses specific challenges with their own RFP. Generic Gates voice is wrong here. Round-specific voice is right.

## What this skill expects from the user

Before drafting, the user must provide:

- The specific Grand Challenges round and challenge they're applying to (round number and challenge title, e.g., "Round 25: Innovations for Improving the Impact of Health Campaigns")
- The full RFP text or URL for that specific challenge
- The org's profile from `org-profile.md`
- Any pilot data or prior work relevant to the proposed approach (optional, not required by Gates)

If the user doesn't have a specific challenge, stop and tell them: Grand Challenges only accepts proposals against active challenges. The list is at gcgh.grandchallenges.org/challenges. Do not draft a generic Grand Challenges proposal; it will be desk-rejected.

## What Grand Challenges evaluates against

Per Grand Challenges' own published criteria:

- **Challenges Responsiveness**: Does the proposal directly address the problem in this specific challenge? Read the "we will not consider funding for" section in the RFP. Every challenge has one. If your idea matches anything in that section, stop and pick a different challenge.
- **Innovative Approach**: Does the idea offer an unconventional or creative approach? Grand Challenges is explicit about wanting unconventional ideas. Conservative, incremental work loses against bold work even when the bold work is riskier.

The funder's own framing is that this is high-risk, high-reward. Drafts that hedge or under-commit do not win.

## Format

Two pages, hard limit. This is not a guideline. Two pages is the format.

No preliminary data required, but pilot data strengthens applications when it exists.

No appendices, no letters of support, no organizational background documents. The two pages must contain everything the reviewer sees.

## Structure

The published rules don't mandate specific section headers, but successful applications consistently follow this pattern:

```
[Title: short, specific, no jargon]
[Applicant name and institution]

## The challenge
2-3 sentences. Restate the specific problem from the RFP in your own words,
showing you understand what Grand Challenges is asking. Use the RFP's framing
language, not your organization's internal language.

## Our idea
1 paragraph. The core innovation in plain language. Lead with what is novel,
not with your organization. A reviewer should be able to summarize your idea
in one sentence after reading this paragraph.

## Why this could work
2-3 paragraphs. The mechanism: how does this actually solve the problem?
Cite evidence where it exists. Acknowledge uncertainty where it doesn't.
Pilot data goes here if you have it. Be specific about what you'd need to
demonstrate to know it's working.

## What we'll do with $100K over 18 months
2-3 paragraphs. Specific milestones. What proof of concept will exist at
the end of the grant that doesn't exist now? What's the testable hypothesis?

## Why us
1 short paragraph. Not your organizational history. The specific reason
this team can do this specific work. If you can name a unique asset,
location, partnership, or capability that makes this feasible for you and
not for others, name it here.
```

## Drafting rules specific to Grand Challenges

**Lead with the unconventional element.** Reviewers are reading for novelty. If the first thing they encounter is a familiar approach with a small twist, you've lost them. If the first thing they encounter is genuinely surprising, they keep reading.

**Be specific about the mechanism.** "We will use AI" is dead on arrival. "We will train a small language model on vernacular caregiver dialogue from three Indian states to flag dementia symptoms in routine community health worker visits" gives the reviewer something to evaluate.

**Quantify the testable hypothesis.** Grand Challenges is explicit that they're funding proof of concept. A proposal needs to specify what success at 18 months looks like in numbers. Not "we will demonstrate feasibility." More like "we will achieve 75% sensitivity in flagging probable cases, validated against clinical assessment in 200 patients."

**Acknowledge what could go wrong.** Reviewers know high-risk ideas might fail. Pretending yours can't is a credibility tell. One sentence on the most likely failure mode and what you'd learn from it strengthens the application.

**Cut every word that isn't earning its place.** Two pages is brutal. The biggest failure mode is trying to include everything. Pick the three most important things to communicate and protect them.

## Banned phrasings (Grand Challenges specifically rejects)

- "Innovative" or "novel" without showing what is innovative or novel about it
- "Stakeholders" or "ecosystem" (these belong to a different funder vocabulary)
- "Capacity building" as a primary goal (Grand Challenges funds proof of concept, not capacity)
- "Scale" or "scaling" as a primary verb in a Phase 1 proposal (they fund proof of concept first; scale comes later)
- "Disruptive" (overused; reviewers see hundreds)
- Long acronyms without expansion on first use

## What Grand Challenges will NOT consider

Every challenge RFP has a "we will not consider funding for" section. Read it before drafting. Common exclusions across rounds:

- Studies that simply collect more data on a known problem without testing an intervention
- Approaches that have been extensively tested elsewhere
- Projects that require infrastructure Gates would have to fund separately
- Proposals from countries or institutions barred by Gates compliance rules
- Research with humans or animals lacking required ethics approvals

If the user's idea falls in any of these, stop and tell them. Do not soften the framing to slip through; reviewers catch this.

## Self-review before delivery

Read the draft once. Check:

- Does it fit on two pages with normal margins and 11pt font? If not, cut.
- Does the first paragraph use the RFP's language about the challenge?
- Is the innovation visible in the first 50 words of "Our idea"?
- Is there a specific testable hypothesis with numbers?
- Did any banned phrasings slip in?
- Did you acknowledge a failure mode?
- Did you stay away from the "will not consider funding for" list?

## Delivery

Deliver `[Org] - Grand Challenges Round [N] - [Challenge Title].docx` (one file, two pages, no attachments). 

In the chat, list:

- Word count and page count
- The RFP exclusion list items most relevant to this idea, and a one-sentence note for each on whether the draft falls inside or outside them
- The single biggest weakness of the draft (the part most likely to lose against competing proposals)

End there. Do not pad with encouragement.

## What this skill cannot do

- Predict whether your specific idea is novel enough to win. Novelty is judged against the field, and the skill doesn't know the current state of every relevant field.
- Tell you whether your team has the right reputation. Grand Challenges does some signal-checking on applicants; the skill cannot substitute for that.
- Generate the unconventional idea itself. The skill formats and pressure-tests an idea you bring. If your idea is conventional, the skill cannot make it unconventional through formatting.
