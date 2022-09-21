import vscode from 'vscode';

export const npmInstall = () => {
    const terminal = vscode.window.createTerminal({
        name: 'NPM Install'
    });
    terminal.show();
    terminal.sendText('npm i');
};
