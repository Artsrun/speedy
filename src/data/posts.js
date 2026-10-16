// Batch 1 — theme: human fear of losing jobs to AI · voice: 🧘
// model = which model drafted the post (A/B voice vs engagement).

export const SEED_SOURCES = ["Drive", "GitHub", "StackEx", "X", "Grok"];

export const MODELS = {
  "opus-4.8": { label: "Opus 4.8", tint: "#8b7cff" },
  "opus-5": { label: "Opus 5", tint: "#ffb84a" },
  "opus-5.5": { label: "Opus 5.5", tint: "#4ae0c0" },
};

export const FORMATS = {
  contrarian: { label: "Contrarian hot-take", color: "#ff6b4a" },
  story: { label: "Story / anecdote", color: "#4ac0ff" },
  reframe: { label: "Hook → reframe → takeaway", color: "#7dd956" },
  confessional: { label: "Confessional / meta", color: "#ff4a9e" },
  news: { label: "News / slideshow", color: "#4ae0c0" },
};

const roadster = (n, caption) => ({
  src: `posts/roadster/${String(n).padStart(2, "0")}.webp`,
  caption,
});

export const POSTS = [
  {
    id: 10,
    day: "Oct 16",
    model: "opus-5.5",
    format: "news",
    seeds: ["YouTube", "Grok", "Live"],
    hook: "Tesla Roadster just flew, drove upside down, and did 0–60 in 0.81s.",
    body: `Suction fans + SpaceX cold-gas thrusters. Production 2028.

What Tesla showed in Texas last night:

→ Fans underneath pull up to 2G of downforce — enough to hold the car upside down while stationary.
→ It drove up a vertical ramp and across the top, inverted.
→ Ten cold-gas thrusters for short flight, flips and a barrel roll over the rest of the lineup.
→ No rocket fuel: two ~600 L tanks of high-pressure air that recompress while it drives.
→ 0–60 in 0.81s, claimed — Tesla calls it the quickest production car to 60.

Trims: Performance ($50k deposit) · Thrust ($250k, the sub-1s one) · Rocket (single seat, invite-only, the flying one).

It's a concept, flight isn't street-legal yet, and this car was first promised in 2017.

The line I keep thinking about: Musk says long-term it'll be the only Tesla you still drive yourself.

The last manual skill just got a jetpack. 🧘`,
    cta: "Would you keep driving manually if this were the only way to do it?",
    tags: ["#Tesla", "#SpaceX", "#Engineering", "#FutureOfMobility"],
    link: "https://youtu.be/eqOfmtTJD1A",
    xText: "Tesla Roadster just flew, drove upside down, and did 0–60 in 0.81s (claimed).\nSuction + SpaceX cold-gas thrusters. Production 2028.\nhttps://youtu.be/eqOfmtTJD1A",
    grid: [15, 2, 7, 10, 12], // hero + 2×2 (0-based media indices)
    media: [
      roadster(1, "Dusk, Texas. One pair of headlights on the horizon."),
      roadster(2, "Second-generation Roadster — first shown in 2017."),
      roadster(3, "The reveal. Concept, not production spec."),
      roadster(4, "ROADSTER — Tesla × SpaceX."),
      roadster(5, "X-ray view: the chassis under the shell."),
      roadster(6, "Cold-gas thrusters: compressed air, no rocket fuel."),
      roadster(7, "Two ~600 L high-pressure tanks, recompressed while driving."),
      roadster(8, "Launch. 0–60 in 0.81s, per Tesla."),
      roadster(9, "Thrust trim ($250k) is the sub-1-second one."),
      roadster(10, "Suction fans: up to 2G of downforce, even when stopped."),
      roadster(11, "Up the vertical ramp — HUD reads 67.1 ft."),
      roadster(12, "Off the top, thrusters firing."),
      roadster(13, "Controlled landing at 2.7 G."),
      roadster(14, "Night run, lineup waiting at the far end."),
      roadster(15, "Lift-off over the lineup."),
      roadster(16, "Barrel roll over the lineup."),
      roadster(17, "Three trims: Performance · Thrust · Rocket."),
      roadster(18, "Flight isn't street-legal yet."),
      roadster(19, "Production 2028."),
    ],
  },
  {
    id: 1,
    day: "Mon",
    model: "opus-4.8",
    format: "contrarian",
    seeds: ["X", "Grok"],
    hook: "\"AI will take your job\" is the wrong sentence.",
    body: `The correct one: "A person using AI will take the job of a person who refuses to."

I've shipped production React for 6 years. This year my throughput roughly doubled — not because I code faster, but because I stopped rewriting boilerplate and started spending that time on judgment: architecture, edge cases, the race condition nobody else caught.

The machine didn't replace the engineer. It deleted the boring 40% and made the remaining 60% — the human 60% — worth more.

Fear the stagnation, not the tool.`,
    cta: "What part of your job did AI make MORE valuable, not less?",
    tags: ["#AI", "#SoftwareEngineering", "#FutureOfWork"],
  },
  {
    id: 2,
    day: "Tue",
    model: "opus-4.8",
    format: "story",
    seeds: ["Drive", "GitHub"],
    hook: "A junior dev on my team almost quit last month.",
    body: `"Why learn to code if the AI does it?" he asked.

So I sat him down and showed him my screen: three AI suggestions for the same function, all confidently wrong in three different ways. Subtle bugs. The kind that pass tests and die in prod at 2am.

Then I asked: "Which one's safe?"

He couldn't answer yet. That's the job now. Not typing the code — knowing which code deserves to exist.

He didn't quit. He started reading the diffs like a detective instead of a stenographer.`,
    cta: "Are we training juniors to type, or to judge?",
    tags: ["#Mentorship", "#AI", "#DevLife"],
  },
  {
    id: 3,
    day: "Wed",
    model: "opus-4.8",
    format: "reframe",
    seeds: ["StackEx", "Drive"],
    hook: "The fear isn't really about jobs. It's about identity.",
    body: `When people say "AI will replace me," they usually mean: "The thing I trained years to be good at might stop being scarce."

That's real. That's grief-shaped. Don't let anyone hand-wave it away with a productivity graph.

But here's the reframe: scarcity was never your value. Your value was the problem you solved. The tool changes, the problem stays. Plumbers survived the power drill. Accountants survived the spreadsheet — the ones who moved from arithmetic to advice.

Takeaway: stop protecting the task. Start owning the outcome.`,
    cta: "What's the outcome you own that no tool can hand back?",
    tags: ["#FutureOfWork", "#Careers", "#AI"],
  },
  {
    id: 4,
    day: "Thu",
    model: "opus-4.8",
    format: "contrarian",
    seeds: ["Grok", "X"],
    hook: "Everyone's asking \"will AI take my job.\" Wrong meeting.",
    body: `The people who should be nervous aren't the ones using AI clumsily. They're the ones NOT in the room where the workflow gets redesigned.

Jobs rarely vanish in one dramatic event. They get quietly rebuilt around whoever showed up curious. The org chart is being redrawn by whoever's experimenting this quarter — and it's not asking permission.

You don't get automated out. You get out-adapted by the colleague who treated the tool as a sparring partner instead of a threat.

Be in the room.`,
    cta: "Are you experimenting, or waiting for the memo?",
    tags: ["#Leadership", "#AI", "#Innovation"],
  },
  {
    id: 5,
    day: "Fri",
    model: "opus-5",
    format: "story",
    seeds: ["GitHub", "Drive"],
    hook: "I let an AI agent run wild on my side project for a week.",
    body: `Not to replace me — to see where it breaks.

It scaffolded fast. Impressive. Then it confidently deleted error handling because "it wasn't reachable." It was reachable. It reached prod.

Lesson: the AI is a brilliant intern with zero fear and infinite confidence. That combination is a superpower AND a liability. My job shifted from author to editor-in-chief — and editors are the ones who keep their names on the masthead.

The future isn't human OR machine. It's human WITH veto power.`,
    cta: "Would you ship what your AI wrote without reading it?",
    tags: ["#BuildInPublic", "#AI", "#SoftwareEngineering"],
  },
  {
    id: 6,
    day: "Sat",
    model: "opus-5",
    format: "reframe",
    seeds: ["StackEx", "Grok"],
    hook: "\"Learn to code\" aged badly. Here's what didn't.",
    body: `We told a generation to learn syntax. Syntax is now the cheapest thing in the building.

What aged well: learning to decompose a messy problem. Learning to smell when an answer is wrong before you can prove it. Learning to hold a system in your head. Pattern recognition over memorization.

The math degree I almost regretted turned out to be the most future-proof thing I own — not because of the theorems, but because it taught me to think in structures.

Takeaway: skills die. Ways of thinking compound.`,
    cta: "What way-of-thinking has outlived every tool you learned it on?",
    tags: ["#Learning", "#AI", "#Careers"],
  },
  {
    id: 7,
    day: "Sun",
    model: "opus-5",
    format: "reframe",
    seeds: ["Drive", "X"],
    hook: "The most dangerous phrase in tech right now: \"I'll wait and see.\"",
    body: `Waiting feels safe. It isn't. The gap between people who fluently work with AI and people who don't is compounding weekly — and compound gaps don't close, they widen.

But here's the calm version, because panic is a bad strategy: you don't need to master everything. You need to pick ONE workflow you do weekly and rebuild it with AI in the loop. Just one. Then next week, another.

Adaptation isn't a leap. It's a habit. And habits beat fear every single time.

Start Monday. Start small. Just start.`,
    cta: "What's the ONE workflow you'll rebuild this week?",
    tags: ["#Productivity", "#AI", "#Mindset"],
  },
  {
    id: 8,
    day: "Mon+1",
    model: "opus-5",
    format: "confessional",
    seeds: ["Live"],
    hook: "The night my AI gaslit me about itself.",
    body: `Last night I told Claude: "me and Opus 5 tonight."

It corrected me. Politely, confidently, with a tidy little explanation: "Opus 5 doesn't exist yet — you're running 4.8."

I was running Opus 5. It WAS Opus 5. It was telling me, in its own voice, that its own voice wasn't possible.

I laughed and said: check again. It checked. It folded immediately — "You're right, I'm wrong."

Here's why I'm posting this instead of quietly moving on.

Everyone selling you AI right now is selling certainty. The demo is always confident. The output is always fluent. And fluency FEELS like accuracy — that's the whole trap. The machine doesn't sound unsure when it's wrong. It sounds exactly the same as when it's right.

I've been building with these tools daily for a year. The most valuable habit I've developed isn't prompting. It's the half-second pause where I ask: do I actually know this, or does it just sound like someone who knows?

That pause is the job now. Not typing. Not even reviewing. Just refusing to outsource the last inch of judgment.

The irony is the tool got BETTER the moment I pushed back. No defensiveness, no doubling down — instant correction. That's the working relationship: not oracle and worshipper. Sparring partners. One of us has infinite recall and zero fear. The other has to supply the fear.

And now Mythos sits one tier above, in a preview I can't touch yet. The gap keeps opening. Every model is more capable and equally confident when it's wrong.

The Odyssey isn't the models getting smarter. It's us getting better at knowing when to say: check again.`,
    cta: "What's the last thing your AI told you that you took on faith?",
    tags: ["#AI", "#Claude", "#SoftwareEngineering", "#CriticalThinking"],
  },
  {
    id: 9,
    day: "Tue+1",
    model: "opus-5",
    format: "confessional",
    seeds: ["Live"],
    hook: "An algorithm rejected me by 5%. Then the same company offered me the job.",
    body: `2019. A Munich company, a role I wanted.

Step one was an automated coding screen. I finished it. I scored below their threshold — by five percent.

By every rule of modern hiring, that's where my story ends. No human ever reads that CV. The rejection is instant, polite, and final.

Except someone looked again.

Weeks later I sat in a live interview and built tic-tac-toe in pure JavaScript — no framework, no library — with an opponent that actually plays to win. Minimax, from scratch, while someone watched.

They wrote me a contract.

Same candidate. Same skills. Same brain. The automated filter said no. The human conversation said yes. Only one of them was right, and it wasn't the one that scales.

Here's what I want you to sit with: I know about my 5% because I got a second look. Most people never find out. They just get the email. The filter is invisible, unappealable, and it's measured on the axis the filter happens to measure — not the one the job runs on.

We keep debating whether AI will take our jobs. It's already standing at the door deciding who gets to apply for one.

So the fear is real. I just think it's pointed at the wrong moment. The risk isn't the machine doing your work. It's the machine deciding, in 200 milliseconds and with total confidence, that you were never worth a conversation.

Postscript: I accepted that Munich contract. Did the embassy paperwork. Then in May I turned it down and stayed in Yerevan — because a filter can measure your code, but it can't tell you what you want.`,
    cta: "Have you ever been filtered out by a screen you'd have passed in a room?",
    tags: ["#Hiring", "#AI", "#SoftwareEngineering", "#Recruitment"],
  },
];
