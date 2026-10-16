import { useMemo, useState } from "react";
import { Radio, TrendingUp, Zap, Cpu } from "lucide-react";
import { POSTS, FORMATS, MODELS, SEED_SOURCES } from "./data/posts.js";
import { toText, wordCount } from "./lib/share.js";
import { Card } from "./components/Card.jsx";
import { Chips } from "./components/Chips.jsx";

const ALL = "all";

export const App = () => {
  const [format, setFormat] = useState(ALL);
  const [model, setModel] = useState(ALL);

  const visible = useMemo(
    () =>
      POSTS.filter(
        (p) => (format === ALL || p.format === format) && (model === ALL || p.model === model),
      ),
    [format, model],
  );

  const words = useMemo(() => POSTS.reduce((n, p) => n + wordCount(toText(p)), 0), []);
  const modelLog = [...new Set(POSTS.map((p) => p.model))];

  const formatChips = [
    { id: ALL, label: "All" },
    ...Object.entries(FORMATS).map(([id, f]) => ({ id, label: f.label, color: f.color })),
  ];
  const modelChips = [
    { id: ALL, label: "Any model" },
    ...Object.entries(MODELS).map(([id, m]) => ({ id, label: m.label, color: m.tint })),
  ];

  return (
    <div className="app">
      <header className="bar">
        <div className="brandline">
          <span className="live">
            <span className="dot" /> preview
          </span>
          <h1 className="logo">
            speed<b>y</b>
          </h1>
        </div>
        <p className="cli">
          $ speedy batch --theme "human fear of losing jobs" --voice zen --days {POSTS.length}
        </p>
        <div className="stats">
          <span className="stat">
            <Radio size={13} /> sources <b>{SEED_SOURCES.join(" · ")}</b>
          </span>
          <span className="stat">
            <TrendingUp size={13} /> <b>{POSTS.length}</b> posts queued
          </span>
          <span className="stat">
            <Zap size={13} /> <b>{words}</b> words drafted
          </span>
          <span className="stat">
            <Cpu size={13} /> model log{" "}
            {modelLog.map((m, i) => (
              <b key={m} style={{ color: MODELS[m].tint }}>
                {i > 0 && <span className="arrow"> → </span>}
                {m}
              </b>
            ))}
          </span>
        </div>
      </header>

      <nav className="filters" aria-label="Filters">
        <Chips items={formatChips} value={format} onChange={setFormat} />
        <Chips items={modelChips} value={model} onChange={setModel} />
      </nav>

      <main className="grid">
        {visible.map((post, i) => (
          <Card key={post.id} post={post} index={i} />
        ))}
        {visible.length === 0 && <p className="empty">No posts match. Loosen a filter.</p>}
      </main>

      <footer className="foot">
        LinkedIn has no posting API — the LinkedIn button copies the post and opens the
        composer. Paste and go.
      </footer>
    </div>
  );
};
