#!/usr/bin/env node
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '../..');
const card = JSON.parse(readFileSync(join(here, 'routes.json'), 'utf8'));

if (card.figureId !== 'atlas-courier') throw new Error('bad figureId');
if (card.waveId !== '2026-09-28-m-relay') throw new Error('bad waveId');
if (card.mergePolicy !== 'pr-only') throw new Error('merge policy must be pr-only');
if (card.routes.length !== 2) throw new Error('need exactly 2 routes');
if (card.briefs.length !== 2) throw new Error('need exactly 2 briefs');
const banned = card.bannedTokens || [];
if (banned.some((t) => card.figureId.includes(t))) throw new Error('banned in id');
for (const need of ['affirmAgent.ts', 'challengeAgent.ts']) {
  if (!card.frozen.includes(need)) throw new Error('missing freeze ' + need);
}
for (const route of card.routes) {
  if (!route.id || !route.page || !route.outcome) throw new Error('route missing fields');
  if (!existsSync(join(root, route.page))) throw new Error('missing page ' + route.page);
}
for (const brief of card.briefs) {
  const p = join(root, brief.path);
  if (!existsSync(p)) throw new Error('missing brief ' + brief.path);
  const n = statSync(p).size;
  if (n < brief.minBytes) throw new Error(brief.path + ' too small: ' + n);
}
console.log(`ok atlas-courier routes=${card.routes.length} briefs=${card.briefs.length}`);
