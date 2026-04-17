/**
 * Extracts operand tokens from a GCC listing line, bracket-aware.
 */
export function parseOperands(line: string, mnemonic: string): string[] {
  if (!line) { return []; }

  // Split line on whitespace to find the mnemonic token (case-insensitive,
  // allowing suffixes like .w, .n, condition codes).
  const tokens = line.split(/\s+/);
  let mnemonicToken = '';
  const mnemonicLower = mnemonic.toLowerCase();
  for (const tok of tokens) {
    if (tok.toLowerCase().startsWith(mnemonicLower)) {
      mnemonicToken = tok;
      break;
    }
  }
  if (!mnemonicToken) { return []; }

  // Find the mnemonic token in the original line and take everything after it.
  // Build a pattern that matches the token preceded by whitespace or start of line.
  const escaped = mnemonicToken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(?:^|\\s)${escaped}(\\s+|$)`, 'i');
  const m = line.match(pattern);
  if (!m || m.index === undefined) { return []; }

  // m[0] is the full match (leading whitespace + mnemonic + trailing whitespace).
  const afterMnemonic = m.index + m[0].length;
  let operandStr = line.slice(afterMnemonic).trim();

  if (!operandStr) { return []; }

  operandStr = stripTrailingComment(operandStr);

  if (!operandStr.trim()) { return []; }

  return splitOperands(operandStr);
}

// Strips `# comment` (RISC-V) or `; comment` (CM33) outside brackets.
// `#imm` (ARM immediate, e.g. #1, #-4) is NOT a comment: # followed by
// a non-space is an immediate prefix.  # followed by space or EOL is a comment.
function stripTrailingComment(s: string): string {
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '[' || ch === '{') { depth++; }
    else if (ch === ']' || ch === '}') { depth--; }
    else if (depth === 0 && (ch === '#' || ch === ';')) {
      const prevIsWsOrStart = i === 0 || /\s/.test(s[i - 1]);
      const nextIsWsOrEnd   = i + 1 >= s.length || /\s/.test(s[i + 1]);
      if (prevIsWsOrStart && (ch === ';' || nextIsWsOrEnd)) {
        return s.slice(0, i).trimEnd();
      }
    }
  }
  return s;
}

// Splits on commas that are outside `[...]` and `{...}` groups.
function splitOperands(s: string): string[] {
  const result: string[] = [];
  let depth = 0;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '[' || ch === '{') { depth++; }
    else if (ch === ']' || ch === '}') { depth--; }
    else if (ch === ',' && depth === 0) {
      result.push(s.slice(start, i).trim());
      start = i + 1;
    }
  }
  const last = s.slice(start).trim();
  if (last) { result.push(last); }

  return result;
}
