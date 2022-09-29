import { posix } from 'node:path';
import vscode from 'vscode';

export const readPackageJson = async (cwd?: vscode.Uri) => {
    const folderUri = cwd ?? vscode.workspace.workspaceFolders![0].uri;
    const fileUri = folderUri.with({ path: posix.join(folderUri.path, 'package.json') });
    const packageJson = await vscode.workspace.fs.readFile(fileUri);
    if (!packageJson) {
        return;
    }
    const readStr = Buffer.from(packageJson).toString('utf8');
    const parsedPackageJson = JSON.parse(readStr);
    return parsedPackageJson;
};

export const getPrefixArgument = async (cwd?: vscode.Uri) => {
    if (!cwd) {
        cwd = await findPackageDirectory();
    }
    if (cwd) {
        return `--prefix=${ cwd.path }`;
    }
    return '';
};

export const findPackageDirectory = async (): Promise<vscode.Uri | undefined> => {
    // find current open file
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const currentFileUri = editor.document.uri;
    // find nearest package.json from current directory up to root
    const currentFileDir = currentFileUri.with({ path: posix.dirname(currentFileUri.path) });
    const rootDir = vscode.workspace.workspaceFolders![0].uri;
    let currentDir = currentFileDir;
    let i = 0;
    while (currentDir.path !== rootDir.path) {
        const fileUri = currentDir.with({ path: posix.join(currentDir.path, 'package.json') });
        try {
            await vscode.workspace.fs.stat(fileUri);
            return currentDir;
        } catch {
            currentDir = currentDir.with({ path: posix.dirname(currentDir.path) });
        }
        if (i++ > 100) {
            return;
        }
    }
    return;
};

export const npm = (strings: TemplateStringsArray, ...args: (string | undefined)[]) => {
    return 'npm ' + strings.flatMap((str, i) => [str.trim(), args[i]?.trim() ?? '']).filter(Boolean).join(' ');
};
