interface behaviors
{
    // FRAME
    frame: frame;
    // VIRTUAL_LIST
    vlist: vlist;
    // SELECT
    select: {options: Element};
    // TEXTAREA
    textarea: textarea;
    // SCROLLBAR
    scrollbar: scrollbar;
}

interface frame
{
    /** Initiates loading of the document from the URL.  
      * calls `newdocument/complete` events */
    loadFile(path: string): boolean;
    /** Initiates loading of the document from the html string or bytes.  
      * calls `newdocument/complete` events */
    loadHTML(html: string|ArrayBuffer, baseURL: string): boolean;
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

