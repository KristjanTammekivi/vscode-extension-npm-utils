import vscode from 'vscode';
import { getPrefixArgument, npm } from '../utils';

export const npmInstallDevDependency = async () => {
    const prefix = await getPrefixArgument();
    const npmPackageToInstall = await vscode.window.showInputBox({
        value: '',
        title: `Install Dev NPM Package`,
        placeHolder: 'Package name',
        validateInput: (value) => {
            if (value === '') {
                return 'Missing package name';
            }
            return null;
        }
    });
    if (!npmPackageToInstall) {
        return;
    }
    const terminal = vscode.window.createTerminal({
        name: 'NPM Install'
    });
    terminal.show();
    terminal.sendText(npm`${ prefix } install --save-dev ${ npmPackageToInstall }`);
};
