interface Document extends Element {
    /** Return image associated with provided arbitrary url, or assign one if image is provided too.  
     * This method also allow you to use the image in CSS by it URL.
     */
    bindImage(url: string, image?: Image): Image;

    /** Returns absolute path of provided relative path using the document URL as a base. */
    url(relpath ?: string): string;

    /** Subscribe to any DOM event */
    on(event: keyof typeof eventType, selector?: string, handler: eventFunction): void;
    on(event: keyof typeof domEvent, handler: eventFunction): void;

    /* NATIVE */

    body: Element;
    head: Element;
    /** Root(html) element */
    documentElement: Element;
    /** document loading state - `complete` | `interactive` */
    readyState:  'complete' | 'interactive';
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

enum domEvent {
    parsed,
    ready,
    DOMContentLoaded,
    complete,
    close,
    unload,
    beforeunload,
    closerequest
}

