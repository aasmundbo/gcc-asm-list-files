import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

const FIXTURES = path.resolve(__dirname, '../../../../test/fixtures');

suite('GCC Listing Extension', () => {
  suiteTeardown(async () => {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  });

  test('assigns gcc-lst-riscv language for RISC-V listing', async () => {
    const uri = vscode.Uri.file(path.join(FIXTURES, 'riscv.lst'));
    const doc = await vscode.workspace.openTextDocument(uri);
    // Give the onDidOpenTextDocument handler time to fire
    await new Promise(r => setTimeout(r, 500));
    assert.strictEqual(doc.languageId, 'gcc-lst-riscv');
  });

  test('assigns gcc-lst-cm33 language for CM33 listing', async () => {
    const uri = vscode.Uri.file(path.join(FIXTURES, 'cm33.lst'));
    const doc = await vscode.workspace.openTextDocument(uri);
    await new Promise(r => setTimeout(r, 500));
    assert.strictEqual(doc.languageId, 'gcc-lst-cm33');
  });

  test('hover provider returns description for RISC-V mnemonic', async () => {
    const uri = vscode.Uri.file(path.join(FIXTURES, 'riscv.lst'));
    const doc = await vscode.workspace.openTextDocument(uri);
    await new Promise(r => setTimeout(r, 500));

    // Line 4 (0-indexed): "41000000:	1151                	addi	sp,sp,-12"
    // "addi" starts at col 31 (0-indexed: 31)
    const position = new vscode.Position(4, 31);
    const hovers = await vscode.commands.executeCommand<vscode.Hover[]>(
      'vscode.executeHoverProvider', uri, position,
    );
    assert.ok(hovers && hovers.length > 0, 'Expected hover results');
    const content = hovers[0].contents
      .map(c => (typeof c === 'string' ? c : c.value))
      .join('');
    assert.ok(content.toLowerCase().includes('add'), `Hover content: ${content}`);
  });

  test('definition provider navigates to annotated source line', async () => {
    const uri = vscode.Uri.file(path.join(FIXTURES, 'riscv.lst'));
    await vscode.workspace.openTextDocument(uri);
    await new Promise(r => setTimeout(r, 500));

    // Line 4 (0-indexed): assembly line — annotation above it on line 3:
    // "/home/user/project/src/main.c:42"
    const position = new vscode.Position(4, 0);
    const locations = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider', uri, position,
    );
    // Without path mapping, the raw path is returned as-is
    assert.ok(locations && locations.length > 0, 'Expected definition results');
    assert.ok(
      locations[0].uri.fsPath.includes('main.c'),
      `Expected main.c path, got ${locations[0].uri.fsPath}`,
    );
    assert.strictEqual(locations[0].range.start.line, 41); // lineNumber 42 → 0-indexed 41
  });
});
