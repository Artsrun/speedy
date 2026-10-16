import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";

const DURATION = 3500; // ms per slide

// Native <dialog> + scroll-snap track: swipe is free, arrows/keys/autoplay drive scrollTo.
export const Slideshow = ({ media, start = 0, onClose }) => {
  const dialog = useRef(null);
  const track = useRef(null);
  const [index, setIndex] = useState(start);
  const [playing, setPlaying] = useState(true);
  const n = media.length;

  const go = useCallback(
    (to, behavior = "smooth") => {
      const el = track.current;
      if (!el) return;
      const k = (to + n) % n;
      el.scrollTo({ left: k * el.clientWidth, behavior });
    },
    [n],
  );

  useEffect(() => {
    dialog.current?.showModal();
    requestAnimationFrame(() => go(start, "instant"));
  }, [go, start]);

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(id);
  }, [index, playing, go]);

  const onScroll = (e) => {
    const { scrollLeft, clientWidth } = e.currentTarget;
    const k = Math.round(scrollLeft / clientWidth);
    if (k !== index) setIndex(k);
  };

  const onKey = (e) => {
    if (e.key === "ArrowRight") go(index + 1);
    else if (e.key === "ArrowLeft") go(index - 1);
    else if (e.key === " ") {
      e.preventDefault();
      setPlaying((p) => !p);
    }
  };

  return (
    <dialog
      ref={dialog}
      className="show"
      onClose={onClose}
      onKeyDown={onKey}
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
      style={{ "--dur": `${DURATION}ms` }}
      data-testid="slideshow"
    >
      <div className="show-bars" aria-hidden="true">
        {media.map((_, k) => (
          <span key={k} className="bar-seg" data-state={k < index ? "done" : k === index ? "live" : "todo"}>
            {k === index && <i key={`${index}-${playing}`} data-playing={playing} />}
          </span>
        ))}
      </div>

      <div className="show-track" ref={track} onScroll={onScroll} onPointerDown={() => setPlaying(false)}>
        {media.map(({ src, caption }, k) => (
          <figure key={src} className="slide" aria-hidden={k !== index}>
            <img src={src} alt={caption} loading={Math.abs(k - start) < 2 ? "eager" : "lazy"} decoding="async" />
            <figcaption>
              <span className="count">
                {String(k + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="show-ctrl">
        <button type="button" onClick={() => go(index - 1)} aria-label="Previous">
          <ChevronLeft size={18} />
        </button>
        <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button type="button" onClick={() => go(index + 1)} aria-label="Next">
          <ChevronRight size={18} />
        </button>
      </div>

      <button type="button" className="show-close" onClick={() => dialog.current.close()} aria-label="Close">
        <X size={18} />
      </button>
    </dialog>
  );
};
