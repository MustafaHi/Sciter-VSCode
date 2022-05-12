//| Sciter.d.ts v0.5.0
//| https://github.com/MustafaHi/sciter-vscode


declare module "@sciter" {
    export const VERSION: string;
    export const REVISION: string;
    export const QUICKJS_VERSION: string;
    /** Returns first matched DOM element in current document. */
    export function $(query: string): Element;
    /** Returns list (array) of matched DOM elements. */
    export function $$(query: string): array<Element>;
//    export function import(path: string): object;
    /**
     * Load native Sciter extension
     * @param name path to library without .dll/.dylib (relative to sciter.dll)
     */
    export function loadLibrary(name: string): any;
    /** Passive json parser */
    export function parseValue(val:string): any;
    /** Converts length to device (screen) pixels */
    export function devicePixels(length: number | string, axis: "width" | "height")
    /** Generate unique id */
    export function uuid(): string;
    /** Subscribe to any DOM event */
    export function on(event: string, selector?: string, handler: function): void;
    /** Unsubscribe to any DOM event */
    export function off(eventOrHandler: string | function): void;
    export function encode(text: string, encoding ?: string): ArrayBuffer;
    export function decode(bytes: ArrayBuffer, encoding ?: string): string;
    export function compress(input: ArrayBuffer, method?: "gz" | "gzip" | "lzf"): ArrayBuffer;
    export function decompress(input: ArrayBuffer, method?: "gz" | "gzip" | "lzf"): ArrayBuffer;
    export function toBase64(input:ArrayBuffer): string;
    export function fromBase64(input:string): ArrayBuffer;
    export function md5(input:ArrayBuffer): string;
    export function crc32(input:ArrayBuffer): number;
}

declare module "@env" {
    export const OS: string;
    export const PLATFORM: string;
    export const DEVICE: "desktop" | "mobile";
    export function language(): string;
    export function country(): string;
    export function userName(): string;
    export function machineName(): string;
    export function domainName(): string;
    /**
     * Launch file/URL with default system application
     */
    export function launch(path:string): void;
    export function home(relpath ?: string): string;
    export function homeURL(relpath ?: string): string;
    /**
     * Return path of default system folder ie. documents|downloads
     * @param name of default system folder
     * @param relpath relative path to name
     */
    export function path(name: keyof typeof systemPath, relpath ?: string): string;
    export function pathURL(name: string): string;
    /**
     * Execute comma seperated arguments
     */
    export function exec(...args: string[]): void;
    
}

declare enum systemPath { "home", "root", "desktop", "applications", "downloads", "documents", "music", "videos", "pictures" }


declare module "@sys" {
    declare interface spawnOptions {stdout?: string, stdin?: string, stderr?: string}
    export function spawn(args: array<string>, options?: spawnOptions ): Process;
    export function hrtime();
    export function gettimeofday();
    export function uname();
    export function isatty();
    export function environ();
    export function getenv();
    export function setenv();
    export function unsetenv();
    export function cwd(): string;
    export function homedir(): string;
    export function tmpdir();
    export function exepath();
    export function random();

    namespace fs {
        /**
         * Watch directory for changes
         * @param path 
         * @param cb callback function
         */
        function watch(path:string, cb: (path:string, events: 0x01 | 0x02) => WatchFS);
        /**
         * Open file instance
         * @param path 
         * @param flags method to open the file with read/write
         * @param mode file content encoding
         */
        function open(path:string, flags: keyof typeof OpenFlagOptions, mode ?: number): Promise<File>;
        /**
         * Synchronously open file instance
         * @param path 
         * @param flags method to open the file with read/write
         * @param mode file content encoding
         */
        function $open(path:string, flags: keyof typeof OpenFlagOptions, mode ?: number): File;
        function stat(path:string): Promise<StatStruct>;
        function $stat(path:string): StatStruct;
        function lstat(): Promise<StatStruct>;
        function $lstat(): StatStruct;
        /** Remove file */
        function unlink(path:string): Promise;
        function rename(oldpath:string, newpath: string) : Promise;
        function mkdtemp(template:string) : Promise<string>;
        function mkstemp(template:string) : Promise<string>;
        function rmdir(path:string) : Promise;
        function $rmdir(path:string);
        function mkdir(path:string, mode ?: 0o777): Promise;
        function $mkdir(path:string, mode ?: 0o777);
        function copyfile(): Promise;
        function readdir(path: string): Promise<FileList>;
        function $readdir(path: string): FileList;
        /** Read file content, check `$readfile` for sync method */
        function readfile(path: string): Promise<ArrayBuffer>;
        /** Synchronously read file content */
        function $readfile(path: string): ArrayBuffer;
        
    }
    
    interface Dir {
        close();
        path: string;
        next();
        [async iterator];
    }

    declare interface File {
        read (length?:number, fileposition ?: number): Promise<Uint8Array>;
        $read(length?:number, fileposition ?: number): Uint8Array;
        write (data:string|string[]|ArrayBuffer, filePosition ?: number) : Promise<number>;
        $write(data:string|string[]|ArrayBuffer, filePosition ?: number) : number;
        close (): Promise<undefined>;
        $close(): undefined;
        fileno(): number;
        stat(): Promise<Object>;
        path: string;
    }

    declare interface WatchFS {
        readonly path: string;
        close(): void;
    }

    declare interface StatStruct {
        isFile ?: boolean;
        isDirectory ?: boolean;
        isSymbolicLink ?: boolean;
        st_dev: number;
        st_ino: number;
        st_mode: number;
        st_nlink: number;
        st_uid: number;
        st_gid: number;
        st_rdev: number;
        st_size: number;
        st_blksize: number;
        st_blocks: number;
        st_atime: number;
        st_mtime: number;
        st_ctime: number;
        st_birthtime: number;
    }
}

declare enum OpenFlagOptions { 'a', 'ax', 'a+', 'ax+', 'as', 'as+', 'r', 'r+', 'rs+', 'w', 'wx', 'w+', 'wx+' }

declare interface Process {
    kill();
    wait(): Promise<ProcessStats>;
    pid: number;
    stdin: Pipe;
    stdout: Pipe;
    stderr: Pipe;
}

declare interface ProcessStats {
    exit_status: number;
    term_signal: number;
}

declare interface Socket {
    close();
    read();
    write();
    fileno();
}
declare interface Pipe extends Socket {
    listen();
    accept();
    getsockname();
    getpeername();
    connect();
    bind();
}

declare interface TTY extends Socket {
    setMode();
    getWinSize();
}

declare interface UDPSocket extends Socket {
    close();
    recv();
    send();
    getsockname();
    getpeername();
    connect();
    bind();
}

declare interface TCPSocket {
    shutdown();
    fileno();
    listen();
    accept();
    getsockname();
    getpeername();
    connect();
    bind();
}


/**
 * Format arguments using [C-style printf conventions](https://en.cppreference.com/w/cpp/io/c/fprintf).  
 * Sciter specific:  
    `%v` - print as JSON.stringify(arg);  
    `%V` - print as JSON.stringify(arg, null, " ");
 */
declare function printf(...args: string[]): string;

/**
 * Format arguments using [C-style scanf conventions](https://en.cppreference.com/w/c/io/fscanf).  
 */
declare function scanf(...args: string[]): array<string | number>;

/** Number of physical screen pixels in logical CSS px (dip) */
declare var devicePixelRatio: float;

interface Element {
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
    post(eventOrHandler: function | Event, avoidDuplicates?: boolean);
    /** Fire event asynchronously, `dispatchEvent` for sync method */
    postEvent(event: Event);
    /** jQuery style event subscription:  
        @param event `^name` for handling events in capturing phase
        @param query subscribe to all children that match the css selector otherwise this element
        @param handler `function(event, matchedElement: Element)` - `this` is set to the element the handler is attached to
        */
    on(event: string, query?: string, handler: function): Element;
    off(eventOrHandler: string|function): Element;
    /** jQuery style event subscription to application wide events:  
     *  The element gets unsubscribed automatically when it is disconnected from DOM
        @param event `^name` for handling events in capturing phase
        @param query subscribe to all children that match the css selector otherwise this element
        @param handler `function(event, matchedElement: Element)` - `this` is set to the element the handler is attached to
        */
    onGlobalEvent(event: string, handler: function): Element;
    /** Unsubscribe this element from particular event, if no argument is provided unsubscribe from all events */
    offGlobalEvent(eventOrHandler?: string | function): Element;
    /** Starts timer on element.
     *  If the element already has a timer with the same callback, it first gets removed and timer is restarted.
     *  This allows to implement effective throttling (debounce).
     *  @param callback `this` is set to the element, `return true` to repeat. */
    timer(milliseconds: number, callback: function): boolean;
    /** Removes content of the element, makes it empty. */
    clear();
    /** Interaction with native behaviors attached to the element. */
    xcall(name: string, ...args): any
    /** Removes the element and moves its content in place in the DOM. */
    unwrapElement();
    /** Wraps range of nodes from start to end into wrap element - opposite action to `unwrapElement()` */
    wrapNodes(start: Node, end: Node, wrap: Element);
    checkCommand(command: string, params?: object): commandFlags;
    /** Execute behavior specific commands */
    executeCommand(command: string, params?: object): commandFlags;
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
    /** Shows the popup element or VNode (JSX) in out-of-canvas popup window on desktop. */
    popup(popup: Element | VNode, params: popupParams): void;
    /**The method offers "manual" animation support.  
     * `function(progress:0.0 ... 1.0)`: true | false  
     * Sciter will call handler with animation frame rate passing current progress value.
     * return false to stop animation. */
    animate(handler: function, params: animateParams): void;
    /** Make the element "airborn" - to be replaced outside of host window */
    takeOff(params: takeoffParams): void;
    /** Append element as last child */
    append(JSX: VNode): void;
    /** Insert element as the first child */
    prepend(JSX: VNode): void;
    /** Replace content by element */
    content(JSX: VNode): void;
    /** patches content of the element by VNode using rules of React[or].  
     *  If second parameter is true the function patches only children but not element itself. */
    patch(JSX: VNode, onlyChildren?: true): void;
    /** Patch properties and enqueue rendering */
    componentUpdate(object: object): void;
    /** Return collapsed range (caret position) at point x/y.
     *  x/a are local coordinates - relative to origin of element's inner box. */
    rangeFromPoint(x: number, y: number): Range | null;
    toString(): string;


    /* NATIVE */

    /** Get element matching the css selector */
    querySelector(query: string): Element;
    /** Get array of elements matching the css selector */
    querySelectorAll(query: string): array<Element>;
    getElementsByClassName(query: string): array<Element>;
    getElementsByTagName(query: string): array<Element>;
    getElementsByName(query: string): array<Element>;
    /** Find the closest parent element matching the query selector */
    closest(query: string): Element | null;
    /** Check element match the selector */
    matches(query: string): boolean;
    firstElementChild: Element;
    lastElementChild: Element;
    nextElementSibling: Element;
    previousElementSibling: Element;
    childElementCount: number;
    children: array<Element>;
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
    state: State;

    disabled: boolean;
    readonly: boolean;
    checked: boolean;
    src: string;

    readonly attributes: array<string>;
    hasAttribute(name: string): boolean;
    getAttribute(name: string): string;
    getAttributeNames(): array<string>;
    setAttribute(name: string, value: string|number|undefined): void;
    removeAttribute(name: string): void;
    attributes: array<string|number>;
    classList: {
        add(name: string[], value: string|number): void;
        remove(name: string[]): void;
        toggle(name: string, state?: boolean): boolean;
        contains(name: string): boolean;
        length: number;
        readonly entries(): array<string>;
    }

    id: string;
    name: string;
    tagName: string;
    tag: string;
    className: string;
    elementIndex: number;
    innerHTML: string;
    outerHTML: string;
    innerText: string;
    value: string|number|boolean|undefined;

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
    addEventListener(name: string, handler: function, flags?: string): void;
    removeEventListener(name: string, handler: function): void;
    /** Fire event synchronously, `postEvent` for async method */
    dispatchEvent(event: Event);
}
type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";
interface popupParams {
    /** 1..9, reference point on anchor border box (see keyboard numpad for the meaning) */
    anchorAt: number;
    /** 1..9, reference point on popup's margin box. */
    popupAt: number;
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

interface Style {
    getPropertyValue(name: string): string;
    setProperty(name: string, value: string|length, important?: boolean): void;
    removeProperty(name: string): void;
    colorOf(name: string): Graphics.Color | null;
    pixelsOf(name: string): number | null;
    imageOf(name: string): Graphics.Image | null;
    /** Get/Set CSS variables applied to the element
     * @return `{name: value...}`
     */
    variables(variables?: object): object;
    setCursor(cursor: Graphic.Image|null, x: number, y: number): void;


    behavior: string;
    aspect: string;
    prototype: string;
    size: string;
    flow: string;
    "font-rendering-mode": "sub-pixel" | "snap-pixel" | "classic" | "enhanced";
    "image-rendering": "auto" | "crispy-edges" | "pixelated" | "inherit" | "default" | "optimize-quality" | "optimize-speed";
    "context-menu": string;
    "hit-margin": string;
    content: string;
    "scroll-manner": string;
    "vertical-scrollbar": string;
    "horizontal-scrollbar": string;
    "text-overflow": string;
    "popup-position": string;


    font: string;
    "font-size": string|length;
    height: string|length;
    width: string|length;

    color: string;
    background: string;
    backgroundColor: string;
    backgroundImage: string;
    foreground: string;
    foregroundColor: string;
    foregroundImage: string;
}

interface Document extends Element {
    /** Load image from `url` and bind it to variable */
    bindImage(url: string, img ?: Graphics.Image): Graphics.Image;

    /** return path relative to document path */
    url(relpath ?: string): string;


    /* NATIVE */

    body: Element;
    head: Element;
    /** Root(html) element */
    documentElement: Element;
    /** document loading state - `complete` | `interactive` */
    readyState: string;
    createElement(tag: string): Element;
    createTextNode(): Node;
    createComment(): Comment;
    createDocumentFragment();
    createNodeIterator(root: string, whatToShow?: string, filter?: string): NodeIterator;
}

declare var Document: {
    new(): Document;
};

declare var document: Document;

interface Window {
    // new(param: object<windowParam>);
    //
    new(): Window;
    state: number| keyof typeof windowState;

    /** Window has input focus. */
    readonly isActive: boolean;

    /** Monitor index where the current window is on */
    readonly screen: number;
    /** Number of monitors in the system */
    readonly screens: number;

    /** current graphics backend used: `direct2d`, `Skia/OpenGL`, etc. */
    readonly graphicBackend: string;
    /** blur-behind effect  
     * one of `none` `auto` `dark` `ultra-dark` `light` `ultra-light` */
    blurBehind: string;

    /** Minimal size of resizable window `[width, height]` */
    minSize: array;
    /** Maximum size of resizable window `[width, height]` */
    maxSize: array;

    frameType: keyof typeof frameType;
}

declare var Window: {
    this: Window;
    new(param?: windowParam): Window;
}

interface windowParam {
    type?: number| keyof typeof windowType;
    /** When owner closed or minimized this window will be closed/minimized too. */
    parent?: Window;
    /** window caption (or title) */
    caption?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    /** x,y,w,h are coordinates of desired window client box on the screen; */
    client?: boolean;
    /** [1 to 9] alignment of the window on monitor,
     * if [-1 to -9] and parent is provided then it aligns the window against parent window.
     * (`1` bottom left corner, `2` bottom middle, `3` bottom right corner,
     * `4` middle left, `5` center, `6` middle right, `7` top left corner,
     * `8` top middle, `9` top right corner) */
    alignment?: number;
    /** index of monitor to spawn on. */
    screen?: number;
    state?: number| keyof typeof windowState;
    /** window html source file */
    url?: string;
    /** extra parameters to pass to the new window. */
    parameter?: array|string|object;
}

enum windowType {
    POPUP_WINDOW  = 0,
    TOOL_WINDOW   = 1,
    CHILD_WINDOW  = 2,
    FRAME_WINDOW  = 3,
    DIALOG_WINDOW = 4,
}
enum windowState {
    WINDOW_SHOWN     = 0,
    WINDOW_MINIMIZED = 1,
    WINDOW_MAXIMIZED = 2,
    WINDOW_HIDDEN    = 3,
    WINDOW_FULL_SCREEN = 4,
}

enum frameType { "standard", "solid", "solid-with-shadow", "extended", "transparent" }