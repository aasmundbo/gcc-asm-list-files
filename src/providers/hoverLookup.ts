import { hoverData as riscvData } from '../hoverData/riscv';
import { hoverData as baseData } from '../hoverData/arm/base';
import { hoverData as cm3LayerData } from '../hoverData/arm/cm3';
import { hoverData as cm4LayerData } from '../hoverData/arm/cm4';
import { hoverData as cm33LayerData } from '../hoverData/arm/cm33';
import { Arch, HoverEntry } from '../types';
import { parseOperands } from './operandParser';

const cm0HoverData:  Record<string, HoverEntry> = { ...baseData };
const cm3HoverData:  Record<string, HoverEntry> = { ...baseData, ...cm3LayerData };
const cm4HoverData:  Record<string, HoverEntry> = { ...baseData, ...cm3LayerData, ...cm4LayerData };
const cm33HoverData: Record<string, HoverEntry> = { ...baseData, ...cm3LayerData, ...cm4LayerData, ...cm33LayerData };

export function lookupHoverText(word: string, arch: Arch, line?: string): string | null {
  const key = word.toLowerCase();
  let map: Record<string, HoverEntry>;
  switch (arch) {
    case 'riscv': map = riscvData; break;
    case 'cm0':   map = cm0HoverData; break;
    case 'cm3':   map = cm3HoverData; break;
    case 'cm4':   map = cm4HoverData; break;
    case 'cm33':  map = cm33HoverData; break;
    default: return null;
  }
  const entry = map[key];
  if (entry === undefined) { return null; }
  if (typeof entry === 'string') { return entry; }
  const ops = line ? parseOperands(line, word) : [];
  return entry(ops);
}
