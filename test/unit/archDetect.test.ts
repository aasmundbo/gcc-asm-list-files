import * as assert from 'assert';
import { detectArchFromLines } from '../../src/utils/archDetect';

describe('detectArchFromLines', () => {
  it('detects RISC-V from elf32-littleriscv header', () => {
    const lines = [
      '',
      '/project/example.elf:     file format elf32-littleriscv',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'riscv');
  });

  it('detects CM33 from elf32-littlearm header', () => {
    const lines = [
      '',
      '/project/example.elf:     file format elf32-littlearm',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'cm33');
  });

  it('returns unknown for unrecognized format', () => {
    const lines = [
      '/project/example.elf:     file format elf64-x86-64',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'unknown');
  });

  it('returns unknown for empty input', () => {
    assert.strictEqual(detectArchFromLines([]), 'unknown');
  });

  it('only checks first 5 lines', () => {
    const lines = [
      'line0', 'line1', 'line2', 'line3', 'line4',
      '/project/example.elf:     file format elf32-littleriscv',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'unknown');
  });
});
