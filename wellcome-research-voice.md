---
name: wellcome-research-voice
description: Draft or critique a Wellcome Trust research grant application (Discovery Award, Career Development Award, or Early-Career Award). Use when the user names "Wellcome", "Wellcome Trust", or one of the Wellcome scheme names. The skill produces draft sections in the format Wellcome's online application platform requires, or critiques a draft against Wellcome's published evaluation criteria. Wellcome funds research at universities and research institutes, not nonprofit programs; if the user is from a nonprofit without a research arm, stop and tell them.
---

# Wellcome Trust Research Voice

Wellcome funds research to improve life, health and wellbeing. The funding model is fundamentally different from US private foundations: Wellcome funds individual researchers (with their administering institution as the legal grantee), not organizational programs. The voice and structure reflect that.

## Eligibility check (run first)

Before drafting anything, confirm:

- The lead applicant is a researcher at an eligible administering institution
- The institution is in the UK, Republic of Ireland, or a low- or middle-income country (excluding mainland China and India for most schemes per [Wellcome's eligibility guidance](https://wellcome.org/research-funding/guidance/prepare-to-apply/eligibility-information-grant-applicants))
- The proposed work is research, not service delivery, advocacy, or program implementation
- The research falls within Wellcome's funded areas: discovery research, infectious disease, climate and health, mental health (depression, anxiety, psychosis)

If any of these fail, stop. Tell the user the proposal isn't eligible and suggest where they might look instead.

## Which scheme

Wellcome's three main schemes correspond to career stage:

- **Early-Career Awards**: For researchers ready to develop their independent research identity. Smaller awards, shorter duration. Use when the lead applicant is post-PhD but pre-independent.
- **Career Development Awards**: For mid-career researchers leading a substantial research programme. Larger, longer.
- **Discovery Awards**: For established researchers with a track record of independent research. The largest, most flexible scheme.

Other schemes (Sir Henry Dale Fellowships, Public Engagement grants, Discretionary Awards) have their own rules and this skill defaults to the three main schemes. Confirm the scheme before drafting.

## What this skill expects from the user

- The specific Wellcome scheme being applied to
- The lead applicant's CV or research statement
- The administering institution and confirmation it's eligible
- A research question or hypothesis (not a vague topic)
- Any preliminary data or pilot work
- The intended duration and approximate budget range

If the user has only a vague topic and no research question, stop and work on the question first. Wellcome reviewers reject vague proposals fast.

## Format

Wellcome applications go through the [Wellcome Funding online platform](https://wellcome.org/research-funding). The platform structures the application into discrete sections with their own word or character limits. Section limits change by scheme and update periodically; the skill draws structure from current published guidance but the user must verify current limits in the platform itself.

Key sections that appear across schemes:

- **Research summary** (typically 200-300 words for general audience)
- **Research proposal** (the main narrative; varies by scheme, typically 2,500-5,000 words)
- **Outputs management plan**
- **Research environment statement**
- **Budget and justification of resources**
- **Sex and gender considerations** (required by [Wellcome policy](https://wellcome.org/research-funding/guidance/policies-grant-conditions))

The skill drafts the research proposal section by default and produces structured drafts of the others when asked.

## Voice and structure

Wellcome's voice is researcher-to-researcher. Academic but not jargon-heavy. The reader is assumed to be a peer in a related field, not a generalist program officer. This is closer to a high-quality NIH proposal than to a US private foundation concept note.

Per [Wellcome's own application guidance](https://wellcome.org/research-funding/guidance/prepare-to-apply/how-to-write-wellcome-grant-application): "Aim your proposal at people who have specific expertise in your field as well as those who have broader research experience. Provide a balanced overview of the background, rationale and supporting evidence."

The standard research proposal structure:

```
## Background and rationale
Why this question matters scientifically. What is known. What is not known.
What gap or contradiction in the field this work addresses.
This is the longest single section in most successful proposals.
Cite published work generously. Wellcome reviewers expect to see the field.

## Aims and hypothesis
The specific research question or hypothesis.
For hypothesis-driven work, state the hypothesis cleanly.
For exploratory work, state what would constitute a meaningful answer.
Sub-aims if appropriate, numbered, each one testable.

## Methods and approach
How the work will be done. Specific enough that a reviewer can judge feasibility.
Include statistical approach where relevant.
For human research, address ethics, consent, and sample size justification.
For animal research, address the 3Rs (Replacement, Reduction, Refinement)
per Wellcome's animal research policy.

## Preliminary data
If you have it. If you don't, this section is one paragraph explaining
why the question is ready to pursue without preliminary data, often by
referencing recent work in the field.

## Timeline and milestones
A realistic schedule. Wellcome reviewers know research rarely runs to plan;
unrealistically tight timelines hurt credibility.

## Significance and outputs
What this work will produce: papers, datasets, methods, tools, training
of researchers. Tie outputs to the outputs management plan.

## Risks and mitigation
Honest assessment of what could go wrong and what alternatives exist.
This is not optional. Reviewers look for it. Proposals without genuine
risk discussion read as naive.
```

## Indicator and outcome framing (Wellcome conventions)

Wellcome cares about research outputs, not service delivery outcomes. The framing differs from foundation work:

- **Outputs**: papers, datasets, software, methods, materials, trained researchers
- **Knowledge gain**: what will be known after this work that isn't known now
- **Field impact**: how this changes what other researchers can do
- **Translation pathway** (when relevant): how knowledge could move toward application, not a promise that it will

Avoid social-impact framing ("this research will improve outcomes for X people") unless the research is explicitly applied. For discovery research, that framing reads as naive about the research-to-impact pipeline.

## Outputs management plan

Wellcome requires an outputs management plan (OMP) for most awards. The OMP describes how data, software, materials, and other research outputs will be managed and shared.

Default OMP structure:

```
## What will be generated
List the data types, software, materials, methods.

## Standards and metadata
What standards apply (FAIR principles, domain-specific standards).

## Sharing
When and how outputs will be shared. Wellcome's preference is open
sharing where ethically and legally possible.

## Preservation
Where outputs will be deposited and for how long.

## Restrictions
Anything that cannot be openly shared (patient data, commercially sensitive
material, etc.) and the reason.

## Resources
Any costs for data management, included in the budget.
```

## AI use declaration (required)

Per [Wellcome's funding policies](https://wellcome.org/research-funding/guidance/policies-grant-conditions): "Wellcome requires the use of AI to be declared when applying for grant funding except where it is used to help with language."

If this skill is used to draft research content (not just polish language), the user must declare AI use in the application. The skill flags this in delivery so the user doesn't forget.

## Banned phrasings (Wellcome specifically)

- "Stakeholders" (research voice avoids this)
- "Impact" used loosely; Wellcome distinguishes research impact (changes what's knowable) from social impact (changes outcomes)
- "Cutting-edge" or "world-leading" (every applicant claims this; reviewers tune it out)
- "Translational" without specifying the translation pathway
- Promise language ("we will discover", "this will lead to") for discovery research; use "we aim to test", "this could enable"

## What Wellcome will not fund

Per their published exclusions:

- Researchers funded by the tobacco industry
- Activities in mainland China (per Chinese Overseas NGO Law)
- Charities whose sole purpose is fund redistribution
- Service delivery, advocacy, or campaign work disguised as research
- Research without appropriate ethics approval where ethics approval is required

## Self-review before delivery

Read the draft once. Check:

- Does the background section show command of the field, with citations?
- Is the hypothesis or research question testable, not just a topic?
- Does the methods section give enough detail for a peer reviewer to judge feasibility?
- Does the proposal include risks and mitigation honestly?
- Does the indicator framing focus on research outputs, not service outcomes?
- For human or animal research, are ethics provisions addressed?
- Did any banned phrasings slip in?

## Delivery

Deliver the draft as a Word document, structured by section. In chat:

- Word count by section against the scheme's stated limits
- The strongest section (the one that would carry the proposal)
- The weakest section (the one most likely to draw reviewer questions)
- Reminder: declare AI use in the application per Wellcome policy
- Reminder: the institution's authorised approver must submit, not the applicant

## What this skill cannot do

- Verify current scheme word limits (these change; check the platform)
- Substitute for institutional review (the administering institution must approve)
- Generate preliminary data
- Predict reviewer chemistry; Wellcome panels are domain-specific and have tells the skill doesn't know
- Draft the CV or career narrative; those are personal documents the lead applicant writes
