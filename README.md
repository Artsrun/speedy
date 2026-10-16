# speed*y*

LinkedIn daily-post engine. Preview a batch, share from your phone, log which model drafted each post.

**Live:** https://artsrun.github.io/speedy/

## Batch 1

Theme: *human fear of losing jobs to AI* · voice 🧘 · 9 posts

| Format | Count |
|---|---|
| Contrarian hot-take | 2 |
| Story / anecdote | 2 |
| Hook → reframe → takeaway | 3 |
| Confessional / meta | 2 |

Model log: `opus-4.8` (posts 1–4) → `opus-5` (posts 5–9). Filter by model to A/B voice vs engagement.

## Sharing

| Button | Behaviour |
|---|---|
| LinkedIn | Copies the post, opens the composer (app first, web fallback). You paste — LinkedIn has no posting API or text prefill. |
| X | `twitter://post?message=` → falls back to `x.com/intent/post` |
| Share | `navigator.share()` — iOS share sheet, shown only where supported |
| Copy | Clipboard |

The web fallback is cancelled when the page goes hidden (`visibilitychange`), i.e. the app took over.

## Dev

```sh
npm i
npm run dev
npm test
npm run build
```

Add posts in `src/data/posts.js`. Each needs a known `format` and `model` key — tests enforce it.

## Deploy

Push to `main` → `.github/workflows/pages.yml` tests, builds, deploys to GitHub Pages.
One-time: repo **Settings → Pages → Source: GitHub Actions**.

`vite.config.js` uses `base: "./"`, so the build works under any repo path.

## Open

- Live Drive / GitHub seeds (seed tags are provenance labels for now)
- Batch 2
- Engagement numbers per post → per-model comparison
