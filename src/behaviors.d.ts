interface Behaviors
{
    frame: frame;
    "frame-set": {state: array};
    history: history;
    
    from: form;
    select: {options: Element};
    calender: calender
    textarea: textarea;
    edit: edit;
    masked: masked;
    
    plaintext: plaintext;
    
    vlist: vlist;
    scrollbar: scrollbar;
    
    lottie: lottie;
}

interface frame
{
    /** Initiates loading of the document from the URL.  
      * calls `newdocument/complete` events */
    loadFile(path: string): boolean;
    /** Initiates loading of the document from the html string or bytes.  
      * calls `newdocument/complete` events */
    loadHtml(html: string|ArrayBuffer, baseURL?: string): boolean;
    /** Clear the content of the frame by loading empty document in it. */
    loadEmpty(): void;
    /** Save document to the file in UTF-8 encoding. */
    saveFile(path: string): boolean;
    /** Save document into ArrayBuffer as sequence of UTF-8 encoded bytes. */
    saveBytes(): ArrayBuffer;
    
    readonly document: Document;
    /**  Get/Set key/value map of media variables used by the document. */
    mediaVars: object;
    /** URL of document loaded into the frame. */
    url: string;
}

interface history
{
    /** Goes back in navigational stack, returns true if navigation was successful. */
    back(): boolean;
    /** Goes forward in navigational stack, returns true if navigation was successful. */
    forward(): boolean;

    /** Depth of history in backward direction. */
    readonly length: number;
    /** Depth of history in forward direction. */
    readonly forwardLength: number;
}

interface form
{
    /** Submits content of the form if its action attribute is defined on the form. */
    submit(): void;
    /** Resets input elements to their initial values. */
    reset(): void;
}

interface vlist
{
    navigateTo(target: number|"start"|"end"|"pagenext"|"pageprior"|"itemnext"|"itemprior"): void;
    /** scroll to given record number. By default it performs animated scroll.  
        Returns DOM element representing the record. */
    advanceTo(target: number): Element;

    /** Get of first visible item in the buffer. */
    readonly firstVisibleItem: Element;
    /** Get of last visible item in the buffer. */
    readonly lastVisibleItem: Element;
    readonly firstBufferIndex: number;
    readonly lastBufferIndex: number;
    readonly itemsTotal: number;
    itemsBefore: number;
    itemsAfter: number;
}

interface textarea
{
    /** Index of first selected character. */
    readonly selectionStart: number;
    /** Index of last select character+1/ */
    readonly selectionEnd: number;
    /** selected text or empty sting if there is no selection or selection is collapsed. */
    readonly selectionText: string;

    selectAll(): void;
    selectRange(start: number, end: number): void;
    appendText(text: string): boolean;
    /** Replace select text with given text. */
    insertText(text: string): boolean;
    /** Remove selected text. */
    removeText(): boolean;
}

interface scrollbar
{
    /** Sets values of scrollbar element - position, min, max,
     * page - reflects to size of scrollbar slider,
     * step - increment value of on arrow buttons clicks. */
    values(position:number, min:number, max:number, page:number, step:number): void;

    readonly max: number;
    readonly min: number;
    /** Page value, size of scrollbar's slider. */
    readonly page: number;
    /** Defines position increment/decrement of clicks on arrow buttons. */
    readonly step: number;

    /** Current slider position. */
    position: number;
}

interface calender
{
    /** Gets/Sets current view mode. */
    mode: "days"|"months"|"years"|"century";
    /** Decrements the value by 1 or a specified number.
     * Depends of current mode it will advance either day or month or year or decade. */
    stepDown(steps?: number): void;
    /** Increments the value by 1 or by a specified number.
     * Depends of current mode it will advance either day or month or year or decade. */
    stepUp(steps?: number): void;
}

interface edit
{
    readonly selectionStart, readonly selectionEnd: number;
    /** Returns selected text or empty string if there is no selection. */
    readonly selectionText: string;

    /** Select whole content. */
    selectAll(): void;
    /** selects text between start (included)
     * and end (excluded) position. If start and end are omitted - removes selection. */
    selectRange(start?: number, end?: number): void;
    /** Remove selected text. */
    removeText(): void;
    /** Insert text at caret position, if selection is not empty removes selected text before insertion. */
    insertText(text: string): void;
    /** Appends the text at the end of existing text. */
    appendText(text: string): void;
}

interface masked
{
    /** This property allows to define structure of masked input "manually" and with more control.
     * Mask definition is an array of strings (rendered as static separators) and objects.
     * Each object defines editable regions and may have following fields: */
    mask: string|array;
    type: "integer"|"text"|"enum";
    /** Defines length of the region in characters */
    width: number;
    /** Defines CSS class of generated span element */
    class: string;
    min, max, step: number;
    /** If true then this `type:integer` field is prefixed by zeros */
    "leading-zero": boolean;
    /** Defines list of enumerable cases for `type:enum`
     * this region allows to input only those predefined cases. */
    items: enum;
    /** Defines filter of allowed characters in this `type:text` field. */
    filter: string;
}

/** Provides playback of Lottie animations. It parses Adobe After Effects
 * animations exported as json with Bodymovin and renders them natively inside the Sciter.  
 * [Documentation](https://gitlab.com/sciter-engine/sciter-js-sdk/-/blob/main/docs/md/behaviors/behavior-lottie.md) */
interface lottie
{
    /** Reports playback status. If true animation is playing at the moment. */
    readonly playing: boolean;
    /** float, speed multiplier, 1.0 by default. */
    speed: number;
    loop: boolean;
    /** Current frame in range [0..frames). */
    frame: number;
    /** Total number of frames in animation. */
    readonly frames: number;
    /** Current animation position, number in range 0.0 .. 1.0 */
    position: number;
    /** Total duration of full animation loop as defined by animation designer. */
    readonly duration: number;
    /** Array (list) of marker definitions.
     * Each definition is an array (tuple): [tagName:string, startFrame: integer, endFrame: integer]. */
    readonly markers: array;

    /** Load (potentially asynchronously) animation from JSON file at URL. */
    load(url: string): boolean;
    /** Start playback. If first/last frame is provided will play only frames in the range. */
    play(firstFrame?: number, lastFrame: number): boolean;
    /** Stop (pause) animation. */
    stop(): boolean;
    /** Update animation properties dynamically at runtime. */
    update(keyPath: string, propName: string, value: Graphics.Color|number): boolean;
}

interface plaintext
{
    /** Get/Set text line at given index */
    children: string[];
    /** String content, lines seperated by \r\n */
    content: string|string[];
    readonly lines: number;
    readonly selectionStart, readonly selectionEnd: [lineNumber: number, linePosition: number];
    readonly selectionText: string;

    /** Load Content from URL */
    load(url: string): boolean;
    /** Save Content to URL(file path) */
    save(url: string): boolean;
    /** Select text range; */
    selectionRange(startLine: number, startPosition: number, endLine: number, endPosition: number): void;
    /** Select all text; */
    selectAll(): void;
    /** Append line/s at the end of the text; */
    appendLine(text: string|string[]): boolean;
    /** Inserts line/s at line index; */
    insertLine(index: number, text: string|string[]): boolean;
    /** Remove line/s starting from index */
    removeLine(index: number, count?: number): boolean;
    /** Performs transactional update.  
     * [Documentation](https://gitlab.com/sciter-engine/sciter-js-sdk/-/blob/main/docs/md/behaviors/behavior-richtext.md#richtextupdatemutatorfunctiontctx-bool) */
    update(mutator: Function): boolean;
}

