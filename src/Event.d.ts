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
    readonly eventPhase: number;
    /** Returns true if event was dispatched by the user agent, and false otherwise. */
    readonly isTrusted: boolean;
    readonly srcElement: Element | null;
    /** The element to which event is dispatched (its target). */
    readonly target: Element | null;
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
    data: any;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;

    currentTarget: Element;
    target: Element;
    eventPhase: string;

    altKey: boolean;
    ctrlKey: boolean;
    /** `Command` key on OSX, `win` on Windows */
    metaKey: boolean;
    shiftKey: boolean;
    button: number;
    buttons: number;

    clientX: number;
    clientY: number;
    screenX: number;
    screenY: number;
    windowX: number;
    windowY: number;
    deltaX: number;
    deltaY: number;
    /** `0` - `deltaX/Y` are pixels coming from touch devices,  
     *  `1` - `deltaX/Y` are in "lines" (a.k.a. mouse wheel "ticks"). */
    deltaMode: number;

    /** Coordinates relative to `currentTarget` - the element this event handler is attached to. */
    x: number;
    /** Coordinates relative to `currentTarget` - the element this event handler is attached to. */
    y: number;
    /** Used in some events to indicate auxiliary "source" element. */
    source: Element;
    /** Mouse event is on `foreground-image`, return Element containing the image */
    isOnIcon: Element;

    /** Returns pressed status of the key. */
    keyState(key: string): boolean;
}
declare var Event: {
    new(type: string, eventInitDict?: EventInit): Event;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;
};
interface EventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    data?: any;
}
type eventFunction = function(Event, Element): void;
enum eventType {
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

