import vscode from 'vscode';

export const npmCi = () => {
    const terminal = vscode.window.createTerminal({
        name: 'NPM CI'
    });
    terminal.show();
    terminal.sendText('npm ci');
};
