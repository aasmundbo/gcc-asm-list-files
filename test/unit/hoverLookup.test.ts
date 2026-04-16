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

  it('does not cross-contaminate arches — push is CM33 only', () => {
    assert.strictEqual(lookupHoverText('push', 'riscv'), null);
  });

  it('does not cross-contaminate arches — addi is RISC-V only', () => {
    assert.strictEqual(lookupHoverText('addi', 'cm33'), null);
  });
});
