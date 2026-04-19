import * as assert from 'assert';
import { lookupHoverText } from '../../src/providers/hoverLookup';

describe('lookupHoverText', () => {
  it('returns description for known RISC-V mnemonic', () => {
    const result = lookupHoverText('addi', 'riscv');
    assert.ok(result !== null, 'expected non-null for addi');
    assert.ok(result!.includes('addi'), 'description should mention addi');
  });

  it('is case-insensitive for RISC-V', () => {
    assert.strictEqual(lookupHoverText('ADDI', 'riscv'), lookupHoverText('addi', 'riscv'));
  });

  it('returns description for known CM33 mnemonic', () => {
    const result = lookupHoverText('push', 'cm33');
    assert.ok(result !== null, 'expected non-null for push');
    assert.ok(result!.includes('push'), 'description should mention push');
  });

  it('returns null for unknown mnemonic', () => {
    assert.strictEqual(lookupHoverText('xyz_unknown', 'riscv'), null);
  });

  it('returns null for unknown arch', () => {
    assert.strictEqual(lookupHoverText('addi', 'unknown'), null);
  });

  it('does not cross-contaminate arches — push is ARM only', () => {
    assert.strictEqual(lookupHoverText('push', 'riscv'), null);
  });

  it('does not cross-contaminate arches — addi is RISC-V only', () => {
    assert.strictEqual(lookupHoverText('addi', 'cm33'), null);
  });

  // ── CM0 arch ─────────────────────────────────────────────────────────────────

  it('CM0 returns hover for a CM0 instruction (push)', () => {
    const result = lookupHoverText('push', 'cm0');
    assert.ok(result !== null, 'expected non-null for push on cm0');
    assert.ok(result!.includes('push'));
  });

  it('CM0 returns null for CM3-only instruction (sdiv)', () => {
    assert.strictEqual(lookupHoverText('sdiv', 'cm0'), null);
  });

  it('CM0 returns null for CM3-only instruction (cbz)', () => {
    assert.strictEqual(lookupHoverText('cbz', 'cm0'), null);
  });

  // ── CM3 arch ─────────────────────────────────────────────────────────────────

  it('CM3 returns hover for a CM3 instruction (sdiv)', () => {
    const result = lookupHoverText('sdiv', 'cm3');
    assert.ok(result !== null, 'expected non-null for sdiv on cm3');
    assert.ok(result!.includes('sdiv'));
  });

  it('CM3 returns hover for a base instruction (push)', () => {
    const result = lookupHoverText('push', 'cm3');
    assert.ok(result !== null, 'expected non-null for push on cm3');
  });

  it('CM3 returns null for a VFP instruction (vmov)', () => {
    assert.strictEqual(lookupHoverText('vmov', 'cm3'), null);
  });

  // ── CM4 arch ─────────────────────────────────────────────────────────────────

  it('CM4 returns hover for a VFP instruction (vmov)', () => {
    const result = lookupHoverText('vmov', 'cm4');
    assert.ok(result !== null, 'expected non-null for vmov on cm4');
    assert.ok(result!.includes('vmov'));
  });

  it('CM4 returns hover for a CM3 instruction (sdiv)', () => {
    const result = lookupHoverText('sdiv', 'cm4');
    assert.ok(result !== null, 'expected non-null for sdiv on cm4');
  });

  it('CM4 returns null for a CM33 TrustZone instruction (sg)', () => {
    assert.strictEqual(lookupHoverText('sg', 'cm4'), null);
  });

  // ── CM33 arch ────────────────────────────────────────────────────────────────

  it('CM33 returns hover for TrustZone instruction (sg)', () => {
    const result = lookupHoverText('sg', 'cm33');
    assert.ok(result !== null, 'expected non-null for sg on cm33');
    assert.ok(result!.includes('sg'));
  });

  it('CM33 returns hover for VFP instruction (vmov)', () => {
    const result = lookupHoverText('vmov', 'cm33');
    assert.ok(result !== null, 'expected non-null for vmov on cm33');
  });

  // ── Contextual hover with line text ─────────────────────────────────────────

  it('substitutes real register names from line for RISC-V addi', () => {
    const line = '41000008:\t7fc18193          \taddi\tgp,gp,2044 # 41004800 <__global_pointer$>';
    const result = lookupHoverText('addi', 'riscv', line);
    assert.ok(result !== null, 'expected non-null');
    assert.ok(result!.includes('gp'), 'should contain actual register name gp');
    assert.ok(!result!.includes('rd') && !result!.includes('rs1'), 'should not contain generic placeholders');
  });

  it('substitutes real register names from line for RISC-V add', () => {
    const line = '41000010:\t00b50533          \tadd\ta0,a0,a1';
    const result = lookupHoverText('add', 'riscv', line);
    assert.ok(result !== null);
    assert.ok(result!.includes('a0'), 'should contain a0');
    assert.ok(result!.includes('a1'), 'should contain a1');
  });

  it('substitutes real register names from line for RISC-V addi sp', () => {
    const line = '41000000:\t1151                \taddi\tsp,sp,-12';
    const result = lookupHoverText('addi', 'riscv', line);
    assert.ok(result !== null);
    assert.ok(result!.includes('sp'), 'should contain sp');
    assert.ok(result!.includes('-12'), 'should contain immediate -12');
  });

  it('substitutes real operands for CM33 push', () => {
    const line = '    5744:\tb508      \tpush\t{r3, lr}';
    const result = lookupHoverText('push', 'cm33', line);
    assert.ok(result !== null);
    assert.ok(result!.includes('r3') || result!.includes('lr') || result!.includes('{r3, lr}'),
      'should contain actual register list');
  });

  it('substitutes real operands for CM33 msr', () => {
    const line = '    5748:\tf383 8809 \tmsr\tPSP, r3';
    const result = lookupHoverText('msr', 'cm33', line);
    assert.ok(result !== null);
    assert.ok(result!.includes('PSP'), 'should contain PSP');
    assert.ok(result!.includes('r3'), 'should contain r3');
  });

  it('falls back to plain string when no line provided for zero-operand instruction', () => {
    const result = lookupHoverText('nop', 'cm33');
    assert.ok(result !== null);
    assert.ok(result!.includes('nop'));
  });

  it('falls back gracefully when line provided but operands are empty', () => {
    const line = '  10c:\t00008067          \tret';
    const result = lookupHoverText('ret', 'riscv', line);
    assert.ok(result !== null, 'should still return description for ret');
    assert.ok(result!.includes('ret'));
  });
});
