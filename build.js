const fs = require('fs');
const path = require('path');

const root = process.cwd();
const out = path.join(root, 'public');
const skip = new Set(['public', '.git', 'node_modules', '.vercel']);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else if (entry.isFile()) fs.copyFileSync(from, to);
  }
}

fs.rmSync(out, { recursive: true, force: true });
copyDir(root, out);
console.log('Build complete: static site copied to public/');
