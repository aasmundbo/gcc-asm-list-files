import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { findAnnotation, resolveFilePath, PathMapping } from '../../src/providers/definitionResolver';

describe('findAnnotation', () => {
  const lines = [
    '',
    'Disassembly of section .text:',
    '',
    '/home/user/project/src/main.c:42',
    'int main(void) {',
    '    return 0;',
    '1234:   push {r3, lr}',
  ];

  it('finds annotation on the line immediately before C source', () => {
    const result = findAnnotation(lines, 4);
    assert.deepStrictEqual(result, { filePath: '/home/user/project/src/main.c', lineNumber: 42 });
  });

  it('finds annotation scanning backward from deeper line', () => {
    const result = findAnnotation(lines, 5);
    assert.deepStrictEqual(result, { filePath: '/home/user/project/src/main.c', lineNumber: 42 });
  });

  it('returns null when no annotation exists above', () => {
    const result = findAnnotation(lines, 1);
    assert.strictEqual(result, null);
  });

  it('returns null for empty lines array', () => {
    assert.strictEqual(findAnnotation([], 0), null);
  });

  it('handles annotation as first line (index 0)', () => {
    const l = ['/foo/bar.c:1', 'some code'];
    assert.deepStrictEqual(findAnnotation(l, 1), { filePath: '/foo/bar.c', lineNumber: 1 });
  });
});

describe('resolveFilePath', () => {
  let tmpDir: string;
  let realFile: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gcc-lst-test-'));
    realFile = path.join(tmpDir, 'main.c');
    fs.writeFileSync(realFile, '// stub');
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('returns raw path when no mappings configured', () => {
    assert.strictEqual(resolveFilePath('/project/src/main.c', []), '/project/src/main.c');
  });

  it('applies first matching mapping whose result exists on disk', () => {
    const mappings: PathMapping[] = [
      { from: '/project', to: tmpDir },
    ];
    const raw = '/project/main.c';
    const result = resolveFilePath(raw, mappings);
    assert.strictEqual(result, realFile);
  });

  it('skips mapping whose resolved path does not exist', () => {
    const mappings: PathMapping[] = [
      { from: '/project', to: '/nonexistent/path' },
    ];
    assert.strictEqual(resolveFilePath('/project/main.c', mappings), '/project/main.c');
  });

  it('tries mappings in order and uses first match', () => {
    const mappings: PathMapping[] = [
      { from: '/project', to: '/nonexistent' },
      { from: '/project', to: tmpDir },
    ];
    assert.strictEqual(resolveFilePath('/project/main.c', mappings), realFile);
  });

  it('returns raw path when no mapping prefix matches', () => {
    const mappings: PathMapping[] = [
      { from: '/other', to: tmpDir },
    ];
    assert.strictEqual(resolveFilePath('/project/main.c', mappings), '/project/main.c');
  });

  it('normalises path traversal in rawPath', () => {
    const mappings: PathMapping[] = [];
    const result = resolveFilePath('/project/../etc/passwd', mappings);
    assert.strictEqual(result, '/etc/passwd');
  });

  it('rejects candidate that escapes the to root', () => {
    const mappings: PathMapping[] = [
      { from: '/project', to: tmpDir },
    ];
    const result = resolveFilePath('/project/../etc/passwd', mappings);
    assert.strictEqual(result, '/etc/passwd');
  });
});

describe('findAnnotation with maxScanLines', () => {
  const buildLines = (count: number): string[] => {
    const lines = Array(count).fill('  code line');
    lines[0] = '/foo/bar.c:10';
    return lines;
  };

  it('returns null when annotation is beyond maxScanLines', () => {
    const lines = buildLines(251);
    const result = findAnnotation(lines, 250, 200);
    assert.strictEqual(result, null);
  });

  it('finds annotation when maxScanLines is large enough', () => {
    const lines = buildLines(251);
    const result = findAnnotation(lines, 250, 300);
    assert.deepStrictEqual(result, { filePath: '/foo/bar.c', lineNumber: 10 });
  });
});
