import { useState } from "react";
import { Check, Clock, Copy, Linkedin, Share2, Twitter } from "lucide-react";
import { FORMATS, MODELS } from "../data/posts.js";
import {
  canNativeShare,
  copyText,
  linkedInLinks,
  openWithFallback,
  toText,
  xLinks,
} from "../lib/share.js";

const LONG = 900; // chars before the body clamps

export const Card = ({ post, index }) => {
  const [flash, setFlash] = useState(null);
  const [open, setOpen] = useState(post.body.length < LONG);
  const text = toText(post);
  const fmt = FORMATS[post.format];
  const mdl = MODELS[post.model];

  const ping = (key) => {
    setFlash(key);
    setTimeout(() => setFlash(null), 1800);
  };

  const onLinkedIn = async () => {
    await copyText(text);
    ping("li");
    openWithFallback(linkedInLinks());
  };

  const onX = () => openWithFallback(xLinks(text));

  const onShare = async () => {
    try {
      await navigator.share({ text });
    } catch {
      /* user dismissed the sheet */
    }
  };

  const onCopy = async () => (await copyText(text)) && ping("copy");

  return (
    <article className="card" style={{ "--i": index }} data-testid={`post-${post.id}`}>
      <header className="card-head">
        <div className="daywrap">
          <span className="day">{post.day}</span>
          <span className="slot">
            <Clock size={11} strokeWidth={2.5} /> 08:30 local
          </span>
        </div>
        <div className="headright">
          <span className="pill" style={{ "--c": fmt.color }}>
            {fmt.label}
          </span>
          <span className="pill model" style={{ "--c": mdl.tint }} title="Drafting model">
            {post.model}
          </span>
        </div>
      </header>

      <div className="body" data-open={open}>
        <p className="hook">{post.hook}</p>
        <p className="text">{post.body}</p>
        <p className="cta">{post.cta}</p>
        <p className="tags">{post.tags.join("  ")}</p>
      </div>
      {!open && (
        <button type="button" className="more" onClick={() => setOpen(true)}>
          read full post
        </button>
      )}

      <footer className="card-foot">
        <div className="seeds">
          <span className="seedlabel">seeds</span>
          {post.seeds.map((s) => (
            <span key={s} className="seed">
              {s}
            </span>
          ))}
        </div>
        <div className="actions">
          <button type="button" className="act li" onClick={onLinkedIn} aria-label="Copy and open LinkedIn">
            {flash === "li" ? <Check size={14} strokeWidth={3} /> : <Linkedin size={14} />}
            <span>{flash === "li" ? "copied" : "LinkedIn"}</span>
          </button>
          <button type="button" className="act" onClick={onX} aria-label="Post to X">
            <Twitter size={14} />
            <span>X</span>
          </button>
          {canNativeShare() && (
            <button type="button" className="act" onClick={onShare} aria-label="Share sheet">
              <Share2 size={14} />
              <span>Share</span>
            </button>
          )}
          <button type="button" className="act" onClick={onCopy} data-on={flash === "copy"} aria-label="Copy post">
            {flash === "copy" ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
            <span>{flash === "copy" ? "copied" : "Copy"}</span>
          </button>
        </div>
      </footer>
    </article>
  );
};
