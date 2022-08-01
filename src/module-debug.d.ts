declare module "@debug" {
    /** Gets call stack item at level */
    export function callStackAt(level: number): callStack;
    /** Catch unhandled exceptions. pass `0` to get info about current function.
     * @param cb function taking (Error) as argument
     */
    export function setUnhandledExeceptionHandler(cb: Function): void;
    /** Redirect console output. make sure to reset `console.log`...
     * @param cb function taking `(subsystem: number, severity: number, msg: any)` as argument
     */
    export function setConsoleOutputHandler(cb: Function): void;
    export function setBreakpointHandler(cb: Function): void;
    export function setBreakpoints(cb: Function): void;
    export function getElementByUID(id: number): Element;
    export function getUIDofElement(el: Element): number;
    export function highlightElement(el: Element): void;
    export function getStyleRulesOfElement(el: Element): Style;
    export function containerId(): number;
    export function objectKind(object: Object): string;
    export function sublimatedValue(value: any, expanded: any): any;
    export function sublimatedValueElements(): any;
    export function frameVariables(id: number): any;
}

interface callStack {
    /** Is that call stack frame is of native function. */
    isNative: boolean;
    functionName: string;
    /** line number of function declaration */
    functionLineNo: number;
    fileName: string;
    /** line number inside the function. */
    LineNo: number;
}

