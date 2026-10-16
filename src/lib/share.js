// Pure builders — tested in share.test.js. Side effects live in openWithFallback.

export const toText = ({ hook, body, cta, tags }) =>
  [hook, body, cta, tags.join(" ")].join("\n\n");

export const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

// X allows prefill; LinkedIn doesn't (no API, no text param) → copy + open composer.
export const xLinks = (text) => {
  const q = encodeURIComponent(text);
  return {
    app: `twitter://post?message=${q}`,
    web: `https://x.com/intent/post?text=${q}`,
  };
};

export const linkedInLinks = () => ({
  app: "linkedin://feed",
  web: "https://www.linkedin.com/feed/?shareActive=true",
});

// App deep-link first; web fallback unless the page got hidden (app took over).
export const openWithFallback = ({ app, web }, delay = 700) => {
  let handedOff = false;
  const onHide = () => {
    if (document.visibilityState === "hidden") handedOff = true;
  };
  document.addEventListener("visibilitychange", onHide);
  window.location.href = app;
  setTimeout(() => {
    document.removeEventListener("visibilitychange", onHide);
    if (!handedOff) window.open(web, "_blank", "noopener");
  }, delay);
};

export const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const canNativeShare = () =>
  typeof navigator !== "undefined" && typeof navigator.share === "function";
