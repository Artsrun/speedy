// Pure builders — tested in share.test.js. Side effects live in openWithFallback.

export const toText = ({ hook, body, cta, tags, link }) =>
  [hook, body, cta, link, tags.join(" ")].filter(Boolean).join("\n\n");

// LinkedIn multi-image posts cap at 20 images.
export const MAX_SHARE_FILES = 20;

export const toFiles = async (media, max = MAX_SHARE_FILES) =>
  Promise.all(
    media.slice(0, max).map(async ({ src }, i) => {
      const blob = await (await fetch(src)).blob();
      const name = `${String(i + 1).padStart(2, "0")}.${blob.type.split("/")[1] || "img"}`;
      return new File([blob], name, { type: blob.type });
    }),
  );

// Share sheet with images when the platform supports files, text otherwise.
export const shareNative = async (post, text) => {
  if (post.media?.length) {
    try {
      const files = await toFiles(post.media);
      if (navigator.canShare?.({ files })) return navigator.share({ files, text });
    } catch {
      /* fall through to text-only */
    }
  }
  return navigator.share({ text });
};

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
