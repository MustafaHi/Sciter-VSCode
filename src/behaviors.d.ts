interface Behaviors
{
    frame: frame;
    "frame-set": {state: array};
    history: history;
    
    from: form;
    select: select;
    calender: calender
    textarea: textarea;
    edit: edit;
    masked: masked;
    
    plaintext: plaintext;
    richtext: richtext;
    
    vlist: virtualList;
    scrollbar: scrollbar;
    
    lottie: lottie;
    video: video;
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

interface select
{
    /** Shows popup list of options */
    showPopup(): void;
    /** Closes popup list of options if it is open */
    hidePopup(): void;

    /** Reference to DOM element that holds `<option>` list. */
    options: Element;
}

interface virtualList
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
    update(keyPath: string, propName: string, value: Color|number): boolean;
}

interface plaintext
{
    /** Get/Set text line at given index */
    children: string[];
    /** String content, lines seperated by \r\n */
    content: string|string[];
    readonly lines: number;
    readonly selectionStart: [lineNumber: number, linePosition: number];
    readonly selectionEnd  : [lineNumber: number, linePosition: number];
    readonly selectionText: string;

    /** Load Content from URL */
    load(url: string): boolean;
    /** Save Content to URL(file path) */
    save(url: string): boolean;
    /** Select text range; */
    selectRange(startLine: number, startPosition: number, endLine: number, endPosition: number): void;
    /** Select all text; */
    selectAll(): boolean;
    /** Append line/s at the end of the text; */
    appendLine(text: string|string[]): boolean;
    /** Inserts line/s at line index; */
    insertLine(index: number, text: string|string[]): boolean;
    /** Remove line/s starting from index */
    removeLine(index: number, count?: number): boolean;
    /** Performs transactional (undoable) content update.  
     * [Documentation](https://gitlab.com/sciter-engine/sciter-js-sdk/-/blob/main/docs/md/behaviors/behavior-richtext.md#richtextupdatemutatorfunctiontctx-bool) */
    update(mutator: (context: Transaction) => {}): boolean;
}

interface richtext
{
    /** Get/Set url of loaded document. */
    url: string;

    /** Load Content from URL */
    load(url: string): boolean;
    /** loads content from bytes or string (html source) into the editor;
     * url is used to resolve relative URLs (if any). */
    load(html: string|ArrayBuffer, url?: string): boolean;
    /** Save Content to URL(file path) */
    save(url: string): boolean;
    /** Clear the content by loading empty document in it. */
    loadEmpty(): boolean;
    /** Set content to the html at given selection. */
    sourceToContent(html: string, url: string, selectionStart: number, selectionEnd: number): boolean;
    /** Return content and selection as an array. */
    contentToSource(): [html: string, url: string, selectionStart: number, selectionEnd: number];
    /** Performs transactional (undoable) content update.  
     * [Documentation](https://gitlab.com/sciter-engine/sciter-js-sdk/-/blob/main/docs/md/behaviors/behavior-richtext.md#richtextupdatemutatorfunctiontctx-bool) */
    update(mutator: (context: Transaction) => {}): boolean;
}

interface Transaction
{
    /** Add or change value of one attribute. */
    setAttribute(el: Element, name: string, value: string): void;
    /** Remove one attribute. */
    removeAttribute(el: Element, name: string): void;
    /** Change tag of the element. */
    setTag(el: Element, name: string): void;
    /** Change node text. */
    setText(node: Node, text: string): void;
    /** splits node at offset position until the parent element.
     * Similar to pressing ENTER in the middle of paragraph -
     * text node and p[aragraph] element will be split to two paragraphs; */
    split(node: Node, offset: number, parentEl: Element): [node: Node, offset: number];
    /** Wrap the range into element. */
    wrap(startNode: Node, startOffset: number, endNote: Node, endOffset: number, tag: string): void;
    /** Remove the element and add it content to parent element. */
    unwrap(el: Element): void;
    /** Same as `Element.execCommand()` but all mutations will go into this transaction. */
    execCommand(command: string, params?: object|string): boolean;

    /** Insert text at given node/offset position. */
    insertText(at: Node|number, text: string): [node: Node, offset: number];
    /** Insert HTML at given node/offset position, return list of nodes inserted; */
    insertHTML(at: Node|number, html: string): Node[];
    /** Insert node at given node/offset position. */
    insertNode(at: Node|number, html: string): [node: Node, offset: number];
    
    /** Delete current selected range (if any). */
    deleteSelection(): [node: Node, offset: number];
    deleteRange(startNode: Node, startOffset: number, endNote: Node, endOffset: number): void;
    /** Delete given node or element. */
    deleteNode(node: Node): void;
}

interface video
{
    /** Report playback status. If true then video is playing at the moment. */
    readonly isPlaying: boolean;
    /** If video playback has reached the end of the movie. */
    readonly isEnded: boolean;
    /** Duration in seconds of the movie. If duration is not available it returns 0. */
    readonly duration: number;
    /** Reports natural width and height of video frame of the movie. */
    readonly height, readonly width: number;
    /** Reports video box rectangle in pixels relative to the content box of the element.
     * Note if sizing attribute is "cover" then either x or y can be negative. */
    readonly renderingBox: [x, y, width, height];
    /** float (0.0...1.0). Current volume level of audio track.
     * 1.0 correspond to 0db, 0.0 (mute) -100db. */
    audioVolume: number;
    /** float ( -1.0 ... +1.0 ). Current stereo balance. */
    audioBalance: number;
    /** float, Get/Set current playback position, in seconds. */
    position: number;

    /** Loads video file into the player. use `play()` to start. */
    load(url: string): boolean;
    /** Stops video playback and unloads the movie. */
    unload(): void;
    /** Start playback at current `position` */
    play(): void;
    stop(): void;
}

