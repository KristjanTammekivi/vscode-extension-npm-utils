import vscode from 'vscode';

export const npmInstallDevDependency = async () => {
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
    const terminal = vscode.window.createTerminal({
        name: 'NPM Install'
    });
    terminal.show();
    terminal.sendText(`npm i --save-dev ${ npmPackageToInstall }`);
};
