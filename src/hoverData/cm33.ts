import { hoverData as baseEntries } from './arm/base';
import { hoverData as cm3Entries } from './arm/cm3';
import { hoverData as cm4Entries } from './arm/cm4';
import { hoverData as cm33Entries } from './arm/cm33';
import { HoverEntry } from '../types';

export const hoverData: Record<string, HoverEntry> = {
  ...baseEntries,
  ...cm3Entries,
  ...cm4Entries,
  ...cm33Entries,
};
