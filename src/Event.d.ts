/** An event which takes place in the DOM. */
interface Event {
    /** True if event goes through its target's ancestors in reverse tree order, and false otherwise. */
    readonly bubbles: boolean;
    cancelBubble: boolean;
    /** Can be canceled by invoking the preventDefault() method. */
    readonly cancelable: boolean;
    /** True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise. */
    readonly composed: boolean;
    /** Returns the Element whose event listener's callback is currently being invoked. */
    readonly currentTarget: Element | null;
    /** Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise. */
    readonly defaultPrevented: boolean;
    /** Returns the event's phase, which is one of `NONE`, `CAPTURING_PHASE`, `AT_TARGET`, and `BUBBLING_PHASE`. */
    readonly eventPhase: "NONE"|"CAPTURING_PHASE"|"AT_TARGET"|"BUBBLING_PHASE";
    /** Returns true if event was dispatched by the user agent, and false otherwise. */
    readonly isTrusted: boolean;
    readonly srcElement: Element | null;
    /** The element to which event is dispatched (its target). */
    readonly target: Element | null;
    /** The secondary element which is lossing or gaining focus from/to `target` */
    readonly relatedTarget: Element | null;
    /** Type of event, e.g. "click", "hashchange", or "submit". */
    readonly type: string;
    /** If invoked when the cancelable attribute value is true,
     * and while executing a listener for the event with passive set to false,
     * signals to the operation that caused event to be dispatched that it needs to be canceled. */
    preventDefault(): void;
    /** Invoking this method prevents event from reaching any registered event listeners
     * after the current one finishes running and, when dispatched in a tree,
     * also prevents event from reaching any other objects. */
    stopImmediatePropagation(): void;
    /** When dispatched in a tree, invoking this method prevents event
     * from reaching any objects other than the current object. */
    stopPropagation(): void;
    /** String representation of keyCode "KeyA", "F1", "Enter"... */
    readonly code: string;
    /** keyCode list at [include/sciter-x-key-codes.h](https://gitlab.com/sciter-engine/sciter-js-sdk/-/blob/main/include/sciter-x-key-codes.h) */
    readonly keyCode: number;
    /** Platform's native key code, e.g, wParam in WM_KEYDOWN on Windows. */
    readonly platformKeyCode: string;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;

    data, details: any;

    readonly altKey: boolean;
    readonly ctrlKey: boolean;
    /** `command` key on OSX, `win` on Windows */
    readonly metaKey: boolean;
    readonly shiftKey: boolean;
    readonly button: number;
    readonly buttons: number;

    readonly clientX: number;
    readonly clientY: number;
    readonly screenX: number;
    readonly screenY: number;
    readonly windowX: number;
    readonly windowY: number;
    readonly deltaX: number;
    readonly deltaY: number;
    /** `0` - `deltaX/Y` are pixels coming from touch devices,  
     *  `1` - `deltaX/Y` are in "lines" (a.k.a. mouse wheel "ticks"). */
    readonly deltaMode: number;

    /** Coordinates relative to `currentTarget` - the element this event handler is attached to. */
    readonly x: number;
    /** Coordinates relative to `currentTarget` - the element this event handler is attached to. */
    readonly y: number;
    /** Used in some events to indicate auxiliary "source" element. */
    readonly source: Element;
    /** Mouse event is on `foreground-image`, return Element containing the image */
    readonly isOnIcon: Element;

    /** Returns pressed status of the key. */
    keyState(key: string): boolean;
}
declare var Event: {
    new(type: string, options?: EventOptions): Event;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;
};
interface EventOptions {
    /** True if event goes through its target's ancestors in reverse tree order, and false otherwise. */
    bubbles?: boolean;
    /** Can be canceled by invoking the preventDefault() method. */
    cancelable?: boolean;
    /** True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise. */
    composed?: boolean;
    /** Property passed to event listener. `evt.data/details` */
    data?,details?: any;
}
type eventFunction = function(Event, Element): void;
enum eventType {
    ready,
    complete,

    click,
    input,
    change,
    press,
    changing,
    submit,
    reset,
    expand,
    collapse,
    statechange,
    visualstatechange,
    disabledstatechange,
    readonlystatechange,
    contextmenu,
    contextmenusetup,
    animationend,
    animationstart,
    animationloop,
    transitionend,
    transitionstart,
    mediachange,
    contentchange,
    inputlangchange,
    pastehtml,
    pastetext,
    pasteimage,
    popuprequest,
    popupready,
    popupdismissing,
    popupdismissed,
    tooltiprequest,

    focus,
    focusin,
    focusout,
    blue,

    mouseMove,
    mouseLeave,
    mouseIdle,
    mousetick,
    mousedown,
    mouseup,
    mousewheel,
    mousedragrequest,
    dblclick,
    doubleclick,
    tripleclick,

    keydown,
    keyup,
    keypress,
    compostionstart,
    compositionend,

    scroll,
    scrollanimationstart,
    scrollanimationend,

    sizechange,
    visibilitychange,

    load,
    error,
    
    drag,
    dragenter,
    dragleave,
    drop,
    dragaccept,
    dropcancel,
    willacceptdrop,

    play,
    ended,
    videocoordinate,
    videoframeready,
}

