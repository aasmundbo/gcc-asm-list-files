import * as vscode from 'vscode';
import { detectArch } from '../utils/archDetect';
import { lookupHoverText } from './hoverLookup';

export class GccLstHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.Hover> {
    const range = document.getWordRangeAtPosition(position, /[\w.]+/);
    if (!range) { return null; }
    const word = document.getText(range);
    const arch = detectArch(document);
    const text = lookupHoverText(word, arch);
    if (!text) { return null; }
    return new vscode.Hover(new vscode.MarkdownString(text), range);
  }
}
