import { describe, it, expect } from "vitest";
import { organizationLd, softwareApplicationLd, webSiteLd } from "../jsonld";

describe("jsonld", () => {
  it("SoftwareApplication : catégorie jeu et prix gratuit", () => {
    const ld = softwareApplicationLd("fr");
    expect(ld["@type"]).toBe("SoftwareApplication");
    expect(ld.applicationCategory).toBe("GameApplication");
    expect((ld.offers as { price: string }).price).toBe("0");
  });

  it("Organization : entité légale et réseaux", () => {
    const ld = organizationLd();
    expect(ld.legalName).toBe("SAS Grand Jeu");
    expect((ld.sameAs as string[]).length).toBe(3);
  });

  it("WebSite : bilingue", () => {
    expect((webSiteLd().inLanguage as string[])).toContain("en");
  });
});
