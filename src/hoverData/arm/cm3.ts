import { HoverEntry, escOp, escMd, op } from '../../types';

export const hoverData: Record<string, HoverEntry> = {
  // ── Data movement ────────────────────────────────────────────────────────────
  'movw':     (ops) => `**movw** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Move 16-bit immediate into lower half of ${escMd(op(ops,0))} (zero-extends)`,
  'movt':     (ops) => `**movt** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Move 16-bit immediate into upper half of ${escMd(op(ops,0))} (lower half unchanged)`,

  // ── Loads ────────────────────────────────────────────────────────────────────
  'ldr.w':    (ops) => `**ldr.w** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — 32-bit Thumb-2 load: \`${escOp(ops,0)} = mem${escOp(ops,1)}\``,
  'ldrb.w':   (ops) => `**ldrb.w** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — 32-bit Thumb-2 load byte (zero-extended)`,
  'ldrh.w':   (ops) => `**ldrh.w** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — 32-bit Thumb-2 load halfword (zero-extended)`,
  'ldrd':     (ops) => `**ldrd** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Load register dual: loads two consecutive words into ${escMd(op(ops,0))} and ${escMd(op(ops,1))}`,
  'ldrex':    (ops) => `**ldrex** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Load exclusive word: \`${escOp(ops,0)} = mem${escOp(ops,1)}\` (sets exclusive monitor)`,
  'ldrexb':   (ops) => `**ldrexb** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Load exclusive byte (sets exclusive monitor)`,
  'ldrexh':   (ops) => `**ldrexh** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Load exclusive halfword (sets exclusive monitor)`,

  // ── Stores ───────────────────────────────────────────────────────────────────
  'str.w':    (ops) => `**str.w** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — 32-bit Thumb-2 store: \`mem${escOp(ops,1)} = ${escOp(ops,0)}\``,
  'strb.w':   (ops) => `**strb.w** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — 32-bit Thumb-2 store byte`,
  'strh.w':   (ops) => `**strh.w** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — 32-bit Thumb-2 store halfword`,
  'stmdb':    (ops) => `**stmdb** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Store multiple, decrement before`,
  'strd':     (ops) => `**strd** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Store register dual: stores two consecutive words from ${escMd(op(ops,0))} and ${escMd(op(ops,1))}`,
  'strex':    (ops) => `**strex** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Store exclusive word: \`mem${escOp(ops,2)} = ${escOp(ops,1)}\`, result (0/1) in ${escMd(op(ops,0))}`,
  'strexb':   (ops) => `**strexb** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Store exclusive byte, result (0/1) in ${escMd(op(ops,0))}`,
  'strexh':   (ops) => `**strexh** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Store exclusive halfword, result (0/1) in ${escMd(op(ops,0))}`,
  'stlex':    (ops) => `**stlex** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Store-release exclusive word, result (0/1) in ${escMd(op(ops,0))}`,
  'stlexb':   (ops) => `**stlexb** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Store-release exclusive byte, result (0/1) in ${escMd(op(ops,0))}`,
  'stlexh':   (ops) => `**stlexh** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Store-release exclusive halfword, result (0/1) in ${escMd(op(ops,0))}`,

  // ── Arithmetic ───────────────────────────────────────────────────────────────
  'add.w':    (ops) => `**add.w** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — 32-bit Thumb-2 add: \`${escOp(ops,0)} = ${escOp(ops,1)} + ${escOp(ops,2)}\``,
  'sub.w':    (ops) => `**sub.w** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — 32-bit Thumb-2 subtract`,
  'mla':      (ops) => `**mla** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}, ${escOp(ops,3)}\` — Multiply-accumulate: \`${escOp(ops,0)} = ${escOp(ops,3)} + ${escOp(ops,1)}×${escOp(ops,2)}\``,
  'mls':      (ops) => `**mls** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}, ${escOp(ops,3)}\` — Multiply-subtract: \`${escOp(ops,0)} = ${escOp(ops,3)} - ${escOp(ops,1)}×${escOp(ops,2)}\``,
  'umull':    (ops) => `**umull** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}, ${escOp(ops,3)}\` — Unsigned multiply long: \`{${escOp(ops,1)}:${escOp(ops,0)}} = ${escOp(ops,2)} × ${escOp(ops,3)}\``,
  'smull':    (ops) => `**smull** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}, ${escOp(ops,3)}\` — Signed multiply long: \`{${escOp(ops,1)}:${escOp(ops,0)}} = ${escOp(ops,2)} × ${escOp(ops,3)}\``,
  'smlal':    (ops) => `**smlal** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}, ${escOp(ops,3)}\` — Signed multiply long accumulate: \`{${escOp(ops,1)}:${escOp(ops,0)}} += ${escOp(ops,2)} × ${escOp(ops,3)}\``,
  'umlal':    (ops) => `**umlal** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}, ${escOp(ops,3)}\` — Unsigned multiply long accumulate: \`{${escOp(ops,1)}:${escOp(ops,0)}} += ${escOp(ops,2)} × ${escOp(ops,3)}\``,
  'sdiv':     (ops) => `**sdiv** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Signed divide: \`${escOp(ops,0)} = ${escOp(ops,1)} / ${escOp(ops,2)}\``,
  'udiv':     (ops) => `**udiv** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Unsigned divide: \`${escOp(ops,0)} = ${escOp(ops,1)} / ${escOp(ops,2)}\``,

  // ── Logical / Shift ──────────────────────────────────────────────────────────
  'rrx':      (ops) => `**rrx** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Rotate right extended through carry`,
  'clz':      (ops) => `**clz** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Count leading zeros: \`${escOp(ops,0)} = clz(${escOp(ops,1)})\``,
  'uxtab':    (ops) => `**uxtab** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Zero-extend byte and add`,
  'sxtab':    (ops) => `**sxtab** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Sign-extend byte and add`,
  'sxtb16':   (ops) => `**sxtb16** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Sign-extend two bytes to two halfwords`,
  'uxtb16':   (ops) => `**uxtb16** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Zero-extend two bytes to two halfwords`,
  'rbit':     (ops) => `**rbit** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Reverse bits: \`${escOp(ops,0)} = bit_reverse(${escOp(ops,1)})\``,
  'bfc':      (ops) => `**bfc** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Bit field clear: \`${escOp(ops,0)}<msb:lsb> = 0\``,
  'bfi':      (ops) => `**bfi** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}, ${escOp(ops,3)}\` — Bit field insert: copies bits from ${escMd(op(ops,1))} into ${escMd(op(ops,0))} at position lsb`,
  'sbfx':     (ops) => `**sbfx** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}, ${escOp(ops,3)}\` — Signed bit field extract: extracts and sign-extends a bit field`,
  'ubfx':     (ops) => `**ubfx** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}, ${escOp(ops,3)}\` — Unsigned bit field extract: extracts and zero-extends a bit field`,
  'usat':     (ops) => `**usat** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Unsigned saturate: saturates ${escMd(op(ops,2))} to ${escMd(op(ops,1))}-bit unsigned value`,
  'ssat':     (ops) => `**ssat** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Signed saturate: saturates ${escMd(op(ops,2))} to ${escMd(op(ops,1))}-bit signed value`,

  // ── Compare / Test ───────────────────────────────────────────────────────────
  'teq':      (ops) => `**teq** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Test equivalence: N/Z flags from \`${escOp(ops,0)} ^ ${escOp(ops,1)}\``,

  // ── Branches ─────────────────────────────────────────────────────────────────
  'cbz':      (ops) => `**cbz** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Compare and branch if ${escMd(op(ops,0))} == 0`,
  'cbnz':     (ops) => `**cbnz** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Compare and branch if ${escMd(op(ops,0))} ≠ 0`,
  'it':       (ops) => `**it** \`${escOp(ops,0)}\` — If-Then block: next instruction is conditional on ${escMd(op(ops,0))}`,
  'ite':      (ops) => `**ite** \`${escOp(ops,0)}\` — If-Then-Else block: 2 conditional instructions`,
  'itt':      (ops) => `**itt** \`${escOp(ops,0)}\` — If-Then-Then: 2 instructions with same condition`,
  'itee':     (ops) => `**itee** \`${escOp(ops,0)}\` — If-Then-Else-Else: 3 conditional instructions`,
  'itet':     (ops) => `**itet** \`${escOp(ops,0)}\` — If-Then-Else-Then: 3 conditional instructions`,
  'itte':     (ops) => `**itte** \`${escOp(ops,0)}\` — If-Then-Then-Else: 3 conditional instructions`,
  'ittt':     (ops) => `**ittt** \`${escOp(ops,0)}\` — If-Then-Then-Then: 3 conditional instructions`,
  'tbb':      (ops) => `**tbb** \`${escOp(ops,0)}\` — Table branch byte: PC-relative branch using byte offset table`,
  'tbh':      (ops) => `**tbh** \`${escOp(ops,0)}\` — Table branch halfword: PC-relative branch using halfword offset table`,

  // ── Hints / Prefetch ─────────────────────────────────────────────────────────
  'pld':      (ops) => `**pld** \`${escOp(ops,0)}\` — Preload data hint (prefetch cache line)`,
  'pli':      (ops) => `**pli** \`${escOp(ops,0)}\` — Preload instruction hint`,
  'dbg':      '**dbg** — Debug hint: hint to debug/trace system',
  'clrex':    '**clrex** — Clear exclusive: clears exclusive monitor state',

  // ── Exception ────────────────────────────────────────────────────────────────
  'rfe':      (ops) => `**rfe** \`${escOp(ops,0)}\` — Return from exception: restores PC and CPSR from stack`,
  'srs':      (ops) => `**srs** \`${escOp(ops,0)}\` — Store return state: saves LR and SPSR to stack`,
};
