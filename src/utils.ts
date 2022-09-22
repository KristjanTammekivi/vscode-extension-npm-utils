import { posix } from 'node:path';
import vscode from 'vscode';

export const readPackageJson = async () => {
    const folderUri = vscode.workspace.workspaceFolders![0].uri;
    const fileUri = folderUri.with({ path: posix.join(folderUri.path, 'package.json') });
    const packageJson = await vscode.workspace.fs.readFile(fileUri);
    if (!packageJson) {
        return;
    }
    const readStr = Buffer.from(packageJson).toString('utf8');
    const parsedPackageJson = JSON.parse(readStr);
    return parsedPackageJson;
};
