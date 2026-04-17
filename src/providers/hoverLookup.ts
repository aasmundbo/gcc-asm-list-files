import { hoverData as riscvData, HoverEntry } from '../hoverData/riscv';
import { hoverData as cm33Data } from '../hoverData/cm33';
import { Arch } from '../utils/archDetect';
import { parseOperands } from './operandParser';

export function lookupHoverText(word: string, arch: Arch, line?: string): string | null {
  const key = word.toLowerCase();
  let entry: HoverEntry | undefined;
  if (arch === 'riscv') { entry = riscvData[key]; }
  else if (arch === 'cm33') { entry = cm33Data[key]; }
  if (entry === undefined) { return null; }

  if (typeof entry === 'string') { return entry; }

  const ops = line ? parseOperands(line, word) : [];
  return entry(ops);
}
