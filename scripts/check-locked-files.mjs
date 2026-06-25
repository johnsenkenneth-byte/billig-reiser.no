import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const lockPath = resolve(root, "locked-files.json");
const lock = JSON.parse(readFileSync(lockPath, "utf8"));

const failures = [];

for (const file of lock.files) {
  const absolutePath = resolve(root, file.path);

  if (!existsSync(absolutePath)) {
    failures.push(`${file.path}: mangler`);
    continue;
  }

  const hash = createHash("sha256").update(readFileSync(absolutePath)).digest("hex");
  if (hash !== file.sha256) {
    failures.push(`${file.path}: endret (${hash})`);
  }
}

if (failures.length) {
  console.error("Låste Thailand-filer er endret:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`OK: ${lock.files.length} låste Thailand-filer er uendret.`);
