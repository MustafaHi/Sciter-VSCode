interface Document extends Element {
    /** Load image from `url` and bind it to variable */
    bindImage(url: string, img ?: Graphics.Image): Graphics.Image;

    /** return path relative to document path */
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

