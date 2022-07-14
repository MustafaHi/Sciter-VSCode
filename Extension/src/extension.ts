import * as vscode from 'vscode';
import { request } from "undici";

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
				if (r.statusCode == 200)
					await vscode.workspace.fs.writeFile(d[0], Buffer.from(await r.body.text(), "utf-8"));
			}
		})();
	}

	let disposable = vscode.commands.registerCommand('SciterJS.initSciter', () => {
		(async () =>
		{
			let error = false;
			let d = await vscode.workspace.findFiles("**/sciter.d.ts");
			let x = vscode.workspace.workspaceFolders;
			if (x)
			{
				let r = await request("https://raw.githubusercontent.com/MustafaHi/Sciter-VSCode/main/sciter.d.ts");
				if (r.statusCode == 200)
					await vscode.workspace.fs.writeFile(d[0] || vscode.Uri.joinPath(x[0].uri, "sciter.d.ts"), Buffer.from(await r.body.text(), "utf-8"));
				else error = true;

					d = await vscode.workspace.findFiles("**/{jsconfig,tsconfig}.json");
				if (d.length == 0)
				{
					r = await request("https://raw.githubusercontent.com/MustafaHi/Sciter-VSCode/main/jsconfig.json");
					if (r.statusCode == 200)
						await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(x[0].uri, "jsconfig.json"), Buffer.from(await r.body.text(), "utf-8"));
					else error = true;
				}
				if (error)
					vscode.window.showErrorMessage('Sciter project initialization failed due to connection error try again!');
				else
					vscode.window.showInformationMessage('Sciter project has been initialized!');
			}
		})();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
