import * as vscode from 'vscode';
import { detectArch } from './utils/archDetect';
import { GccLstHoverProvider, clearArchCacheFor } from './providers/hoverProvider';
import { GccLstDefinitionProvider } from './providers/definitionProvider';

const LANG_RISCV = 'gcc-lst-riscv';
const LANG_CM0   = 'gcc-lst-cm0';
const LANG_CM3   = 'gcc-lst-cm3';
const LANG_CM4   = 'gcc-lst-cm4';
const LANG_CM33  = 'gcc-lst-cm33';
const LANG_BASE  = 'gcc-lst';

const assignedDocs = new Set<string>();

function assignLanguage(document: vscode.TextDocument): void {
  if (document.languageId !== LANG_BASE) { return; }
  const key = document.uri.toString();
  if (assignedDocs.has(key)) { return; }
  assignedDocs.add(key);
  const arch = detectArch(document);
  if (arch === 'riscv') {
    vscode.languages.setTextDocumentLanguage(document, LANG_RISCV);
  } else if (arch === 'cm0') {
    vscode.languages.setTextDocumentLanguage(document, LANG_CM0);
  } else if (arch === 'cm3') {
    vscode.languages.setTextDocumentLanguage(document, LANG_CM3);
  } else if (arch === 'cm4') {
    vscode.languages.setTextDocumentLanguage(document, LANG_CM4);
  } else if (arch === 'cm33') {
    vscode.languages.setTextDocumentLanguage(document, LANG_CM33);
  }
}

export function activate(context: vscode.ExtensionContext): void {
  vscode.workspace.textDocuments.forEach(assignLanguage);
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(assignLanguage),
    vscode.workspace.onDidCloseTextDocument(doc => {
      assignedDocs.delete(doc.uri.toString());
      clearArchCacheFor(doc.uri.toString());
    }),
  );

  const selector: vscode.DocumentSelector = [
    { language: LANG_RISCV },
    { language: LANG_CM0 },
    { language: LANG_CM3 },
    { language: LANG_CM4 },
    { language: LANG_CM33 },
  ];
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(selector, new GccLstHoverProvider()),
    vscode.languages.registerDefinitionProvider(selector, new GccLstDefinitionProvider()),
  );
}

export function deactivate(): void {}
