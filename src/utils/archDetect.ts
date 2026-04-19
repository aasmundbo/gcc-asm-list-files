import type * as vscode from 'vscode';
import { Arch } from '../types';

export type { Arch };

const FPU_RE   = /\b(vmov|vadd|vsub|vmul|vdiv|vldr|vstr|vcmp|vcvt|vpush|vpop)\b/i;
const TZ_RE    = /\b(sg|tt|tta|ttau|ttat)\b/i;
const CM3_RE   = /\b(sdiv|udiv|cbz|cbnz|it)\b/i;
const ARM_ARCH_OVERRIDES = new Set(['cm0', 'cm3', 'cm4', 'cm33']);

export function detectArchFromLines(lines: string[], armOverride?: string): Arch {
  const headerLimit = Math.min(lines.length, 5);
  let isArm = false;
  for (let i = 0; i < headerLimit; i++) {
    if (lines[i].includes('elf32-littleriscv')) { return 'riscv'; }
    if (lines[i].includes('elf32-littlearm'))   { isArm = true; break; }
  }
  if (!isArm) { return 'unknown'; }

  if (armOverride && ARM_ARCH_OVERRIDES.has(armOverride)) {
    return armOverride as Arch;
  }

  const scanLimit = Math.min(lines.length, 300);
  let hasFpu = false;
  let hasTz  = false;
  let hasCm3 = false;
  for (let i = 0; i < scanLimit; i++) {
    const line = lines[i];
    if (!hasFpu && FPU_RE.test(line))  { hasFpu = true; }
    if (!hasTz  && TZ_RE.test(line))   { hasTz  = true; }
    if (!hasCm3 && CM3_RE.test(line))  { hasCm3 = true; }
    if (hasFpu && hasTz) { break; }
  }

  if (hasFpu) { return hasTz ? 'cm33' : 'cm4'; }
  if (hasCm3) { return 'cm3'; }
  return 'cm33';
}

export function detectArch(document: vscode.TextDocument): Arch {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const vs = require('vscode') as typeof import('vscode');
  const armOverride = vs.workspace.getConfiguration('gccLst').get<string>('armTarget');
  const lines: string[] = [];
  const count = Math.min(300, document.lineCount);
  for (let i = 0; i < count; i++) {
    lines.push(document.lineAt(i).text);
  }
  return detectArchFromLines(lines, armOverride);
}
