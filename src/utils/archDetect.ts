import * as vscode from 'vscode';

export type Arch = 'riscv' | 'cm33' | 'unknown';

export function detectArchFromLines(lines: string[]): Arch {
  const limit = Math.min(lines.length, 5);
  for (let i = 0; i < limit; i++) {
    if (lines[i].includes('elf32-littleriscv')) { return 'riscv'; }
    if (lines[i].includes('elf32-littlearm'))   { return 'cm33';  }
  }
  return 'unknown';
}

export function detectArch(document: vscode.TextDocument): Arch {
  const lines: string[] = [];
  const count = Math.min(5, document.lineCount);
  for (let i = 0; i < count; i++) {
    lines.push(document.lineAt(i).text);
  }
  return detectArchFromLines(lines);
}
