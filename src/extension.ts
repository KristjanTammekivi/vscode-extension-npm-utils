import vscode from 'vscode';
import { npmCi } from './commands/ci';
import { npmInstall } from './commands/install';
import { npmInstallDependency } from './commands/install-dependency';
import { npmInstallDevDependency } from './commands/install-dev-dependency';
import { npmUninstallDependency } from './commands/install-uninstall-dependency';

export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(
        vscode.commands.registerCommand('NpmUtils.ci', npmCi),
        vscode.commands.registerCommand('NpmUtils.install', npmInstall),
        vscode.commands.registerCommand('NpmUtils.install-dependency', npmInstallDependency),
        vscode.commands.registerCommand('NpmUtils.install-dev-dependency', npmInstallDevDependency),
        vscode.commands.registerCommand('NpmUtils.uninstall-dependency', npmUninstallDependency)
    );
}

export function deactivate(): void {
    // recycle resource...
}
