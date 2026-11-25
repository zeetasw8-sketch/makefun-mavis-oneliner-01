import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const text = fs.readFileSync(path.join(dir, "line.txt"), "utf8");

function validateText(value: string): void {
  if (value.trim().length === 0) {
    console.error("line.txt is empty");
    process.exit(1);
  }

  if (value.length > 280) {
    console.error("line.txt exceeds 280 characters");
    process.exit(1);
  }
}

validateText(text);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), text);
