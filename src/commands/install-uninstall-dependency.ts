import vscode from 'vscode';
import { posix } from 'node:path';

export const npmUninstallDependency = async () => {
    const folderUri = vscode.workspace.workspaceFolders![0].uri;
    const fileUri = folderUri.with({ path: posix.join(folderUri.path, 'package.json') });
    const packageJson = await vscode.workspace.fs.readFile(fileUri);
    if (!packageJson) {
        return;
    }
    const readStr = Buffer.from(packageJson).toString('utf8');
    const parsedPackageJson = JSON.parse(readStr);
    console.log(parsedPackageJson, readStr);
    const dependencies = [...Object.keys(parsedPackageJson.dependencies || {}), ...Object.keys(parsedPackageJson.devDependencies || {})];
    const npmPackageToRemove = await vscode.window.showQuickPick(dependencies, {
        title: `Uninstall NPM Package`,
        placeHolder: 'Package name'
    });
    if (!npmPackageToRemove) {
        return;
    }
    const terminal = vscode.window.createTerminal({
        name: 'NPM Uninstall'
    });
    terminal.show();
    terminal.sendText(`npm remove ${ npmPackageToRemove }`);
};
