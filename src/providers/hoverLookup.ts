import { hoverData as riscvData } from '../hoverData/riscv';
import { hoverData as cm33Data }  from '../hoverData/cm33';
import { Arch } from '../utils/archDetect';

export function lookupHoverText(word: string, arch: Arch): string | null {
  const key = word.toLowerCase();
  if (arch === 'riscv') { return riscvData[key] ?? null; }
  if (arch === 'cm33')  { return cm33Data[key]  ?? null; }
  return null;
}
