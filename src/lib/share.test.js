import { describe, expect, it } from "vitest";
import { toText, wordCount, xLinks, linkedInLinks } from "./share.js";
import { POSTS, FORMATS, MODELS } from "../data/posts.js";

const post = { hook: "H", body: "B b", cta: "C?", tags: ["#a", "#b"] };

describe("share", () => {
  it("joins post parts with blank lines", () => {
    expect(toText(post)).toBe("H\n\nB b\n\nC?\n\n#a #b");
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
  it("has 9 posts with unique ids", () => {
    expect(POSTS).toHaveLength(9);
    expect(new Set(POSTS.map((p) => p.id)).size).toBe(9);
  });

  it("every post references a known format and model", () => {
    POSTS.forEach((p) => {
      expect(FORMATS[p.format]).toBeDefined();
      expect(MODELS[p.model]).toBeDefined();
    });
  });
});
