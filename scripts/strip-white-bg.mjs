/* Trim les bordures transparentes des PNG V2 (sources `ref-v2/small/*`).
   Copie + trim → `public/v2/`. Plus de chromakey : les sources sont déjà transparentes. */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const mapping = [
  { src: "ref-v2/small/carte_50points.png", dest: "public/v2/card-50pts.png" },
  { src: "ref-v2/small/carte_forum.png", dest: "public/v2/card-lot.png" },
  { src: "ref-v2/small/barre_notification.png", dest: "public/v2/notif-but.png" },
  { src: "public/v2/phone-mock.png", dest: "public/v2/phone-mock.png" },
];

for (const { src, dest } of mapping) {
  const out = await sharp(path.resolve(src))
    .ensureAlpha()
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
    .png()
    .toBuffer();
  await fs.writeFile(path.resolve(dest), out);
  const meta = await sharp(out).metadata();
  console.log(`${path.basename(dest)} -> ${meta.width}×${meta.height}`);
}
