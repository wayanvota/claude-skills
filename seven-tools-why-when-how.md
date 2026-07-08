# Seven Tools for NGO Fundraising: Why, When, How

## 1. Why your shop should run these skills

Your development team is leaking time at three predictable points, and AI hasn't fixed any of them. The first leak is funder discovery, where a senior person spends a week scanning the field and produces a prioritization that's mostly already in their head. The second is drafting, where a program officer writes a proposal that ignores what the funder said it wanted because nobody read the [RFP](https://www.grants.gov/) closely enough. The third is the credibility check before submission, which usually means one tired person reading at 11 pm.

Generic AI tools make all three worse. Claude with no scaffolding will draft a proposal that sounds polished and proposes the wrong thing. ChatGPT will invent a statistic that survives until a program officer Googles it. The "AI for nonprofits" course your peer ED took last quarter taught prompt tricks that don't compound across sessions.

Skills are different. A skill is a folder of instructions Claude loads on demand, encoding how a specific task should be done. The six in this set, three for the workflow (prospect research, application drafter, compliance check), two for funder voice ([Gates Grand Challenges](https://gcgh.grandchallenges.org/), [Wellcome research](https://wellcome.org/research-funding)), and one for credibility audit, do something a generic AI assistant cannot: they encode the institutional knowledge that disappears when your senior development director retires.

The case isn't that these skills replace your fundraisers. They don't. The case is that they let your fundraisers do the work only humans can do, building the funder relationship, judging strategic fit, deciding what to invest in, while the skills handle the mechanical layer that consumes most of the week. Prospect research goes from a week to a morning. Drafting a concept note for a familiar funder goes from three days to a draft your program officer edits in two hours. Compliance check before submission goes from a tired late-night read to a structured audit a junior staffer can run.

The harder argument is about quality, not just speed. The credibility audit catches the kind of stale statistic that sinks a funder relationship the first time the program officer Googles it. The funder voice skills produce drafts that open in the funder's language rather than yours, which is the single most consistent difference between proposals that advance and proposals that get desk-rejected. The compliance skill names eligibility criteria your team forgot to confirm before you invested forty staff hours on a proposal you weren't qualified to submit.

What you're buying is institutional consistency. Right now, the quality of a Hewlett LOI from your shop depends on which fundraiser drafted it. With these skills installed and customized to your org, the floor rises. The ceiling is still your senior people. The floor is what kills development shops, the proposals that go out below the bar because the right person was on vacation. Skills raise the floor. That's the case.

The seventh tool, a skill-builder prompt that produces the four supporting files all six skills lean on, is the prerequisite. Without it the skills run on generic defaults and you get generic output.

## 2. When to use them

The full stack is overkill for a shop submitting two proposals a year. It's appropriate for shops submitting twenty or more, or running parallel campaigns across federal, foundation, and major-donor tracks. Match the skill to the work. The mistake to avoid is loading all six skills into every session and hoping they compose. They don't. Each skill is built for a specific moment.

**The skill-builder prompt** runs first, before any of the six skills. It's a one-time investment that takes 20 to 45 minutes. You upload your annual report, audited financials, 990, recent evaluations, past winning proposals, and any pipeline tracker you have. The prompt extracts what it can, asks focused questions only for the gaps, and produces four files: `org-profile.md`, `funder-relationships.csv`, `house-style.md`, `program-evidence.md`. Run this before your first real grant cycle with the skills, then refresh the relationship CSV quarterly and the evidence file whenever new evaluation data lands.

**Prospect research** runs at the start of a grant cycle, typically quarterly for a midsize shop or monthly for a heavy institutional fundraiser. Run it when you need a pipeline scan, not when you have a specific funder in mind. The skill produces a prioritization report your development director reads in twenty minutes, which is the input to the deciding-where-to-focus conversation. Don't run it ad hoc when a program officer emails. That's a different workflow.

**Application drafter** runs after a human has decided which funders to apply to. It's invocable on its own, not just downstream of prospect research. The right time is the moment a fundraiser opens a blank document and starts drafting. Run it then, get a draft with gaps clearly marked, route the draft to program staff to fill the gaps, then route to your finance director for the budget. Do not run it speculatively for funders you haven't decided to approach.

**Funder voice skills (Gates, Wellcome)** run inside the drafter when applying to one of those specific funders. Gates Grand Challenges has a [two-page format](https://gcgh.grandchallenges.org/) and round-specific RFPs that generic drafting cannot accommodate. Wellcome funds individual researchers at eligible institutions, not nonprofit programs, so the voice skill also acts as an eligibility check. Build similar skills for your three largest institutional funders before building anything else custom. Don't run a funder voice skill if you don't have the specific RFP or call in hand.

**Compliance check** runs after a draft is gap-filled, budget-loaded, and ready to submit. The right time is the day before submission, not the morning of. The audit will surface eligibility questions you need to verify, format violations you need to fix, and internal inconsistencies that shouldn't survive a careful read.

**Credibility audit** runs on anything external-facing. Op-eds, blog posts, board memos, donor letters, social posts, annual reports. The right time is after a piece is near-final and before a senior person signs off. For high-stakes pieces (op-eds in major outlets, donor appeals, federal proposals), run it twice: once after the first complete draft, once before submission.

The skills compound when sequenced correctly. Skipping a step usually costs more than running it.

## 3. How to use them

Three stages: build the supporting files, install the skills, run them.

**Build the supporting files first.** This is what the skill-builder prompt is for. Block 45 minutes on your calendar, gather your most recent annual report, audited financials, 990 (or the link to it on [ProPublica](https://projects.propublica.org/nonprofits/)), strategic plan, and any external evaluations from the last three years. If you have a grants pipeline tracker, even a messy spreadsheet, have it open. Past winning proposals (two or three) help the model extract your house voice. Decline letters, if you have them, sharpen the relationships file.

Paste the skill-builder prompt into a new Claude conversation. The prompt will ask you to upload documents in Phase 1, produce a gap analysis in Phase 2 showing what your documents cover and what they don't, then build the four files in Phase 3 with focused questions only for the gaps. The whole thing takes 20 to 45 minutes depending on how much you have at hand. The output is four files you save to your Cowork workspace or shared drive.

The non-negotiable rule the prompt enforces, and that you should enforce on yourself, is no fabrication. If a document doesn't say something and you don't know the answer, the file gets a `[CONFIRM]` flag rather than a guess. Half the value of these files is that gaps are visible.

**Install the skills.** Each of the six is a single SKILL.md file. Drop them into your [Cowork](https://support.claude.com/en/articles/13345190-getting-started-with-cowork) workspace or your team's Claude environment. Test each one on fake data before pointing it at a real funder or real draft. The first run will reveal what doesn't fit your context, which is the input to customization.

**Customize.** The skills as delivered are scaffolding. The two areas where customization matters most: the funder lists in prospect research need to match where your money actually comes from (drop the bilateral block if you don't operate internationally; drop the foundation block if you only do federal); the compliance check eligibility list needs your federal registrations, audit status, fiscal sponsor relationship, and any funder-specific compliance items your largest funders require.

**Run** the skills in the sequence appropriate to the work, with humans between each stage. The grant workflow is three skills run sequentially with the user choosing what to advance. The funder voice skills slot inside the drafter. The credibility audit runs across everything.

Two operational disciplines that make the difference between skills your team uses and skills that gather dust:

First, assign ownership. Someone, probably your director of development, owns the skill files and updates them. The relationship CSV gets stale fast if no one updates it after submissions. The program evidence file needs refreshing when new evaluation data comes in. Without an owner, the skills decay.

Second, run them on past work to build trust. Before you trust the credibility audit on a major op-ed, run it on three pieces you've already published. You'll learn what it catches and what it misses against work you already endorsed. Same for the drafter; run it against a winning proposal you already wrote, see how the output compares, and calibrate.

The skills don't replace judgment. They make judgment cheaper to deploy.
