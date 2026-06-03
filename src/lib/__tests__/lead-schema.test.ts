import { describe, it, expect } from "vitest";
import { leadSchema } from "../lead-schema";

const valid = {
  name: "Jean Dupont",
  company: "Acme",
  email: "jean@acme.com",
  budget: "",
  message: "Nous aimerions sponsoriser une campagne pour l'été.",
  website: "",
};

describe("leadSchema", () => {
  it("accepte un payload valide", () => {
    expect(leadSchema.safeParse(valid).success).toBe(true);
  });

  it("rejette un email invalide", () => {
    expect(leadSchema.safeParse({ ...valid, email: "pas-un-email" }).success).toBe(false);
  });

  it("rejette un message trop court", () => {
    expect(leadSchema.safeParse({ ...valid, message: "trop" }).success).toBe(false);
  });

  it("rejette un honeypot rempli", () => {
    expect(leadSchema.safeParse({ ...valid, website: "spam" }).success).toBe(false);
  });
});
