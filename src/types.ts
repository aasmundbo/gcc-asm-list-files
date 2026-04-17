export type Arch = 'riscv' | 'cm33' | 'unknown';
export type HoverEntry = string | ((ops: string[]) => string);

/** Safely get operand at index i, returning '?' if missing. */
export const op = (ops: string[], i: number): string => ops[i] ?? '?';

/** Escape backticks so the value is safe inside a markdown code span. */
export function escOp(ops: string[], i: number): string {
  const val = ops[i] ?? '?';
  return val.replace(/`/g, '\\`');
}

/** Escape markdown special characters so the value renders literally in markdown text. */
export function escMd(s: string): string {
  return s.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
}
