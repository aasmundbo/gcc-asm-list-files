import { existsSync } from 'fs';
import * as path from 'path';

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
  maxScanLines = 200,
): { filePath: string; lineNumber: number } | null {
  const stop = Math.max(0, currentLine - maxScanLines);
  for (let i = Math.min(currentLine, lines.length - 1); i >= stop; i--) {
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
 * Guards against path traversal by rejecting candidates that escape the 'to' root.
 */
export function resolveFilePath(rawPath: string, mappings: PathMapping[]): string {
  const normalRaw = path.normalize(rawPath);
  for (const { from, to } of mappings) {
    if (normalRaw.startsWith(path.normalize(from))) {
      const candidate = path.normalize(to + normalRaw.slice(path.normalize(from).length));
      if (candidate.startsWith(path.normalize(to)) && existsSync(candidate)) {
        return candidate;
      }
    }
  }
  return normalRaw;
}
