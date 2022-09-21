import vscode from 'vscode';

export const npmInstallDependency = async () => {
    const npmPackageToInstall = await vscode.window.showInputBox({
        value: '',
        title: `Install NPM Package`,
        placeHolder: 'Package name',
        validateInput: (value) => {
            if (value === '') {
                return 'Missing package name';
            }
            return null;
        }
    });
    const terminal = vscode.window.createTerminal({
        name: 'NPM Install'
    });
    terminal.show();
    terminal.sendText(`npm i --save ${ npmPackageToInstall }`);
};
