interface Node extends EventTarget {
    /** Instance of Window that hosts this node; */
    readonly parentWindow: Window;
    /** Returns the previous sibling. */
    readonly previousSibling: Node | null;
    readonly nodeIndex: number;
    remove(): void;

    /** NATIVE */

    /** Returns the children. */
    readonly childNodes: NodeListOf<Node>;
    /** Returns the first child. */
    readonly firstChild: Node | null;
    /** Returns the last child. */
    readonly lastChild: Node | null;
    /** Returns the next sibling. */
    readonly nextSibling: Node | null;
    /** Returns a string appropriate for the type of node. */
    readonly nodeName: string;
    /** Returns the type of node:  
     * `1` : Element  
     * `2` : Comment  
     * `3` : Text
    */
    readonly nodeType: number;
    nodeValue: string | null;
    /** Returns the node document. Returns null for documents. */
    readonly ownerDocument: Document | null;
    /** Returns the parent element. */
    readonly parentElement: Element | null;
    /** Returns the parent. */
    readonly parentNode: Node | null;
    /** Textual content of an element and all its descendants */
    textContent: string | null;
    appendChild<T extends Node>(node: T): T;
    /** Returns a copy of node. If deep is true, the copy also includes the node's descendants. */
    cloneNode(deep?: boolean): Node;
    /** Returns a bitmask indicating the position of other relative to node. */
    compareDocumentPosition(other: Node): number;
    /** Returns true if other is an inclusive descendant of node, and false otherwise. */
    contains(other: Node | null): boolean;
    /** Returns node's root. (\<html/>) */
    getRootNode(options?: GetRootNodeOptions): Node;
    /** Does this node have children. */
    hasChildNodes(): boolean;
    insertBefore<T extends Node>(node: T, child: Node | null): T;
    /** Does this node and otherNode have the same properties. */
    isEqualNode(otherNode: Node | null): boolean;
    isSameNode(otherNode: Node | null): boolean;
    removeChild<T extends Node>(child: T): T;
    replaceChild<T extends Node>(node: Node, child: T): T;
}
declare var Node: {
    new(): Node;
};

interface Text extends Node
{
    data: string;
    readonly length: number;
    readonly wholeText: string;
}
declare var Text: {
    new(): Text;
}

interface Comment extends Node
{
    data: string;
    readonly length: number;
}
declare var Comment: {
    new(): Comment;
}

/** NodeList objects are collections of nodes, usually returned by properties such as Node.childNodes and methods such as document.querySelectorAll(). */
interface NodeList {
    /** Returns the number of nodes in the collection. */
    readonly length: number;
    /** Returns the node with index index from the collection. The nodes are sorted in tree order. */
    item(index: number): Node | null;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: Node, key: number, parent: NodeList) => void, thisArg?: any): void;
    [index: number]: Node;
}
declare var NodeList: {
    new(): NodeList;
};

interface NodeListOf<TNode extends Node> extends NodeList {
    item(index: number): TNode;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: TNode, key: number, parent: NodeListOf<TNode>) => void, thisArg?: any): void;
    [index: number]: TNode;
}

