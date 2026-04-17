import * as vscode from 'vscode';
import { findAnnotation, resolveFilePath, PathMapping } from './definitionResolver';

export class GccLstDefinitionProvider implements vscode.DefinitionProvider {
  provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.Definition> {
    const lines = document.getText().split('\n');
    const result = findAnnotation(lines, position.line);
    if (!result) { return null; }

    const mappings = vscode.workspace
      .getConfiguration('gccLst')
      .get<PathMapping[]>('pathMappings', []);

    const resolvedPath = resolveFilePath(result.filePath, mappings);
    const uri = vscode.Uri.file(resolvedPath);
    const targetLine = Math.max(0, result.lineNumber - 1);
    return new vscode.Location(uri, new vscode.Position(targetLine, 0));
  }
}
