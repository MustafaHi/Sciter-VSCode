interface Selection
{
    /** `true` if selection is collapsed to one position (anchor === focus) */
    readonly isCollapsed: boolean;
    /** Nearest container element that encloses as anchor as focus positions */
    readonly commonAncestorContainer: Element;
    readonly anchorNode: Node;
    readonly anchorOffset: number;
    /** Caret position */
    readonly focusNode: Node;
    readonly focusOffset: number;
    readonly rangeCount: number;
    readonly type: "Caret" | "Selection" | "Element" | "TableCells";

    /** Collapse selection to current focus (caret) position. */
    collapse(): void;
    /** Collapse selection to anchor or focus (the last in the DOM). */
    collapseToEnd(): void;
    /** Collapse selection to anchor or focus (the first in the DOM). */
    collapseToStart(): void;
    /** `true` if the selection contains the node. */
    containsNode(node: Node): boolean;
    /** Remove selection (but not its content). */
    empty(): void;
    /** Set focus (caret) position without changing anchor position. */
    extend(node: Node, offset: number): void;
    getRangeAt(index: number): Range;
    selectNodeContent(node: Node): void;
    setBaseAndExtent(anchorNode: Node, anchorOffset: number, focusNode: Node, focusOffset: number): void;
    /** Return selected text. */
    toString(): string;
}

