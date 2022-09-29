import vscode from 'vscode';
import { getPrefixArgument, npm } from '../utils';

export const npmInstall = async () => {
    const prefix = await getPrefixArgument();
    const terminal = vscode.window.createTerminal({
        name: 'NPM Install'
    });
    terminal.show();
    terminal.sendText(npm`${ prefix } install`);
};
