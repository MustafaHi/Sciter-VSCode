# Sciter JS Extension

Visual Studio Code extension

`0.10.1`

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

`0.15.2`

### setup

Include `jsconfig.json` and `sciter.d.ts` to your VSCode workspace, or where the js files reside

by (default) the default declarations are disabled, and just what Sciter use is implemented in `sciter.d.ts`

If you want to have the default declarations clear the `jsconfig.json` file (even if it's empty it should exist).


### contribute

There is still much to be added, open an issue before contributing to avoid conflict

commit with version major.minor.fix


### status

the status of declarations and their documentations as of Sciter specific and default javascript/dom.
| declaration | sciter | default |
| ----------- | ------ | ------- |
| Element | done | done |
| Selection/state/style | done | done |
| Document | done | - |
| Event | done | done |
| modules | done | - |
| Range/Node | done | done |
| Graphic | done | done |
| Window | done | - |
| global | done | - |
| behaviors | - | done |

initial credit [@patrick](https://sciter.com/forums/topic/typescript/#post-77670)
