import * as vscode from 'vscode';
import { detectArch } from './utils/archDetect';
import { GccLstHoverProvider } from './providers/hoverProvider';
import { GccLstDefinitionProvider } from './providers/definitionProvider';

const LANG_RISCV = 'gcc-lst-riscv';
const LANG_CM33  = 'gcc-lst-cm33';
const LANG_BASE  = 'gcc-lst';

function assignLanguage(document: vscode.TextDocument): void {
  if (document.languageId !== LANG_BASE) { return; }
  const arch = detectArch(document);
  if (arch === 'riscv') {
    vscode.languages.setTextDocumentLanguage(document, LANG_RISCV);
  } else if (arch === 'cm33') {
    vscode.languages.setTextDocumentLanguage(document, LANG_CM33);
  }
}

export function activate(context: vscode.ExtensionContext): void {
  // Assign specific language to already-open documents
  vscode.workspace.textDocuments.forEach(assignLanguage);

  // Assign specific language when new documents are opened
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(assignLanguage),
  );

  const selector: vscode.DocumentSelector = [
    { language: LANG_RISCV },
    { language: LANG_CM33 },
  ];

  const hoverProvider = new GccLstHoverProvider();
  const definitionProvider = new GccLstDefinitionProvider();

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(selector, hoverProvider),
    vscode.languages.registerDefinitionProvider(selector, definitionProvider),
  );
}

export function deactivate(): void {}
