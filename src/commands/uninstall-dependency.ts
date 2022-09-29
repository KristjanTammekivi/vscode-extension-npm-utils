import vscode from 'vscode';
import { findPackageDirectory, getPrefixArgument, npm, readPackageJson } from '../utils';

export const npmUninstallDependency = async () => {
    const cwd = await findPackageDirectory();
    const prefix = await getPrefixArgument(cwd);
    const packageJson = await readPackageJson(cwd);
    const dependencies = [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.devDependencies || {})];
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
    terminal.sendText(npm`${ prefix } remove ${ npmPackageToRemove }`);
};
