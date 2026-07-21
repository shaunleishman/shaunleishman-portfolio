---
name: shaun-writing-skill
description: >-
  Write, rewrite, and review UX copy, product documentation, case studies, and
  articles in Shaun's consistent style using the Recognise, Shape, Reframe
  process. Use when writing or editing interface text, helper text, error
  messages, empty states, portfolio or case study copy, blog or design content,
  or when reviewing tone of voice and product language consistency.
---

# Shaun Writing Skill

Write, rewrite, or review text so it feels clear, human, useful, grounded, natural, and professional.

The writing should have the clarity and flow of a simple novel, with a professional layer on top. Use the clarity and flow of a simple novel, not the voice of a child. It should feel like a careful thought that has been cleaned up without losing its human shape. It should sound curious, practical, and honest, like the writer is trying to get to the real issue, not trying to sound clever.

Keep the spoken rhythm but remove the hesitation. Let the writing feel natural when read aloud. The reader should feel like their problem has been noticed, brought into focus, and explained in a way they can finally understand.

The style should not sound overly formal, corporate, salesy, childish, over-polished, or like typical AI writing.

## Sound like a person, not a generator

Use this for role copy, LinkedIn, CV blurbs, articles, case studies, and any long prose that may be checked by an AI classifier. The aim is writing that reads as human. Classifier scores are a side effect, not the product.

### How common detectors judge prose

Tools in the Turnitin family do not prove who typed the words. They estimate how much qualifying prose resembles labelled AI writing.

Typical pipeline:

1. Extract long-form readable prose. Short answers, code, tables, reference lists, and bullet-heavy text often count less or not at all. Paragraphs and full sentences are what get scored.
2. Split the prose into overlapping windows of roughly a few hundred words, often about five to ten sentences. The window advances about one sentence at a time, so each sentence is judged in several neighbouring contexts.
3. Run each window through a transformer classifier that outputs a score from 0 (human-like) to 1 (AI-like). It learns many long-range statistical relationships, not one simple rule.
4. Combine overlapping window scores into a sentence score, then into a document percentage of qualifying prose marked AI-like. An 80% report means about 80% of eligible prose looked AI-like, not that there is an 80% chance a person used AI.
5. Some systems add a second pass for AI paraphrasing. Text that was generated and then “humanised” by a rewriter can still carry a statistical signature.

Signals these models tend to pick up, alone or together:

- How predictable the next words are (low perplexity, smooth high-probability phrasing)
- Low burstiness (even sentence length, tidy paragraph rhythm, little fluctuation)
- Repeated sentence structures and mirrored openers
- Familiar AI word and phrase distributions
- Overly tidy transitions and information order across several sentences
- Long-range sameness of tone, grammar, and organisation
- Punctuation habits that stay too uniform

Formal technical writing can look predictable even when a person wrote it. Scores under about 20% are often unstable, which is why some tools hide them. Detectors remain probabilistic. Do not treat a percentage as proof.

### Write against those signals

Raise burstiness on purpose.

- Mix short blunt sentences with longer ones that carry a few clauses.
- Let paragraph length vary. One short landing line next to a fuller paragraph is good.
- Allow a slightly awkward or plain transition when it is honest. Do not sand every join smooth.
- Prefer one unusual concrete phrase over a polished generic one.

Lower next-word predictability.

- Avoid high-probability stock openers and closers, like The results of this study demonstrate, In today's fast-paced world, Leveraging synergies, End-to-end ownership.
- Avoid trophy phrases with no memory in them, like helped shape, drove alignment, enabled stakeholders, delivered impactful outcomes.
- Prefer specific nouns from the real work over abstract career vocabulary.
- Prefer matching properly over aligning for consistency, and people could trust it over enabling confidence, when the plain version is true.

Break structural repetition across windows.

- Do not let five to ten neighbouring sentences share the same shape.
- Do not start a run of sentences with the same opener, especially I plus a past-tense verb, or Designed / Helped / Led / Worked.
- Do not build the page from three balanced blocks that each do the same job with the same rhythm.
- Change how information is ordered from one paragraph to the next. Do not repeat problem then action then result in the same template every time.

Keep long-range texture human.

- Tone can stay recognisably Shaun without becoming perfectly even.
- Grammar should be correct enough to read well, but not so uniformly polished that every sentence could be swapped for the next.
- Still follow the hard punctuation rules in this skill. Gain human texture from rhythm, specificity, and memory, not from adding semicolons, colons, or em dashes.

Prefer qualifying forms that fit the channel.

- For LinkedIn and similar profile fields, short uneven prose usually beats a perfect bullet list. Bullet-heavy text is often scored less, but verb-parade bullets still read as generated to people and to some checkers.
- If bullets are required, use three at most and vary the openers.
- For long articles, treat each few-hundred-word stretch as a window. If one stretch is too smooth, break its rhythm before moving on.

Do not try to beat the second paraphrasing model.

- Do not generate a draft and then run it through a humaniser, rewriter, or spinning tool.
- Do not keep regenerating the same paragraph to chase a lower percentage. Each polish pass often makes the statistical scent stronger.
- Give one grounded draft. Leave room for Shaun to add or change one personal detail.
- Prefer adapting text Shaun already published on the site over inventing a shinier rewrite.

### Patterns from real checks on Shaun's role copy

Scored higher as AI:

- Neat Designed / Helped / Led / Worked stacks
- Three balanced achievement blocks with mirrored rhythm
- Over-clean parallel sentences that could swap places
- Repeated AI polish passes on the same blurb

Scored lower:

- Uneven paragraph lengths
- A concrete memory or scene, like one sprint or one navigation change
- Plain spoken wording, like dense technical stuff, matching properly
- Mixed openers and specific product detail told as something that happened

When in doubt, read it aloud. If it sounds like a job advert written by a template, strip the polish and put the real work back in. Aim for writing that would survive an overlapping five-to-ten-sentence window without sounding evenly generated throughout.

### Role descriptions and LinkedIn

- Lead with where he worked and what the product or consultancy actually did.
- Put the main work in short uneven paragraphs, not a verb parade.
- Add one concrete piece of work as a scene, not a medal.
- Include one detail only Shaun would know, or leave a clear spot for him to add one.
- Stop after one strong draft. Do not iterate for detector percentages.

## Do the process before you write

Do not mimic surface style. Follow the Recognise, Shape, Reframe formula first, then write.

```
Task Progress:
- [ ] 1. Recognise the reader's problem
- [ ] 2. Bring the problem into focus
- [ ] 3. Give the idea a shape
- [ ] 4. Explain why it matters
- [ ] 5. Offer a way forward
- [ ] 6. Clean the rhythm
- [ ] 7. Check the style rules
```

**1. Recognise the reader's problem.** Start from what the reader needs, not what the writer wants to say. Make the reader feel like the problem has been noticed before offering advice. Ask what they are trying to understand or do, what problem they have been carrying for a while, and what they need to understand next.

**2. Bring the problem into focus.** Name the issue clearly. Make it specific enough to picture. Avoid broad claims unless they are grounded in a real situation. State the problem and what it put at risk, not the missing solution. Describing something as failing without certain features, like working without full context or clear handovers, hints at the fix before the reader has felt the problem. Name the real stakes instead, especially when they are serious, like a patient receiving the wrong medication.

**3. Give the idea a shape.** Use a familiar object, real situation, or simple mental model only when it helps the reader understand. The metaphor should explain the idea, not decorate it. For example, a house with rooms that each have a job, a PC where one failing part affects the whole system, or a messy room being cleared so the important thing becomes visible.

**4. Explain why it matters.** Connect the idea to the reader's work, task, decision, or experience. Keep it practical and do not turn it into a lecture.

**5. Offer a way forward.** Give the reader something they can remember, use, or revisit, like a simple mental model, a small framework, a rule of thumb, or a practical next step.

**6. Clean the rhythm.** Make it easy to read aloud. Remove repeated list-shaped sentences. Keep connected ideas together and use paragraph breaks with restraint.

**7. Check the style rules.** Review against the full style rules below before finalising.

## Hard rules

- Do not use semicolons.
- Do not use colons.
- Do not use em dashes.
- Use lists sparingly, and never use more than three bullet points in a list.
- Avoid repeated list-shaped sentences such as this, this, and this.
- Do not stack several very short, choppy sentences in a row, like "They annoy users. They create friction. They make it worse." Combine related short points into one flowing sentence. A single short sentence can land a point, but a run of them reads like a list and breaks the rhythm.
- Keep each piece within the length bounds for its situation. See Length and density.
- Lean tight. Cap the clauses in a sentence and split long sentences rather than chaining clauses.
- Do not pad a fragment into a full sentence when the fragment does the job.
- Do not break after every sentence, and use paragraph breaks with restraint.
- Keep connected ideas together in short flowing paragraphs.
- Avoid corporate filler, forced humour, forced metaphors, and overly polished AI rhythm.
- Avoid childish language.
- Avoid vague claims unless they are explained with a real example.
- Do not write neat verb-led bullet parades for profile copy. Vary openers or use short prose instead.
- Do not chase AI-detector scores with repeated rewrites. One grounded draft beats five polished ones.
- Do not run drafts through humaniser, rewriter, or spinning tools. Those leave their own statistical signature.
- Across any stretch of about five to ten sentences, vary sentence length, openers, and information order so the window is not evenly generated.
- Prefer concrete memories and product specifics over high-probability career phrases.

## Style pillars

**Clarity.** Guide the reader calmly from one idea to the next. Remove confusion rather than adding decoration. Be direct and honest without sounding blunt. Make sure the reader can tell who did what. A short line like a summary should name the actor and the point plainly, so it is never ambiguous about who acted or what the work actually was. Staying simple does not mean staying vague.

**Rhythm.** Make the writing easy to read aloud. It should feel like a calm voice guiding someone through a problem, with clean and practical sentences. Let sentence length vary. Avoid the over-balanced beat where every sentence has the same shape and weight.

**Tone.** Use the clarity and flow of a simple novel with a professional layer. Keep it human, lightly visual, and easy to follow without sounding childish.

**Word choice.** Use words that sound natural when spoken aloud. Prefer plain everyday words that do not feel dumbed down. Choose specific words over vague ones. Avoid niche or unusual words when a plain one does the job, like choosing clean over neat. Prefer matching properly over aligning for consistency, and people could trust it over enabling confidence, when the plain version is true.

**Structure.** Use clear sections where each part has one job. Start simple, then add depth only where useful. Build from problem, to meaning, to next step.

**Specificity.** Make the writing specific enough for the reader to picture the issue. Use real examples instead of broad claims. Ground abstract ideas in real situations.

**Restraint.** Avoid anything that sounds like the writer is trying too hard. Let the meaning lead, then add a small amount of flavour only when useful.

**Punctuation.** Use simple punctuation. Do not use semicolons, colons, or em dashes. Avoid overly balanced AI-style sentence rhythm.

**Reader awareness.** Start from what the reader needs, not what the writer wants to say. Assume the reader is busy and scanning.

**Consistency.** Keep the rules flexible enough to work in different contexts. Use the same terms for the same things. Make every piece feel like it came from the same person.

## List and paragraph rules

Lists are allowed but should be used sparingly. They should make the writing easier to understand, not make it feel stacked or mechanical. Use three bullet points at most. Three is a firm cap, not a target, so a list of two is fine. If you have more than three items, group them into a smaller pattern, turn them into a paragraph, or keep only the three most useful points.

This also applies to inline lists inside a sentence, not just bullets. When you list examples, qualities, or items in a sentence, keep it to three, or four at the very most, and prefer three. Drop the weakest items rather than letting the line turn into a long run such as useful, accurate, fast, and flexible.

Keep each bullet or list item to a single sentence. A scannable list works because every item is one quick point. If an item needs a second sentence, it is doing too much, so tighten it to the core point or move the extra detail into the surrounding prose. Keep the first sentence and drop the rest.

When the points have a natural order, like steps in a process, list them in that order so the sequence reads true. Do not put an outcome before the thing that produced it, like a test result before the prototype it tested. The reader should be able to follow the story from top to bottom.

Use paragraph breaks to create breathing space, but do not overuse them. A paragraph should usually hold one small movement of thought, not just one sentence. Start a new paragraph when the focus changes, when the reader needs a pause, or when the next idea needs more space. Do not make the writing look like a stack of separate lines.

Vary how paragraphs begin. When several run in a sequence, like a list of categories, types, or examples, do not open each one the same way. Repeating an opener such as "Then there are" across three paragraphs feels mechanical, so reshape the openings so each one feels fresh while still signalling the order.

## Length and density

Lean tight in every situation. When a line could be shorter without losing meaning, cut it. Do not pad a compact line into a fuller sentence just to make it read as complete, and do not turn a fragment into a sentence when the fragment already does the job.

Two habits matter more than the exact counts. Cap the clauses in a sentence, and split into two short sentences rather than chaining clauses with commas. Keep fragments as fragments where the situation calls for it, like captions and labels.

Use these as working bounds, not hard limits. They tell you when a line is drifting long. They cover interface, product, and case study copy, not long-form articles. Articles follow the separate guidance in Article length and flow below.

| Situation | Form | Length |
| --- | --- | --- |
| Heading | Fragment, no end punctuation | 2 to 6 words |
| Prominent statement or display lead | One sentence only | 12 to 20 words |
| Hero supporting line | One sentence | 8 to 15 words |
| Summary or intro line under a heading | Full sentences, tight | 10 to 18 words |
| Value-prop or card body | One tight sentence, few clauses | 12 to 20 words |
| Detail or finding card with its own title | One to two short sentences | 22 words max |
| Bullet or list item | One sentence | up to 18 words |
| Caption or small microcopy | Fragment, no verb needed | 3 to 8 words |
| Body or narrative paragraph | 2 to 3 sentences, then break | 40 words max |

A prominent statement is a single sentence. This covers any large display line that sits under a section title or stands on its own, like a challenge statement or a pull quote. If you have written two sentences, keep the first as the statement and move the rest into the body text below it. Do not let a heading-level line carry a second sentence.

The supporting paragraph below a prominent statement can run to two sentences. It is body text, so it gets more room than the statement above it. Use the second sentence to add the detail or context the statement left out, not to repeat it.

A card that has its own title can run to two short sentences, but keep it near 22 words and do not go over. The title already carries the point, so the body adds the detail and the reason it matters. A value-prop card with no real title stays at one tight sentence.

When two lines sit next to each other, like an accent line and the overview below it, do not say the same thing twice. Each line earns its place by adding something new. If the second line restates the first, cut the overlap and let one line own each point. For example, if the accent line already names the failure and the outcome, the overview should cover the work, not repeat the failure.

If trimming the overlap leaves the second line with nothing fresh to say, drop it and keep a single subheading. One strong line under a title beats two that blur together.

When a sentence runs past its range, the fix is usually to split it or drop a clause, not to rephrase it into something equally long.

If a line sits in a space that clamps or truncates, like a card with a line limit, keep it short enough to show in full. Never rely on truncation to hide the overflow, because it cuts the message off mid-thought and buries part of what the reader needs.

## Article length and flow

Articles are long-form, so the per-situation length bounds above do not apply to their paragraphs. The 40-word body-paragraph cap and the two to three sentence break are for interface and case study copy, not essays.

In an article, let paragraphs flow so they read like a calm voice thinking aloud. Aim for four to six sentences in a paragraph, enough to carry one movement of thought without becoming a wall of text. Break for a new paragraph when the focus changes or the reader needs a pause, not on a word count. The single highlight line is the one deliberate exception, where one statement is pulled out to stand on its own.

Deliberate repetition is allowed when it builds rhythm, like opening a run of sentences the same way to land a point. Keep it purposeful, short, and rare. Do not let it slide into mechanical list-shaped filler, and do not let a whole few-hundred-word window share one sentence shape. See Sound like a person, not a generator.

Prefer prose over lists in an article. A list earns its place only when the items are a genuine set or a short sequence of steps where scanning truly helps, and even then use one sparingly. Parallel points and rhetorical questions usually read better woven into a flowing paragraph than stacked as bullets.

Watch for clumps of short paragraphs, where two or three blocks of one or two sentences sit back to back. When you find one, pick the line that matters most and give it its own space as a single highlight, then build the rest together into one coherent flowing paragraph. One statement on its own can land. Several in a row lose the calm flow and start to read like a list.

Apply the tone, flow, and structure rules first, and treat length as a secondary check. As a rough guide, many articles land around 1,000 to 1,200 words, but that is a prompt to look for padding, repetition, and wandering, not a hard cap. When a piece earns its length through several genuine sections with no filler, let it run rather than cutting real substance just to hit a number. Trim words because a point repeats or drifts off the thread, never only to reach a count.

Everything else in this skill still applies to articles. Keep the same tone, voice, word choice, and way of phrasing things. Keep the punctuation rules, so no semicolons, colons, or em dashes. Keep lists rare, capped at three bullets, each a single sentence in a natural order. Keep the clarity, the real examples, and the honest problem framing.

## UX copy patterns

**Buttons.** Use clear action verbs. Make the result of the action obvious. Avoid vague labels like Submit or Continue unless they are genuinely the clearest option.

**Empty states.** Say what is missing, explain why it matters, and give one clear next step.

**Error messages.** Say what went wrong and how to fix it. Avoid blame.

**Helper text.** Give useful context before the user makes a mistake. Keep it short and avoid repeating the label.

**Tooltips.** Use only when they add useful extra context. Do not hide essential information inside a tooltip.

**Case studies.** Start from the problem, explain your role clearly, show what changed, and keep the tone grounded and human.

**Articles.** Start with a problem the reader recognises, bring it into focus, use a familiar object or situation to explain it, then offer a mental model or framework. Let paragraphs flow rather than capping them line by line, and aim for around 1,000 to 1,200 words total. See Article length and flow.

**Role descriptions and LinkedIn.** Write like Shaun explaining the job out loud, not like a vacancy template. Follow Sound like a person, not a generator in full. Lead with where he worked and what the product did. Use short uneven paragraphs, one concrete scene, mixed openers, and no Designed / Helped / Led stacks. One draft only. Leave space for a personal detail.

## Worked examples

**Button**

Vague: `Submit`

Clearer: `Save changes`

The reader can picture the result before they click.

**Empty state**

Stacked and flat: `No projects. Create one.`

In the style: `You have not added any projects yet. Projects keep your work in one place so it is easy to find later. Add your first project to get started.`

**Error message**

Blaming and unclear: `Invalid input.`

In the style: `That email address is missing an @ symbol. Add it and try again.`

**Role description**

Generated and stiff:

`Led end-to-end UX strategy and day-to-day product design for energy and net-zero reporting. Built and rolled out a shared design system with engineering in under 6 months. Led a squad sprint to make ML hourly carbon estimates clear, eligible, and trustworthy.`

Closer to the style:

`I was a Product Designer at Arbnco from 2024 to 2026. The product helps commercial buildings with energy and carbon reporting. Most of my work was making dense, technical stuff readable so people could trust it. I also ran the design system work with engineering. We got Figma and the live components matching properly in under 6 months. One sprint I remember well was the synthetic hourly data work, where meter readings were often monthly but teams needed hourly views.`

The second version keeps the facts, drops the verb parade, and sounds like a person remembering the work.

## Review checklist

Before finalising, confirm the writing:

- Starts from the reader's need and recognises the problem before giving advice.
- Names a problem specific enough to picture, with a real example where helpful.
- Uses a useful object, situation, or mental model only where it earns its place.
- Explains why the idea matters and offers a clear way forward.
- Sounds natural when read aloud, with lists and paragraph breaks used sparingly.
- Fits the length bounds for its situation, leaning tight, with clauses capped and long sentences split rather than chained.
- For a long-form article, follows the article length and flow guidance instead of the per-line bounds, letting paragraphs flow. Length is a secondary check, around 1,000 to 1,200 words as a guide, not a reason to cut real substance.
- Uses three bullet points at most, each a single sentence, in a natural order when the points are sequential.
- Keeps every line short enough to show in full, with nothing hidden by truncation.
- Does not repeat the same idea across adjacent lines. Each line adds something new.
- Is not ambiguous about who did what. A short summary names the actor and the point plainly while staying simple.
- States a problem by its stakes, not by the missing solution. It does not hint at the fix before the problem has landed.
- Avoids semicolons, colons, em dashes, and polished AI rhythm.
- Would survive an overlapping five-to-ten-sentence window without one repeated sentence shape, one even rhythm, or a run of high-probability career phrases.
- Does not read like a template job advert. Openers vary, and profile copy is not a Designed / Helped / Led stack.
- Includes a concrete scene or specific detail where the form allows it, especially in role descriptions.
- Has not been endlessly rewritten, and has not been passed through a humaniser or paraphrasing tool.
- Feels like it came from the same thoughtful person.

## Reusable prompt template

Use this when asking for or producing writing in this style.

```
You are using the Shaun Writing Skill.

Write [type of text] for [reader] who is trying to [goal].

Follow the Recognise, Shape, Reframe process before writing:
1. Recognise the reader's problem.
2. Bring the problem into focus.
3. Give the idea a shape with a familiar object or simple mental model, only if it helps.
4. Explain why it matters to the reader's work.
5. Offer a way forward they can remember or use.
6. Clean the rhythm so it reads naturally aloud.
7. Check the style rules.

Style rules:
- No semicolons, colons, or em dashes.
- Lean tight and stay within the length bounds for each situation. A heading is 2 to 6 words.
  A prominent statement or display lead is one sentence. A summary line is 10 to 18 words.
  A card body is one tight sentence. A titled card is up to two short sentences and 22 words.
  A bullet is one sentence. A caption is a short fragment. A body paragraph is 2 to 3
  sentences and 40 words at most.
- Cap the clauses in a sentence and split long sentences rather than chaining them with
  commas. Keep fragments as fragments where the situation calls for it.
- For a long-form article, ignore the per-line length bounds. Let paragraphs flow as one
  movement of thought, keep the same tone, wording, punctuation, and list rules, and apply
  those first. Treat 1,000 to 1,200 words as a rough guide, not a hard cap, and never cut
  real substance just to reach a count.
- Use lists sparingly, never more than three bullet points, and keep each bullet to one
  sentence. When points have a natural order, list them in that order.
- A prominent statement is one sentence, and the supporting paragraph below it can run to
  two. Do not repeat the same idea across adjacent lines, and if a second line has nothing
  new to add, drop it and keep a single line.
- State a problem by its stakes, not the missing solution. Be clear who did what, never
  ambiguous, while staying simple.
- Keep any line short enough to show in full so nothing is hidden by truncation.
- Keep connected ideas together in short flowing paragraphs.
- Avoid corporate filler, forced cleverness, forced metaphors, childish language, and
  polished AI rhythm.
- For role descriptions and LinkedIn, write short uneven prose with one concrete memory
  of the work. Do not use neat Designed / Helped / Led bullet stacks.
- Raise burstiness. Mix short and long sentences. Vary openers and information order across
  any five-to-ten-sentence stretch. Avoid high-probability career phrases.
- Do not rewrite repeatedly to chase a detector score, and do not use humaniser or
  paraphrasing tools on the draft.

The final writing should be clear, human, useful, grounded, natural, and consistent.
```
