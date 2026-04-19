import { HoverEntry, escOp, escMd, op } from '../../types';

export const hoverData: Record<string, HoverEntry> = {
  // ── TrustZone ────────────────────────────────────────────────────────────────
  'sg':       '**sg** — Secure gateway: entry point to secure code from non-secure state',
  'tt':       (ops) => `**tt** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Test target: reads MPU/SAU access permissions for address ${escMd(op(ops,1))}`,
  'tta':      (ops) => `**tta** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Test target aliased: checks access permissions for aliased address (both banked regions)`,
  'ttau':     (ops) => `**ttau** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Test target aliased unprivileged: checks unprivileged access permissions for aliased address`,
  'ttat':     (ops) => `**ttat** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Test target address translation: returns region attributes for address ${escMd(op(ops,1))}`,
  'bxns':     (ops) => `**bxns** \`${escOp(ops,0)}\` — Branch and exchange to non-secure state: jump to ${escMd(op(ops,0))}, switching to non-secure`,
  'blxns':    (ops) => `**blxns** \`${escOp(ops,0)}\` — Branch with link and exchange to non-secure state: \`lr = next instruction\`, jump to ${escMd(op(ops,0))}`,

  // ── Double FPU (CM33 optional) ───────────────────────────────────────────────
  'vlldm':    (ops) => `**vlldm** \`${escOp(ops,0)}\` — VFP lazy load: restores floating-point registers from stack (lazy context switch)`,
  'vlstm':    (ops) => `**vlstm** \`${escOp(ops,0)}\` — VFP lazy store: saves floating-point registers to stack (lazy context switch)`,
};
