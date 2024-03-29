# Sciter JS Extension

Visual Studio Code extension

`0.11.2`

## Features

- Intellisense for Sciter specific JavaScript, CSS and HTML
- Auto update for Intellisense

## Usage

- [Download Extension from vscode marketplace](https://marketplace.visualstudio.com/items?itemName=MustafaHi.sciterjs)
- Run the command `Initialize Sciter Project`, <kbd>CTRL+SHIFT+P</kbd> then command
- Intellisense will be auto update on every editor start, you can disable that in preferences `SciterJS.autoUpdate`
- HTML and CSS support work with/out the 2nd step




# sciter.d.ts

Sciter declaration files for linting intellisense in VSCode

`0.24.2`

### setup

If you have the extension installed:
Run the command `Initialize Sciter Project`, <kbd>F1</kbd> then command. otherwise

Include `jsconfig.json` and `sciter.d.ts` to your VSCode workspace, or where the js files reside

by (default) the default declarations are disabled, and just what Sciter use is implemented in `sciter.d.ts`

If you want to have the default declarations clear the `jsconfig.json` file (even if it's empty it must exist).


### contribute

This is not complete or perfect if you find issue report it
with sample code and references to how it should work.

release version: major.minor.fix

### status

the status of declarations and their documentations as of Sciter specific and default javascript/dom.
| declaration | sciter | default |
| ----------- | ------ | ------- |
| Element | done | done |
| Selection/state/style | done | done |
| Document | done | done |
| Event | done | done |
| modules | done | done |
| Range/Node | done | done |
| Graphic | done | done |
| Window | done | done |
| global | done | done |
| behaviors | done | done |

initial credit [@patrick](https://sciter.com/forums/topic/typescript/#post-77670)
