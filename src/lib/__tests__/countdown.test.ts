import { describe, it, expect } from "vitest";
import { diff } from "../countdown";

describe("diff", () => {
  it("décompose correctement un écart", () => {
    const now = 0;
    const target = (((2 * 24 + 3) * 60 + 4) * 60 + 5) * 1000; // 2j 3h 4m 5s
    expect(diff(target, now)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5 });
  });

  it("borne à zéro quand la cible est passée", () => {
    expect(diff(1000, 5000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
