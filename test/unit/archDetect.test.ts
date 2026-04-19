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

  it('returns cm33 from elf32-littlearm header with no tell-tale instructions (safe default)', () => {
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

  it('only checks first 5 lines for header', () => {
    const lines = [
      'line0', 'line1', 'line2', 'line3', 'line4',
      '/project/example.elf:     file format elf32-littleriscv',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'unknown');
  });

  // ── ARM heuristic scanning ──────────────────────────────────────────────────

  it('detects cm3 when sdiv is present', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littlearm',
      '   100:  f8d0 0000   ldr r0, [r0]',
      '   104:  fb90 f0f1   sdiv r0, r0, r1',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'cm3');
  });

  it('detects cm3 when udiv is present', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littlearm',
      '   100:  fb80 f0f1   udiv r0, r0, r1',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'cm3');
  });

  it('detects cm3 when cbz is present', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littlearm',
      '   100:  b110        cbz r0, 108',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'cm3');
  });

  it('detects cm3 when it is present', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littlearm',
      '   100:  bf08        it eq',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'cm3');
  });

  it('detects cm4 when vmov.f32 is present', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littlearm',
      '   100:  eeb0 0a40   vmov.f32 s0, s0',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'cm4');
  });

  it('detects cm4 when vldr is present', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littlearm',
      '   100:  ed90 0a00   vldr s0, [r0]',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'cm4');
  });

  it('detects cm33 when sg is present alongside FPU', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littlearm',
      '   100:  e7fe        sg',
      '   102:  ed90 0a00   vldr s0, [r0]',
    ];
    assert.strictEqual(detectArchFromLines(lines), 'cm33');
  });

  it('returns cm33 when sg present without FPU (sg alone does not trigger TZ path, fallback is cm33)', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littlearm',
      '   100:  e7fe        sg',
    ];
    // sg alone — TZ check only runs when FPU is found; sg without FPU falls to
    // the cm3 check, which also doesn't match, so default cm33 applies.
    assert.strictEqual(detectArchFromLines(lines), 'cm33');
  });

  it('armTarget override forces cm3 regardless of body content', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littlearm',
      '   100:  ed90 0a00   vldr s0, [r0]',
    ];
    assert.strictEqual(detectArchFromLines(lines, 'cm3'), 'cm3');
  });

  it('armTarget override forces cm33 regardless of body content', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littlearm',
      '   100:  e000        b 104',
    ];
    assert.strictEqual(detectArchFromLines(lines, 'cm33'), 'cm33');
  });

  it('armTarget override forces cm0 regardless of body content', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littlearm',
      '   100:  fb90 f0f1   sdiv r0, r0, r1',
    ];
    assert.strictEqual(detectArchFromLines(lines, 'cm0'), 'cm0');
  });

  it('armTarget override is ignored for non-arm headers', () => {
    const lines = [
      '/project/example.elf:     file format elf32-littleriscv',
    ];
    assert.strictEqual(detectArchFromLines(lines, 'cm33'), 'riscv');
  });
});
