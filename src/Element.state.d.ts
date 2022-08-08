/** Runtime flags and state on element.  
 * Most of Element.State reflect so called CSS pseudo-classes (flags): 
 * `element:visited { color: red; }`*/
interface State
{
    /** Computes current min and max widths of the element content. */
    contentWidth(): [minWidth: number, maxWidth: number];
    /** Computes current height of the element content with it given width. */
    contentHeight(width: number): number;
    /** Set/remove mouse capture(forward mouse event)  
     *  `true` - captures mouse events by the element and its sub elements.  
     *  `false` - remove capture if the element owns capture now.  
     *  `"strict"` - mouse events will be delivered to the element only. */
    capture(state: boolean|"strict"): boolean;
    /** Report geometry of the window.  
     *  @param property value type to return.
     *  @param metric value in relation to.
     *  @param relativeTo offset x/y are relative to.
     *  @param asPpx return coordinates in screen pixels otherwise DIPs.
     */
    box(property: "xywh"|"rect"|"position"|"dimension", metric: keyof typeof boxMetric, relativeTo?: keyof typeof boxRelativeTo, asPpx?: boolean): number[];
    box(property: keyof typeof boxProperties, metric: keyof typeof boxMetric, relativeTo?: keyof typeof boxRelativeTo, asPpx?: boolean): number;
    /** Parses length string as CSS length units or percentage and then converts them to CSS pixels.
     *  Perecentage values are computed against element dimensions (inner box). */
    pixelsIn(length: string, orientation?: "horizontal" |  "vertical"): number | undefined;
    /** Maps local element coordinates to window coordinates.
     *  This method accounts affine 2D transformation the element and its parents may have. */
    mapLocalToWindow(x: number, y: number): [x: number, y: number];
    /** Maps point on window to local coordinates of particular element.
     *  This method accounts affine 2D transformation the element and its parents may have. */
    mapWindowToLocal(x: number, y: number): [x: number, y: number];

    focus: boolean;
    readonly ownsfocus: boolean;
    link: boolean;
    visited: boolean;
    hover: boolean;
    selected: boolean;
    current: boolean;
    checked: boolean;
    disabled: boolean;
    readonly: boolean;
    expanded: boolean;
    collapsed: boolean;
    invalid: boolean;
    animating: boolean;
    focusable: boolean;
    anchor: boolean;
    popup: boolean;
    ownspopup: boolean;
    tabfocus: boolean;
    empty: boolean;
    busy: boolean;
    dragover: boolean;
    dragsource: boolean;
    droptarget: boolean;
    moving: boolean;
    copying: boolean;
    pressed: boolean;
    ready: boolean;
    active: boolean;
    /** `False` will prevent reconciliation of element's content by Reactor */
    reactive: boolean;
    /** Runtime value of native behavior attached to the element. Actual for input elements. */
    value: any;
    /** Reports visibility status of the element,  
     *  if `0` then the element is visible in full, otherwise combination of these flags:  
     *  `0x1` - left side of border box is clipped out (invisible).  
     *  `0x2` - top side is clipped.  
     *  `0x4` - right side is clipped.  
     *  `0x8` - bottom side is clipped.  
     *  `0xf` - the element is completely clipped out - invisible. */
    occluded: number;

    /** `True` if this is a root document of the window */
    readonly windowroot: boolean;
    /** Layout manager used by the element at the moment. */
    readonly flow: "default" | "vertical" | "horizontal" | "horizontal-wrap" | "vertical-wrap" | "grid" | "table" | "table-fixed" | "table-row" | "table-body" | "columns" | "stack" | "text" | "null" | "image" | "svg" | "svg-child" | "";
    readonly visible: boolean;
}
enum boxProperties { "xywh", "rect", "position", "dimension", "left", "right", "top", "bottom", "width", "height" }
enum boxMetric { "inner", "border", "padding", "margin", "client", "caret", "icon" }
enum boxRelativeTo { "element", "screen", "window", "document", "parent", "container", "self" }

