import vscode from 'vscode';
import { getPrefixArgument, npm } from '../utils';

export const npmCi = async () => {
    const prefix = await getPrefixArgument();
    const terminal = vscode.window.createTerminal({
        name: 'NPM CI'
    });
    terminal.show();
    terminal.sendText(npm`${ prefix } ci`);
};
