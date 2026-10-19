# Speedy — Agent Instructions

Agent-agnostic. Works with Claude, Grok, OpenCode, local models, or any system that can follow instructions and output structured text.

## Goal

Generate LinkedIn-ready posts that are:
- Balanced across domains (not only AI/tech)
- Always grounded in a concrete historical technology transition
- Structured for the Speedy preview engine

## Required Output Shape

Each post must be a JSON object (or clearly delimited block) with at least:

```json
{
  "id": "string",
  "date": "YYYY-MM-DD",
  "slot": "HH:MM local",
  "format": "Contrarian hot-take | Story / anecdote | Hook → reframe → takeaway | Confessional / meta | News / slideshow",
  "model": "string",
  "domain": "ai | energy | attention | labor | bio | infrastructure",
  "rhyme": "printing-press | steam | railroad | electricity | atomic | pc | internet | early-web",
  "body": "140–180 words",
  "seeds": ["source1", "source2"],
  "question": "the closing question"
}
```

## Core Prompt (copy-paste)

```
Theme: [one clear sentence]
Voice: calm, specific, slightly dry. No hype. No universal claims about “the future”.
Historical constraint: Must include one concrete parallel from the rhyme library below. Name the technology, the specific fear people had at the time, and what was actually re-priced.

Rhyme library (pick exactly one):
- printing-press: fear of destroying scholarship and authority → editing, selection, distribution control
- steam / industrial: fear of mass unemployment among craftsmen → coordination, standards, capital ownership
- railroad: fear of destroying local economies and travel → network effects, timing, logistics
- electricity: fear of danger, job loss for gas workers, loss of control → infrastructure ownership, safety standards, new skills
- atomic: fear of existential risk and centralized power → governance, dual-use control, deterrence logic
- pc: fear of destroying secretarial and clerical work → judgment, software literacy, system ownership
- internet: fear of destroying journalism, retail, attention → distribution control, filtering, new attention skills
- early-web: fear of chaos and loss of gatekeepers → curation, reputation systems, platform ownership

Format: [one of the five]
Length: 140–180 words.

Required structure:
1. Present claim or scene (2–3 sentences). Specific.
2. Historical rhyme (1–2 sentences). Name the technology and the exact fear.
3. What was re-priced, not replaced.
4. One genuine question that asks for ownership of an outcome, not agreement.

Domain tag required. Rhyme id required.
```

## Batch Rules

- Every batch of 10 posts must contain at least 3 whose primary subject is not AI.
- All posts must carry a `rhyme` id from the library.
- Prefer real seeds when available. If none, the historical fact itself is the seed.

## Format Roles

- Contrarian: Attack the framing. The fear is pointed at the wrong noun.
- Story: One human moment, preferably from the historical side when the present is still raw.
- Hook → reframe → takeaway: Headline → historical parallel → what was re-priced.
- Confessional: Admit a past misjudgment about a previous technology.
- News: Current event + historical pattern. Suitable for mosaic/slideshow.

## How to Use

1. Paste the Core Prompt into any agent.
2. Supply a theme and optional seeds.
3. Collect the structured output.
4. Drop valid posts into `src/data/posts.js` (must include `format` and `model`; tests enforce this).
5. Preview at the live Speedy site.

This file is the single source of truth for generation. Agents should read it before drafting.
