# sciter.d.ts
Sciter declaration files for linting intellisense in VSCode

`0.4.0`

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
| Element | - | - |
| Document | done | - |
| Event | - | - |
| globalThis | - | - |
| modules | done | - |
| Range/Node | - | - |

initial credit [@patrick](https://sciter.com/forums/users/patrick/)
