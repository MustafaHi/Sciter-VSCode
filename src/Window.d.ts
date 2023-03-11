interface Window {
    /** Window state: hidden, shown, fullscreen...  
     *  use `Window.WINDOW_****` */
    state: number;

    /** Window has input focus. */
    readonly isActive: boolean;
    /** The property is false when the window was closed and destroyed. */
    readonly isAlive: boolean;
    /** True if window is on active space now.
     * the property is undefined if host system does not support spaces (virtual desktops). */
    readonly isOnActiveSpace: boolean|undefined;
    
    /** Get/Set Window title */
    caption: string;
    isResizable: boolean;
    isMaximizable: boolean;
    isMinimizable: boolean;
    /** Window is alway on top */
    isTopmost: boolean;
    /** Does the window accept user input. */
    isEnabled: boolean;
    /** Width to height ratio to keep on window resizes */
    aspectRatio: number;
    
    /** If set by element, direct all UI events to that element and its children. */
    eventsRoot: Element|null;
    focus: Element;
    readonly parent: Window|null;
    readonly document: Document;
    /** Parameters provided by constructor, available inside the window as they are. */
    parameters: any;

    /** Monitor index where the current window is on */
    readonly screen: number;
    /** current graphics backend used: `direct2d`, `Skia/OpenGL`, etc. */
    readonly graphicBackend: string;
    /** blur-behind effect  
     * one of `none` `auto` `dark` `ultra-dark` `light` `ultra-light` */
    blurBehind: "none" | "auto" | "dark" | "ultra-dark" | "light" | "ultra-light";

    /** Minimal size of resizable window `[width, height]` */
    minSize: [width: number, height: number];
    /** Maximum size of resizable window `[width, height]` */
    maxSize: [width: number, height: number];

    frameType: keyof typeof frameType;

    /** The function allows to enumerate elements in tab order.
     * reference element must be selectable.  
     * to select element use `window.this.focus = element`
    */
    focusable(direction: "next"|"prior"|"first"|"last", reference: Element): Element;
    /** Set input focus to window */
    activate(bringToFront: boolean): void;
    /** Request to update the window. */
    update(): void;
    /** Report geometry and data of the screen (monitor) the window is on. */
    screenBox(type: keyof typeof screenBoxType, property: "xywh"|"rect"|"position"|"dimension", asPpx?: boolean): number[];
    screenBox(type: keyof typeof screenBoxType, property: keyof typeof boxProperties, asPpx?: boolean): number;
    /** Return name of device */
    screenBox(type: 'device'): string;
    /** Is window on primary monitor. */
    screenBox(type: 'isPrimary'): boolean;
    /** Return screenshot of the monitor the window is on. */
    screenBox(type: 'snapshot'): Image;
    /** Report geometry of the window.  
     *  @param property value type to return.
     *  @param metric value in relation to.
     *  @param relativeTo offset x/y are relative to.
     *  @param asPpx return coordinates in screen pixels otherwise DIPs.
     */
    box(property: "xywh"|"rect"|"position"|"dimension", metric: keyof typeof windowBoxMetric, relativeTo?: keyof typeof windowBoxRelativeTo, asPpx?: boolean): number[];
    box(property: keyof typeof boxProperties, metric: keyof typeof windowBoxMetric, relativeTo?: keyof typeof windowBoxRelativeTo, asPpx?: boolean): number;
    /** move/size window.  
     * x, y, width, height are in PPX (physical screen pixels).  
     * If `client` is provided then parameters are window client area coordinates. */
    move(x: number, y: number, width?: number, height?: number, client?: boolean): void;
    /** move/size window to particular monitor.  
     * x, y, width, height are in DIPs - device independent pixels (a.k.a. CSS pixels). */
    moveTo(monitor: number, x: number, y: number, width?: number, height?: number, client?: boolean): void;

    /** Subscribe to window related events, init callback everytime the event occurs. */
    addEventHandler(event: windowEvent, handler: function): Window;
    /** Subscribe to window related events, init callback everytime the event occurs. */
    on(event: windowEvent, cb: eventFunction): Window;
    /** Unsubscribe from event by eventname or handler used by `on()` */
    off(eventOrHandler: windowEvent|function): Window;
    /** Send event to the window synchronously. Returns `true` if the window consumes the event. */
    dispatchEvent(event: Event): boolean;
    /** Post event to the window asynchronously. The function returns immediately - does not wait for the event consumption. */
    postEvent(event: Event): void;

    /** Load HTML document to Window */
    load(url: string): void;
    /** Open file selection dialog */
    selectFile<T extends selectFileParams>(params: T): T extends {'mode': 'open-multiple'} ? string[] : string;
    selectFile(mode: "save"|"open", filter: string): string;
    selectFile(mode: "open-multiple", filter: string): string[];
    /** Open folder selection dialog */
    selectFolder(params: object): string;

    /** Performs system event(s) in application message queue, mode is one of:  
     * `wait` - waits for the next event and executes it;  
     * `noWait` - if next event is available executes it otherwise returns immediately;  
     * `untilMouseUp` - executes events until mouseup event arrives, used for various drag cases;  
     * `untilQuit` - performs run loop - executes all events until application quit message arrives;  
     * `I/O` - performs events associated with I/O; */
    doEvent(mode?: "wait"|"noWait"|"untileMouseUp"|"untilQuit"|"I/O");
    /** Interaction with native behaviors attached to the window. */
    xcall(name: string, ...args): any;
    /** Performs drag-and-drop using system D&D mechanism. */
    perfromDrag(data: dragParams, mode: "copy"|"move", dragIcon: Image|Element,
                dragIconXoff?: number, dragIconYoff?: number): null|"copy"|"move";

    /** Show tray icon with the image and tooltip text.  
     * Tray icon will generate "trayiconclick" event for Window on user clicks */
    trayIcon({image: Image, text: string}): boolean;
    /** Remove tray icon */
    trayIcon(command: "remove"): boolean;
    /** Report location of the icon on desktop, coordinates are in screen pixels. */
    trayIcon(command: "place"): [x: number, y: number, w: number, h: number];
    /** Request user attention by flashing or bouncing window icon in task/dock bar. */
    requestAttention(command: "info" | "alert" | "stop"): void;

    /** gets/sets media variable that can be used in CSS as `@media name {...}` */
    mediaVar(name: string, value?: string): string|number|void;
    /** gets/sets multiple media variables. that can be used in CSS as `@media name {...}`*/
    mediaVars(values?: object): object|void;
    /** Show a new window as dialog, returns
     * close value of `Window.this.close(valueToReturn)` call inside the window.  
     * [Documentation](https://gitlab.com/sciter-engine/sciter-js-sdk/-/blob/main/docs/md/Window.md#windowmodaljsx-any)*/
    modal(params: windowParam): any;
    modal(params: JSX): any;

    /** Close this window and return the given value to parent window. */
    close(value?: string): boolean;
}

declare var Window: {
    new(param?: windowParam): Window;
    readonly this: Window;
    /** List of Sciter windows in the current process */
    readonly all: Window[];
    /** share is an object shared between all documents and windows in the application.
     * CAUTION: use it responsibly.If temporary window or document populates
     * shared object then it should clean it in `beforeunload` document event. */
    share: any;
    /** Number of monitors in the system */
    readonly screens: number;
    /** Report geometry and information of the given screen (monitor). */
    screenBox(screen: number, type: keyof typeof screenBoxType|'devicePixelRatio', property?: "xywh"|"rect"|"position"|"dimension"): number[];
    screenBox(screen: number, type: keyof typeof screenBoxType|'devicePixelRatio', property?: keyof typeof boxProperties): number;
    /** Return name of device */
    screenBox(screen: number, type: 'device'): string;
    /** Is this screen the primary screen. */
    screenBox(screen: number, type: 'isPrimary'): boolean;
    /** Return screenshot of the monitor. */
    screenBox(screen: number, type: 'snapshot'): Image;
    /** Return DOM element under screenX/screenY position.  
     * @info this method may return DOM element belonging to any Sciter window in current process. */
    elementAt(x: number, y: number): Element;
    /** Return value of internal timer. */
    ticks(): number;
    /** Post global event to all windows in current process. */
    post(event: Event): void;
    /** Synchronously sends global event to all windows in current process.  
     * Sending stops on first window that will consume the event by returning true from event handler of this event. */
    send(event: Event): void;
    /** Get command line arguments in a scapp app */
    scapp: {argv: string[]};


    readonly POPUP_WINDOW  : 2,
    readonly TOOL_WINDOW   : 3,
    readonly CHILD_WINDOW  : 4, // undefined
    readonly FRAME_WINDOW  : 5,
    readonly DIALOG_WINDOW : 6,

    readonly WINDOW_SHOWN      : 1;
    readonly WINDOW_MINIMIZED  : 2;
    readonly WINDOW_MAXIMIZED  : 3;
    readonly WINDOW_HIDDEN     : 4;
    readonly WINDOW_FULL_SCREEN: 5;
}

interface windowParam {
    /** Windows type use `Window.****_WINDOW` */
    type?: number;
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
    /** Window state: hidden, shown, fullscreen...  
     *  use `Window.WINDOW_****` */
    state?: number;
    /** window html source file */
    url?: string;
    /** extra parameters to pass to the new window. */
    parameter?: any;
}

type windowEvent = "statechange" | "resolutionchange" | "mediachange" | "activate" | "replacementstart" | "replacementend" | "move" | "size" | "trayiconclick" | "spacechange";

enum frameType { "standard", "solid", "solid-with-shadow", "extended", "transparent" }

enum windowBoxMetric { 'border', 'client', 'cursor', 'caret' }
enum windowBoxRelativeTo { 'desktop', 'monitor', 'self' }
enum screenBoxType { 'frame', 'workarea', 'device', 'isPrimary', 'snapshot' }

interface selectFileParams {
    mode?: "save"|"open"|"open-multiple";
    /** File type filter, as "title|ext1;ext2".  
     *  i.e. `"HTML File (*.htm,*.html)|*.html;*.htm|All Files (*.*)|*.*"` */
    filter?: string;
    /** Default file extension. */
    extension?: string;
    /** Dialog title, "Save As" */
    caption?: string;
    /** Initial directory to open the dialog at. */
    path?: string;
}

interface dragParams {
    text?: string;
    html?: string;
    /** Single or multiple file names; */
    file?: string|string[];
    /** Any data that can be `JSON.stringify`'ed; */
    json: any;
}

