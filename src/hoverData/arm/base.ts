import { HoverEntry, escOp, escMd, op } from '../../types';

export const hoverData: Record<string, HoverEntry> = {
  // ── Stack ────────────────────────────────────────────────────────────────────
  'push':     (ops) => `**push** \`${escOp(ops,0)}\` — Push ${escMd(op(ops,0))} onto stack`,
  'pop':      (ops) => `**pop** \`${escOp(ops,0)}\` — Pop from stack into ${escMd(op(ops,0))}`,

  // ── Data movement ────────────────────────────────────────────────────────────
  'mov':      (ops) => `**mov** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Move: \`${escOp(ops,0)} = ${escOp(ops,1)}\` (does not update flags)`,
  'movs':     (ops) => `**movs** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Move and update N/Z flags: \`${escOp(ops,0)} = ${escOp(ops,1)}\``,
  'mrs':      (ops) => `**mrs** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Move from special register: \`${escOp(ops,0)} = ${escOp(ops,1)}\``,
  'msr':      (ops) => `**msr** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Move to special register: \`${escOp(ops,0)} = ${escOp(ops,1)}\``,

  // ── Loads ────────────────────────────────────────────────────────────────────
  'ldr':      (ops) => `**ldr** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Load 32-bit word: \`${escOp(ops,0)} = mem${escOp(ops,1)}\``,
  'ldrb':     (ops) => `**ldrb** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Load byte (zero-extended): \`${escOp(ops,0)} = mem${escOp(ops,1)}\``,
  'ldrh':     (ops) => `**ldrh** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Load halfword (zero-extended): \`${escOp(ops,0)} = mem${escOp(ops,1)}\``,
  'ldrsb':    (ops) => `**ldrsb** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Load byte (sign-extended): \`${escOp(ops,0)} = mem${escOp(ops,1)}\``,
  'ldrsh':    (ops) => `**ldrsh** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Load halfword (sign-extended): \`${escOp(ops,0)} = mem${escOp(ops,1)}\``,
  'ldm':      (ops) => `**ldm** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Load multiple registers from consecutive addresses`,
  'ldmia':    (ops) => `**ldmia** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Load multiple, increment after (${escMd(op(ops,0))} updated)`,

  // ── Stores ───────────────────────────────────────────────────────────────────
  'str':      (ops) => `**str** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Store 32-bit word: \`mem${escOp(ops,1)} = ${escOp(ops,0)}\``,
  'strb':     (ops) => `**strb** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Store byte: \`mem${escOp(ops,1)} = ${escOp(ops,0)}\``,
  'strh':     (ops) => `**strh** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Store halfword: \`mem${escOp(ops,1)} = ${escOp(ops,0)}\``,
  'stm':      (ops) => `**stm** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Store multiple registers`,
  'stmia':    (ops) => `**stmia** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Store multiple, increment after`,

  // ── Arithmetic ───────────────────────────────────────────────────────────────
  'add':      (ops) => `**add** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Add: \`${escOp(ops,0)} = ${escOp(ops,1)} + ${escOp(ops,2)}\``,
  'adds':     (ops) => `**adds** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${(ops[2] ?? ops[1] ?? '?').replace(/`/g, '\\`')}\` — Add and update N/Z/C/V flags: \`${escOp(ops,0)} = ${escOp(ops,1)} + ${(ops[2] ?? ops[1] ?? '?').replace(/`/g, '\\`')}\``,
  'sub':      (ops) => `**sub** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Subtract: \`${escOp(ops,0)} = ${escOp(ops,1)} - ${escOp(ops,2)}\``,
  'subs':     (ops) => `**subs** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Subtract and update flags: \`${escOp(ops,0)} = ${escOp(ops,1)} - ${escOp(ops,2)}\``,
  'rsb':      (ops) => `**rsb** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Reverse subtract: \`${escOp(ops,0)} = ${escOp(ops,2)} - ${escOp(ops,1)}\``,
  'rsbs':     (ops) => `**rsbs** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Reverse subtract and update flags: \`${escOp(ops,0)} = ${escOp(ops,2)} - ${escOp(ops,1)}\``,
  'adc':      (ops) => `**adc** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Add with carry: \`${escOp(ops,0)} = ${escOp(ops,1)} + ${escOp(ops,2)} + C\``,
  'adcs':     (ops) => `**adcs** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Add with carry, update flags`,
  'sbc':      (ops) => `**sbc** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Subtract with carry: \`${escOp(ops,0)} = ${escOp(ops,1)} - ${escOp(ops,2)} - ~C\``,
  'sbcs':     (ops) => `**sbcs** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Subtract with carry, update flags`,
  'mul':      (ops) => `**mul** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Multiply (lower 32 bits): \`${escOp(ops,0)} = ${escOp(ops,1)} × ${escOp(ops,2)}\``,

  // ── Logical / Shift ──────────────────────────────────────────────────────────
  'and':      (ops) => `**and** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Bitwise AND: \`${escOp(ops,0)} = ${escOp(ops,1)} & ${escOp(ops,2)}\``,
  'ands':     (ops) => `**ands** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Bitwise AND, update flags`,
  'orr':      (ops) => `**orr** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Bitwise OR: \`${escOp(ops,0)} = ${escOp(ops,1)} | ${escOp(ops,2)}\``,
  'orrs':     (ops) => `**orrs** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Bitwise OR, update flags`,
  'eor':      (ops) => `**eor** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Bitwise XOR: \`${escOp(ops,0)} = ${escOp(ops,1)} ^ ${escOp(ops,2)}\``,
  'eors':     (ops) => `**eors** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Bitwise XOR, update flags`,
  'bic':      (ops) => `**bic** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Bit clear: \`${escOp(ops,0)} = ${escOp(ops,1)} & ~${escOp(ops,2)}\``,
  'bics':     (ops) => `**bics** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Bit clear, update flags`,
  'mvn':      (ops) => `**mvn** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Bitwise NOT: \`${escOp(ops,0)} = ~${escOp(ops,1)}\``,
  'mvns':     (ops) => `**mvns** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Bitwise NOT, update flags`,
  'lsl':      (ops) => `**lsl** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Logical shift left: \`${escOp(ops,0)} = ${escOp(ops,1)} << ${escOp(ops,2)}\``,
  'lsls':     (ops) => `**lsls** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Logical shift left, update flags`,
  'lsr':      (ops) => `**lsr** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Logical shift right: \`${escOp(ops,0)} = ${escOp(ops,1)} >> ${escOp(ops,2)}\``,
  'lsrs':     (ops) => `**lsrs** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Logical shift right, update flags`,
  'asr':      (ops) => `**asr** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Arithmetic shift right (sign-extending)`,
  'asrs':     (ops) => `**asrs** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Arithmetic shift right, update flags`,
  'ror':      (ops) => `**ror** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Rotate right`,
  'rors':     (ops) => `**rors** \`${escOp(ops,0)}, ${escOp(ops,1)}, ${escOp(ops,2)}\` — Rotate right, update flags`,
  'rev':      (ops) => `**rev** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Reverse byte order: \`${escOp(ops,0)} = bswap(${escOp(ops,1)})\``,
  'rev16':    (ops) => `**rev16** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Reverse bytes in each halfword`,
  'revsh':    (ops) => `**revsh** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Reverse bytes in lower halfword and sign-extend`,
  'sxth':     (ops) => `**sxth** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Sign-extend halfword: \`${escOp(ops,0)} = sign_ext16(${escOp(ops,1)})\``,
  'sxtb':     (ops) => `**sxtb** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Sign-extend byte: \`${escOp(ops,0)} = sign_ext8(${escOp(ops,1)})\``,
  'uxth':     (ops) => `**uxth** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Zero-extend halfword: \`${escOp(ops,0)} = ${escOp(ops,1)} & 0xFFFF\``,
  'uxtb':     (ops) => `**uxtb** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Zero-extend byte: \`${escOp(ops,0)} = ${escOp(ops,1)} & 0xFF\``,

  // ── Compare / Test ───────────────────────────────────────────────────────────
  'cmp':      (ops) => `**cmp** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Compare: set flags for \`${escOp(ops,0)} - ${escOp(ops,1)}\``,
  'cmn':      (ops) => `**cmn** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Compare negative: flags from \`${escOp(ops,0)} + ${escOp(ops,1)}\``,
  'tst':      (ops) => `**tst** \`${escOp(ops,0)}, ${escOp(ops,1)}\` — Test bits: N/Z flags from \`${escOp(ops,0)} & ${escOp(ops,1)}\``,

  // ── Branches ─────────────────────────────────────────────────────────────────
  'b':        (ops) => `**b** \`${escOp(ops,0)}\` — Unconditional branch to ${escMd(op(ops,0))}`,
  'b.n':      (ops) => `**b.n** \`${escOp(ops,0)}\` — Narrow (16-bit) unconditional branch to ${escMd(op(ops,0))}`,
  'b.w':      (ops) => `**b.w** \`${escOp(ops,0)}\` — Wide (32-bit) unconditional branch to ${escMd(op(ops,0))}`,
  'bl':       (ops) => `**bl** \`${escOp(ops,0)}\` — Branch with link: \`lr = next instruction\`, jump to ${escMd(op(ops,0))}`,
  'blx':      (ops) => `**blx** \`${escOp(ops,0)}\` — Branch with link and exchange to ${escMd(op(ops,0))}`,
  'bx':       (ops) => `**bx** \`${escOp(ops,0)}\` — Branch and exchange: jump to ${escMd(op(ops,0))}, bit[0] selects Thumb/ARM`,
  'beq':      (ops) => `**beq** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if Z == 1 (equal)`,
  'bne':      (ops) => `**bne** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if Z == 0 (not equal)`,
  'bcs':      (ops) => `**bcs** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if C == 1 (carry set)`,
  'bcc':      (ops) => `**bcc** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if C == 0 (carry clear)`,
  'bmi':      (ops) => `**bmi** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if N == 1 (negative)`,
  'bpl':      (ops) => `**bpl** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if N == 0 (non-negative)`,
  'bvs':      (ops) => `**bvs** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if V == 1 (overflow)`,
  'bvc':      (ops) => `**bvc** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if V == 0 (no overflow)`,
  'bge':      (ops) => `**bge** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if N == V (signed ≥)`,
  'blt':      (ops) => `**blt** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if N ≠ V (signed <)`,
  'bgt':      (ops) => `**bgt** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if Z == 0 and N == V (signed >)`,
  'ble':      (ops) => `**ble** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if Z == 1 or N ≠ V (signed ≤)`,
  'bhi':      (ops) => `**bhi** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if C == 1 and Z == 0 (unsigned higher)`,
  'bls':      (ops) => `**bls** \`${escOp(ops,0)}\` — Branch to ${escMd(op(ops,0))} if C == 0 or Z == 1 (unsigned lower or same)`,

  // ── System ───────────────────────────────────────────────────────────────────
  'nop':      '**nop** — No operation',
  'wfi':      '**wfi** — Wait for interrupt (low-power stall)',
  'wfe':      '**wfe** — Wait for event',
  'sev':      '**sev** — Send event (wakes a core waiting on WFE)',
  'yield':    '**yield** — Yield hint: indicates to hardware that this thread can be switched out',
  'bkpt':     (ops) => `**bkpt** \`${escOp(ops,0)}\` — Breakpoint: causes DebugMonitor exception or halts debugger`,
  'svc':      (ops) => `**svc** \`${escOp(ops,0)}\` — Supervisor call: triggers SVC exception (OS syscall)`,
  'dmb':      '**dmb** — Data memory barrier: ensures memory accesses complete before continuing',
  'dsb':      '**dsb** — Data synchronisation barrier: stronger than DMB',
  'isb':      '**isb** — Instruction synchronisation barrier: flushes pipeline',
};
