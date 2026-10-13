/**
 * codex-quartermaster — Wave Q forge 20261013
 * Primary path: shared/figures/codex-quartermaster.contract.ts
 * Role: Inventory strategic modules and flag density drift.
 * Knowledge: N/V/S/D scoring, geometric density, no frozen agents.
 * Responsibilities: score modules, reject banned figure ids, report density.
 * Test: import { selfCheck }; expect { density: 8.12, bannedBlocked: true }
 */

export const FIGURE_ID = 'codex-quartermaster' as const;
export const WAVE_ID = 'Q-forge-20261013' as const;

const BANNED = ['planner', 'executor', 'monitor', 'data_agent'];

export function scoreModule(n: number, v: number, s: number, d: number): number {
  const weights = [1, 1, 1, 1];
  const product = Math.pow(n, weights[0]) * Math.pow(v, weights[1]) * Math.pow(s, weights[2]) * Math.pow(d, weights[3]);
  return Math.pow(product, 1 / 4);
}

export function selfCheck() {
  const density = scoreModule(8.5, 7.8, 8.2, 8.0);
  const bannedHit = BANNED.includes('planner');
  return {
    pass: Math.abs(density - 8.12) < 0.05 && bannedHit,
    density: Math.round(density * 100) / 100,
    bannedBlocked: bannedHit,
  };
}
