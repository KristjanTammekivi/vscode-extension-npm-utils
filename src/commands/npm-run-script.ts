import vscode from 'vscode';
import { findPackageDirectory, getPrefixArgument, npm, readPackageJson } from '../utils';

export const npmRunScript = async () => {
    const cwd = await findPackageDirectory();
    const prefix = await getPrefixArgument(cwd);
    const packageJson = await readPackageJson(cwd);
    const scripts = Object.keys(packageJson.scripts || {});
    if (scripts.length === 0) {
        await vscode.window.showInformationMessage('No scripts found');
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
    terminal.sendText(npm`${ prefix } run ${ npmScriptToRun }`);
};
