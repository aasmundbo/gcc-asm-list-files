import * as assert from 'assert';
import { parseOperands } from '../../src/providers/operandParser';

describe('parseOperands', () => {
  // ── RISC-V examples ──────────────────────────────────────────────────────────

  it('parses addi with comment suffix', () => {
    const line = '41000008:\t7fc18193          \taddi\tgp,gp,2044 # 41004800 <__global_pointer$>';
    assert.deepStrictEqual(parseOperands(line, 'addi'), ['gp', 'gp', '2044']);
  });

  it('parses addi with negative immediate', () => {
    const line = '41000000:\t1151                \taddi\tsp,sp,-12';
    assert.deepStrictEqual(parseOperands(line, 'addi'), ['sp', 'sp', '-12']);
  });

  it('parses three-register instruction', () => {
    const line = '41000010:\t00b50533          \tadd\ta0,a0,a1';
    assert.deepStrictEqual(parseOperands(line, 'add'), ['a0', 'a0', 'a1']);
  });

  it('parses jal with offset', () => {
    const line = '41000020:\t008000ef          \tjal\tra,41000028 <main>';
    assert.deepStrictEqual(parseOperands(line, 'jal'), ['ra', '41000028 <main>']);
  });

  // ── CM33/Thumb-2 examples ────────────────────────────────────────────────────

  it('parses ldr.w with bracket operand (not split on inner comma)', () => {
    const line = '    5764:\tf850 0023 \tldr.w\tr0, [r0, r3, lsl #2]';
    assert.deepStrictEqual(parseOperands(line, 'ldr'), ['r0', '[r0, r3, lsl #2]']);
  });

  it('parses push with register list (not split on inner comma)', () => {
    const line = '    5744:\tb508      \tpush\t{r3, lr}';
    assert.deepStrictEqual(parseOperands(line, 'push'), ['{r3, lr}']);
  });

  it('parses msr with two operands', () => {
    const line = '    5748:\tf383 8809 \tmsr\tPSP, r3';
    assert.deepStrictEqual(parseOperands(line, 'msr'), ['PSP', 'r3']);
  });

  it('parses adds with immediate', () => {
    const line = '    576c:\t3301      \tadds\tr3, #1';
    assert.deepStrictEqual(parseOperands(line, 'adds'), ['r3', '#1']);
  });

  it('parses ldr with simple bracket', () => {
    const line = '  1000:\te51b0004  \tldr\tr0, [r1, #4]';
    assert.deepStrictEqual(parseOperands(line, 'ldr'), ['r0', '[r1, #4]']);
  });

  it('parses push with multi-register list', () => {
    const line = '  2000:\te92d4010  \tpush\t{r3, r4, lr}';
    assert.deepStrictEqual(parseOperands(line, 'push'), ['{r3, r4, lr}']);
  });

  // ── CM33 with semicolon comment ──────────────────────────────────────────────

  it('strips CM33 semicolon comment', () => {
    const line = '  1004:\te59f0010  \tldr\tr0, [pc, #16] ; load address';
    assert.deepStrictEqual(parseOperands(line, 'ldr'), ['r0', '[pc, #16]']);
  });

  // ── Edge / fallback cases ────────────────────────────────────────────────────

  it('returns [] for empty line', () => {
    assert.deepStrictEqual(parseOperands('', 'addi'), []);
  });

  it('returns [] for zero-operand instruction (ret)', () => {
    const line = '  10c:\t00008067          \tret';
    assert.deepStrictEqual(parseOperands(line, 'ret'), []);
  });

  it('returns [] for zero-operand instruction (nop)', () => {
    const line = '  200:\t00000013          \tnop';
    assert.deepStrictEqual(parseOperands(line, 'nop'), []);
  });

  it('returns [] for line with only address and mnemonic + comment', () => {
    const line = '  100:\t00000013\tnop\t# nothing here';
    assert.deepStrictEqual(parseOperands(line, 'nop'), []);
  });

  it('handles mnemonic suffix (.w) case-insensitively', () => {
    const line = '  5764:\tf850 0023 \tLDR.W\tr0, [r1]';
    assert.deepStrictEqual(parseOperands(line, 'ldr'), ['r0', '[r1]']);
  });
});
