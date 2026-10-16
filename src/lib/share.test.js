import { describe, expect, it } from "vitest";
import { toText, wordCount, xLinks, linkedInLinks } from "./share.js";
import { POSTS, FORMATS, MODELS } from "../data/posts.js";

const post = { hook: "H", body: "B b", cta: "C?", tags: ["#a", "#b"] };

describe("share", () => {
  it("joins post parts with blank lines", () => {
    expect(toText(post)).toBe("H\n\nB b\n\nC?\n\n#a #b");
  });

  it("puts the link before tags when present", () => {
    expect(toText({ ...post, link: "https://x.y" })).toBe("H\n\nB b\n\nC?\n\nhttps://x.y\n\n#a #b");
  });

  it("counts words", () => {
    expect(wordCount("  one two\nthree ")).toBe(3);
  });

  it("encodes X links for app and web", () => {
    const { app, web } = xLinks("a & b");
    expect(app).toBe("twitter://post?message=a%20%26%20b");
    expect(web).toBe("https://x.com/intent/post?text=a%20%26%20b");
  });

  it("linkedin has no text prefill", () => {
    expect(linkedInLinks().web).not.toMatch(/text=/);
  });
});

describe("posts data", () => {
  it("has unique ids", () => {
    expect(new Set(POSTS.map((p) => p.id)).size).toBe(POSTS.length);
  });

  it("media posts stay within the LinkedIn 20-image cap and have captions", () => {
    POSTS.filter((p) => p.media).forEach((p) => {
      expect(p.media.length).toBeLessThanOrEqual(20);
      p.media.forEach((m) => expect(m.caption).toBeTruthy());
    });
  });

  it("every post references a known format and model", () => {
    POSTS.forEach((p) => {
      expect(FORMATS[p.format]).toBeDefined();
      expect(MODELS[p.model]).toBeDefined();
    });
  });
});
