#!/usr/bin/env node
import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const card = JSON.parse(readFileSync(join(root, 'figures/blueprint-wight/arch-card.json'), 'utf8'));

if (card.figureId !== 'blueprint-wight') throw new Error('bad figureId');
if (card.panes.length !== 2) throw new Error('need exactly two panes');

let ok = 0;
for (const pane of card.panes) {
  const p = join(root, pane.path);
  if (!existsSync(p)) throw new Error('missing ' + pane.path);
  const n = statSync(p).size;
  if (n < pane.minBytes) throw new Error(pane.path + ' too small: ' + n);
  ok += 1;
}
for (const page of card.pages) {
  if (!existsSync(join(root, page))) throw new Error('missing page ' + page);
  ok += 1;
}
console.log(`ok blueprint-wight ${ok}/${card.panes.length + card.pages.length}`);
