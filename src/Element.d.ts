interface Element extends Node, Behaviors {
    /** Get element matching the css selector */
    $(query: string): Element;
    /** Get array of elements matching the css selector */
    $$(query: string): array<Element>;
    /** Select parent element that match the query */
    $p(query: string): Element;
    /** Owner element selector, useful to get owner of menu */
    $o(query: string): Element;
    /** Check element match the selector */
    $is(query: string): boolean;
    /** Posts a function or event to event queue. */
    post(eventOrHandler: function(this: Element, ...any) | Event, avoidDuplicates?: boolean): boolean;
    /** Fire event asynchronously, `Event.target` will be set to this element,  
     * use `dispatchEvent` for sync method
     * @return `false` if event is canceled with `Event.preventDefault()`.
     */
    postEvent(event: Event, avoidDuplicates?: boolean): boolean;
    /** jQuery style event subscription:  
        @param event `^name` for handling events in capturing phase
        @param query subscribe to all children that match the css selector otherwise this element
        @param handler `Function(Event, Element)` - `this` is set to the element the handler is attached to
    */
    on(event: keyof typeof eventType, query: string, handler: eventFunction): Element;
    on(event: keyof typeof eventType, handler: eventFunction): Element;
    off(eventOrHandler: keyof typeof eventType|string|Function): Element;
    /** jQuery style event subscription to application wide events:  
     *  The element gets unsubscribed automatically when it is disconnected from DOM
        @param event `^name` for handling events in capturing phase
        @param handler `Function(Event, Element)` - `this` is set to the element the handler is attached to
    */
    onGlobalEvent(event: string, handler: function(this: Element, ...any)): Element;
    /** Unsubscribe this element from particular event, if no argument is provided unsubscribe from all events */
    offGlobalEvent(eventOrHandler?: string | function(this: Element, ...any)): Element;
    /** Starts timer on element.
     *  If the element already has a timer with the same callback, it first gets removed and timer is restarted.
     *  This allows to implement effective throttling (debounce).
     *  @param callback `this` is set to the element, `return true` to repeat. */
    timer(milliseconds: number, callback: function(this: Element, ...any): void|boolean): boolean;
    /** Removes content of the element, makes it empty. */
    clear(): boolean;
    /** Interaction with native behaviors attached to the element. */
    xcall(name: string, ...args): any
    /** Removes the element and moves its content in place in the DOM. */
    unwrapElement(): boolean;
    /** Wraps range of nodes from start to end into wrap element - opposite action to `unwrapElement()` */
    wrapNodes(start: Node, end: Node, wrap: Element);
    /** Reports state and allowance of particular command. The method accepts the same parameters as the `Element.execCommand()`.  */
    checkCommand(command: string, params?: object|string): 1|2;
    /** Execute undoable behavior specific commands. */
    execCommand(command: string, params?: object|string): boolean;
    /** Immediate mode drawing "ports".
     *  Functions assigned to these properties will be called when the element is rendered on screen
     *  so they can draw anything on top (or below) of default HTML/CSS rendering. */
    paintBackground: function(Graphics);
    /** Immediate mode drawing "ports".
     *  Functions assigned to these properties will be called when the element is rendered on screen
     *  so they can draw anything on top (or below) of default HTML/CSS rendering. */
    paintForeground: function(Graphics);
    /** Immediate mode drawing "ports".
     *  Functions assigned to these properties will be called when the element is rendered on screen
     *  so they can draw anything on top (or below) of default HTML/CSS rendering. */
    paintContent: function(Graphics);
    /** Immediate mode drawing "ports".
     *  Functions assigned to these properties will be called when the element is rendered on screen
     *  so they can draw anything on top (or below) of default HTML/CSS rendering. */
    paintOutline: function(Graphics);
    /** Schedules re-paint of the element. This will trigger `Element.paintXXXX` calls. */
    requestPaint(): void;
    /** Force repaint immediately */
    flushPaint(): void;

    /** Shows the popup element or VNode (JSX) in out-of-canvas popup window on desktop. */
    popup(popup: Element | VNode, params?: popupParams): void;
    /** Show this element as out-of-canvas popup window on desktop. 
     * @param referencePoint `1-9`, see keyboard numpad for the meaning.
    */
    popupAt(x: number, y: number, referencePoint?: number): void;
    /** The method offers "manual" animation support.  
     *  `function(progress: 0.0...1.0)`: true | false  
     *  Sciter will call handler with animation frame rate passing current progress value.
     *  return false to stop animation. */
    animate(handler: Function, params: animateParams): void;
    /** Make the element "airborn" - to be replaced outside of host window */
    takeOff(params: takeoffParams): void;
    /** Append element as last child */
    append(JSX: JSX): void;
    /** Insert element as the first child */
    prepend(JSX: JSX): void;
    /** Replace content by element */
    content(JSX: JSX): void;
    /** patches content of the element by JSX using rules of React[or].  
     *  If second parameter is true the function patches only children but not element itself. */
    patch(JSX: JSX, onlyChildren?: true): void;
    /** Patch properties and enqueue rendering */
    componentUpdate(object?: object): Element;
    /** Return collapsed range (caret position) at point x/y.
     *  x/a are local coordinates - relative to origin of element's inner box. */
    rangeFromPoint(x: number, y: number): Range | null;
    toString(): string;


    /* NATIVE */

    /** Get element matching the css selector */
    querySelector(query: string): Element;
    /** Get array of elements matching the css selector */
    querySelectorAll(query: string): Element[];
    getElementById(id: string): Element;
    getElementsByClassName(className: string): Element[];
    getElementsByTagName(tag: string): Element[];
    getElementsByName(name: string): Element[];
    /** Find the closest parent element matching the query selector */
    closest(query: string): Element | null;
    /** Check element match the selector */
    matches(query: string): boolean;
    firstElementChild: Element;
    lastElementChild: Element;
    nextElementSibling: Element;
    previousElementSibling: Element;
    childElementCount: number;
    children: Element[];
    childElement(index: number): Element;
    readonly ownerDocument: Document;

    appendChild(node: Node);
    removeChild(node: Node);
    insertBefore(node: Node, refNode: Node);
    insertAfter(node: Node, refNode: Node);
    replaceChild(newNode: Node, refNode: Node);
    insertAdjacentHTML(where: InsertPosition, html: string): void;
    swapWith(element: Element);
    
    style: Style;
    /** Runtime flags and state on element.  
     * Most of Element.State reflect so called CSS pseudo-classes (flags): 
     * `element:visited { color: red; }`
    */
    state: State;
    /** Represents current selection on elements that supports selection:  
       ` <htmlarea>` - WYSIWYG HTML editor;  
        `<plaintext>` - Plain text multiline editor;  
        any other element with `[selectable]` attribute set;   */
    selection: Selection;

    disabled: boolean;
    readonly: boolean;
    checked: boolean;
    src: string;

    readonly attributes: string[];
    hasAttribute(name: string): boolean;
    getAttribute(name: string): string;
    getAttributeNames(): string[];
    setAttribute(name: string, value: string|number|undefined): void;
    removeAttribute(name: string): void;
    attributes: string[]|number[];
    classList: {
        add(...name: string[]): void;
        remove(...name: string[]): void;
        toggle(name: string, state?: boolean): boolean;
        contains(name: string): boolean;
        length: number;
        readonly entries(): string[];
    }
    /** Returns a drawing context of the canvas, instance of Graphics object. */
    getContext(type: '2d'): Graphics;

    id: string;
    name: string;
    tagName: string;
    tag: string;
    className: string;
    elementIndex: number;
    innerHTML: string;
    outerHTML: string;
    innerText: string;
    value: any;

    scrollBy(x: number, y: number): void;
    scrollBy(options: {
        left?: number;
        top?: number;
        behavior?: "instant" | "smooth";
    }): void;
    scrollTo(x: number, y: number): void;
    scrollTo(options: {
        left?: number;
        top?: number;
        behavior?: "instant" | "smooth";
    }): void;
    scrollIntoView(toTop?: true): void;
    scrollIntoView(options: {
        block?: "start" | "nearest";
        behavior?: "instant" | "smooth";
    }): void;
    readonly clientLeft: number;
    readonly clientTop : number;
    readonly clientWidth: number;
    readonly clientHeight: number;
    readonly scrollLeft: number;
    readonly scrollTop : number;
    readonly scrollRight: number;
    readonly scrollWidth: number;
    readonly scrollHeight: number;
    getBoundingClientRect(): DOMRect;

    click(): void;
    focus(): void;
    /** Call handler each time the event is fired */
    addEventListener(name: string, handler: eventFunction, flags?: object): void;
    removeEventListener(name: string, handler: Function): void;
    /** Fire event synchronously, `Event.target` will be set to this element,  
     * use `postEvent` for async method
     * @return `false` if event is canceled with `Event.preventDefault()`.
     */
    dispatchEvent(event: Event, avoidDuplicates?: boolean): boolean;

    // EventTarget
    ready(event: Event, element: Element): void;
    onclick(event: Event, element: Element): void;
    onchange(event: Event, element: Element): void;
    onkeydown(event: Event, element: Element): void;
    onwheel(event: Event, element: Element): void;
}
declare var Element: {
    new(): Element;
}

type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";
interface popupParams {
    /** 1..9, reference point on anchor border box (see keyboard numpad for the meaning) */
    anchorAt?: number;
    /** 1..9, reference point on popup's margin box. */
    popupAt?: number;
    x?: number;
    y?: number;
}
interface animateParams {
    duration?: number,
    ease?: "linear" | "ease" | "ease-in" | "ease-in-out" | "ease-out" | "quad-in" | "quad-out" | "quad-in-out" | "cubic-in" | "cubic-out" | "cubic-in-out" |  "quart-in" | "quart-out" | "quart-in-out" | "quint-in" | "quint-out" | "quint-in-out" | "sine-in" | "sine-out" | "sine-in-out" |  "expo-in" | "expo-out" | "expo-in-out" | "circ-in" | "circ-out" | "circ-in-out" | "elastic-in" | "elastic-out" | "elastic-in-out" |  "back-in" | "back-out" | "back-in-out" | "x-back-in" | "x-back-out" | "x-back-in-out" | "xx-back-in" | "xx-back-out" | "xx-back-in-out" |  "bounce-in" | "bounce-out" | "bounce-in-out";
    effect?: "blend" | "blend-atop" | "slide-top" | "slide-bottom" | "slide-left" | "slide-right" | "slide-over-top" | "slide-over-bottom" | "slide-over-left" | "slide-over-right" | "remove-top" | "remove-bottom" | "remove-left" | "remove-right" | "scroll-top" | "scroll-bottom" | "scroll-left" | "scroll-right";
    /** Times per second the function is called */
    FPS?: number;
}
interface takeoffParams {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    relativeTo?: "screen" | "document" | "window" | "parent" | "self";
    window?: "attached" | "detached" | "popup";
}

interface DOMRect {
    readonly bottom: number;
    readonly height: number;
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
}
declare var DOMRect: {
    new(x?: number, y?: number, width?: number, height?: number): DOMRect;
    fromRect(other?: DOMRect): DOMRect;
};

