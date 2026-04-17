import * as assert from 'assert';
import { op, escOp, escMd } from '../../src/types';

describe('op', () => {
  it('returns the value at index', () => {
    assert.strictEqual(op(['a', 'b', 'c'], 1), 'b');
  });
  it('returns ? when index is out of bounds', () => {
    assert.strictEqual(op([], 0), '?');
    assert.strictEqual(op(['x'], 5), '?');
  });
});

describe('escOp', () => {
  it('returns value when no backticks', () => {
    assert.strictEqual(escOp(['r4'], 0), 'r4');
  });
  it('escapes backticks', () => {
    assert.strictEqual(escOp(['a`b'], 0), 'a\\`b');
  });
  it('returns ? for missing index', () => {
    assert.strictEqual(escOp([], 0), '?');
  });
});

describe('escMd', () => {
  it('escapes markdown specials', () => {
    assert.strictEqual(escMd('*bold*'), '\\*bold\\*');
    assert.strictEqual(escMd('[link]'), '\\[link\\]');
    assert.strictEqual(escMd('a`b'), 'a\\`b');
  });
  it('leaves plain text unchanged', () => {
    assert.strictEqual(escMd('r4'), 'r4');
    assert.strictEqual(escMd('sp'), 'sp');
  });
});
