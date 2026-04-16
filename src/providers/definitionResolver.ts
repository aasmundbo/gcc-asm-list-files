import { existsSync } from 'fs';

export interface PathMapping {
  from: string;
  to:   string;
}

const ANNOTATION_RE = /^(\/[^\s]+):(\d+)$/;

/**
 * Scan backward from currentLine looking for a file/line annotation line.
 * Returns { filePath, lineNumber } if found, null otherwise.
 */
export function findAnnotation(
  lines: string[],
  currentLine: number,
): { filePath: string; lineNumber: number } | null {
  for (let i = Math.min(currentLine, lines.length - 1); i >= 0; i--) {
    const m = lines[i].match(ANNOTATION_RE);
    if (m) {
      return { filePath: m[1], lineNumber: parseInt(m[2], 10) };
    }
  }
  return null;
}

/**
 * Try each path mapping in order. Return the first candidate that exists on disk.
 * Falls back to rawPath if no mapping produces an existing file.
 */
export function resolveFilePath(rawPath: string, mappings: PathMapping[]): string {
  for (const { from, to } of mappings) {
    if (rawPath.startsWith(from)) {
      const candidate = to + rawPath.slice(from.length);
      if (existsSync(candidate)) { return candidate; }
    }
  }
  return rawPath;
}
