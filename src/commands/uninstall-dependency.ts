import vscode, { QuickPickItem } from 'vscode';
import { findPackageDirectory, getPrefixArgument, npm, readPackageJson } from '../utils';

export const npmUninstallDependency = async () => {
    const cwd = await findPackageDirectory();
    const prefix = await getPrefixArgument(cwd);
    const packageJson = await readPackageJson(cwd);
    const separator = {
        label: 'Dependencies',
        kind: vscode.QuickPickItemKind.Separator
    };
    const deps = Object.keys(packageJson.dependencies || {}).map(x => ({ label: x }) as QuickPickItem);
    const dependencies = [separator, ...deps, { ...separator, label: 'Dev Dependencies' }, ...Object.keys(packageJson.devDependencies || {}).map(x => ({ label: x }) as QuickPickItem)];
    const npmPackageToRemove = await vscode.window.showQuickPick(dependencies, {
        title: `Uninstall NPM Package`,
        placeHolder: 'Package(s)',
        canPickMany: true
    });
    if (!npmPackageToRemove) {
        return;
    }
    const terminal = vscode.window.createTerminal({
        name: 'NPM Uninstall'
    });
    terminal.show();
    terminal.sendText(npm`${ prefix } remove ${ npmPackageToRemove.map(pkg => pkg.label).join(' ') }`);
};
