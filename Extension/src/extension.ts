import * as vscode from 'vscode';
import { request } from "undici";
import { copyFileSync } from 'fs';

export function activate(context: vscode.ExtensionContext) {
	let config = vscode.workspace.getConfiguration("SciterJS");

	if (config.get("autoUpdate"))
	{
		(async () =>
		{
			let d = await vscode.workspace.findFiles("**/sciter.d.ts");
			if (d[0])
			{
				let r = await request("https://raw.githubusercontent.com/MustafaHi/Sciter-VSCode/main/sciter.d.ts");
				await vscode.workspace.fs.writeFile(d[0], Buffer.from(await r.body.text(), "utf-8"));
			}
		})();
	}

	let disposable = vscode.commands.registerCommand('SciterJS.initSciter', () => {
		(async () =>
		{
			let d = await vscode.workspace.findFiles("**/sciter.d.ts");
			let x = vscode.workspace.workspaceFolders;
			if (x)
			{
				let r = await request("https://raw.githubusercontent.com/MustafaHi/Sciter-VSCode/main/sciter.d.ts");
				await vscode.workspace.fs.writeFile(d[0] || vscode.Uri.joinPath(x[0].uri, "sciter.d.ts"), Buffer.from(await r.body.text(), "utf-8"));

					d = await vscode.workspace.findFiles("**/{jsconfig,tsconfig}.json");
				if (d.length == 0)
				{
					r = await request("https://raw.githubusercontent.com/MustafaHi/Sciter-VSCode/main/jsconfig.json");
					await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(x[0].uri, "jsconfig.json"), Buffer.from(await r.body.text(), "utf-8"));
				}
			}
			vscode.window.showInformationMessage('Sciter declarations have been updated!');
		})();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
