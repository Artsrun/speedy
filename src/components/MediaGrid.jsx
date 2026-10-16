import { Play } from "lucide-react";

// Hero + 2×2 mosaic. `pick` = media indices to show; last tile carries +N.
export const MediaGrid = ({ media, pick = [0, 1, 2, 3, 4], onOpen }) => {
  const tiles = pick.slice(0, 5).map((i) => ({ i, ...media[i] }));
  const rest = media.length - tiles.length;

  return (
    <div className="mosaic">
      {tiles.map(({ i, src, caption }, k) => (
        <button key={i} type="button" className="tile" onClick={() => onOpen(i)} aria-label={`Open slide ${i + 1}`}>
          <img src={src} alt={caption} loading="lazy" decoding="async" />
          {k === tiles.length - 1 && rest > 0 && <span className="plus">+{rest}</span>}
        </button>
      ))}
      <button type="button" className="mosaic-play" onClick={() => onOpen(0)}>
        <Play size={12} fill="currentColor" /> {media.length} slides
      </button>
    </div>
  );
};
