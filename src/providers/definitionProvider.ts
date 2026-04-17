import * as vscode from 'vscode';
import { resolveFilePath, PathMapping } from './definitionResolver';

const MAX_SCAN_LINES = 200;
const ANNOTATION_RE = /^(\/[^\s]+):(\d+)$/;

export class GccLstDefinitionProvider implements vscode.DefinitionProvider {
  provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.Definition> {
    const start = position.line;
    const stop  = Math.max(0, start - MAX_SCAN_LINES);

    let filePath: string | null = null;
    let lineNumber = 0;

    for (let i = start; i >= stop; i--) {
      const m = document.lineAt(i).text.match(ANNOTATION_RE);
      if (m) {
        filePath   = m[1];
        lineNumber = parseInt(m[2], 10);
        break;
      }
    }
    if (!filePath) { return null; }

    const mappings = vscode.workspace
      .getConfiguration('gccLst')
      .get<PathMapping[]>('pathMappings', []);

    const resolvedPath = resolveFilePath(filePath, mappings);
    const uri = vscode.Uri.file(resolvedPath);
    const targetLine = Math.max(0, lineNumber - 1);
    return new vscode.Location(uri, new vscode.Position(targetLine, 0));
  }
}
