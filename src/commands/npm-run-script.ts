import vscode from 'vscode';
import { readPackageJson } from '../utils';

export const npmRunScript = async () => {
    const packageJson = await readPackageJson();
    const scripts = Object.keys(packageJson.scripts || {});
    if (scripts.length === 0) {
        await vscode.window.showInformationMessage('Test begin!');
        return;
    }
    const npmScriptToRun = await vscode.window.showQuickPick(scripts, {
        title: `Run NPM Script`,
        placeHolder: 'script'
    });
    if (!npmScriptToRun) {
        return;
    }
    const terminal = vscode.window.createTerminal({
        name: 'NPM Run Script'
    });
    terminal.show();
    terminal.sendText(`npm run ${ npmScriptToRun }`);
};
