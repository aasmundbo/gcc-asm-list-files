# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working
with code in this repository.

## What this project is

A VS Code extension that provides language support (syntax highlighting, hover
documentation, go-to-definition) for GCC/objdump assembly listing files
(`.lst`). Supports RISC-V (RV32IMAC) and Cortex-M33/Thumb-2 targets.

## Commands

```bash
# Compile TypeScript
npm run compile

# Watch mode
npm run watch

# Run all tests (compile + grammar + unit + integration)
npm test

# Run unit tests only (no VS Code instance required)
npm run test:unit

# Run grammar tokenization tests only
npm run test:grammar

# Run a single unit test file
npx mocha --require ts-node/register test/unit/hoverLookup.test.ts
```

Integration tests require an Electron/VS Code instance and run as part of
`npm test` via `out/test/integration/runTests.js`.

## Architecture

The extension follows a provider-based pattern. `src/extension.ts` is the
entry point - it calls `assignLanguage()` on document open to detect the ELF
architecture, then registers hover and definition providers.

**Architecture detection** (`src/utils/archDetect.ts`): inspects the first
few lines of a `.lst` file for ELF header strings to return `'riscv'`,
`'cm33'`, or `'unknown'`. The result drives which TextMate grammar is assigned.

**Hover** (`src/providers/hoverProvider.ts` + `hoverLookup.ts`): extracts the
word at the cursor, does a case-insensitive lookup in the arch-specific hover
data tables (`src/hoverData/riscv.ts`, `src/hoverData/cm33.ts`), and returns
markdown.

**Go-to-definition** (`src/providers/definitionProvider.ts` +
`definitionResolver.ts`): scans backward from the cursor for a line annotation
matching `/^(\/[^\s]+):(\d+)$/` (e.g. `/home/user/src/main.c:42`), then
applies `gccLst.pathMappings` from VS Code settings to rewrite the path before
opening the file.

**Grammars** (`syntaxes/`): Two TextMate grammars (RISC-V and CM33) that
tokenize addresses, hex bytes, mnemonics, registers, labels, and comments.

**Tests** live in two trees:
- `test/unit/` - pure Mocha/ts-node, no VS Code required
- `src/test/integration/` - runs inside a VS Code instance via
  `@vscode/test-electron`

TypeScript compiles from `src/` to `out/` (CommonJS, ES2020, strict mode).
The `test/unit/` directory is compiled on-the-fly by `ts-node` and is
intentionally excluded from `tsconfig.json`.
