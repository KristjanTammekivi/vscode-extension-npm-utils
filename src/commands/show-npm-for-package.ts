import vscode from 'vscode';

export const showNpmForPackage = async () => {
    const packageName = await vscode.window.showInputBox({
        title: 'Show NPM for Package',
        placeHolder: 'Package name'
    });
    if (!packageName) {
        return;
    }
    return vscode.env.openExternal(vscode.Uri.parse(`https://www.npmjs.com/package/${ packageName }`));
};
