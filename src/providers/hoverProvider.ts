import * as vscode from 'vscode';
import { detectArch } from '../utils/archDetect';
import { lookupHoverText } from './hoverLookup';
import { getCachedArch, setCachedArch } from './archCache';

export { clearArchCacheFor, clearArchCache } from './archCache';

export class GccLstHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.Hover> {
    const range = document.getWordRangeAtPosition(position, /[\w.]+/);
    if (!range) { return null; }
    const word = document.getText(range);

    const key = document.uri.toString();
    let arch = getCachedArch(key);
    if (!arch) {
      arch = detectArch(document);
      setCachedArch(key, arch);
    }

    const line = document.lineAt(position.line).text;
    const text = lookupHoverText(word, arch, line);
    if (!text) { return null; }
    const md = new vscode.MarkdownString();
    md.supportHtml = false;
    md.isTrusted = false;
    md.appendMarkdown(text);
    return new vscode.Hover(md, range);
  }
}
