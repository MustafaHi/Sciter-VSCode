declare var Graphics: {
    new(): Graphics;
    Brush: Brush;
    Color: Color;
    Image: Image;
    Path: Path;
    Text: gText;
};

interface Graphics
{
    lineCap: 'butt'|'round'|'square';
    lineJoin: 'round'|'bevel'|'miter';
    strokeStyle: Color | string | Image;
    lineWidth: number;
    strokeWidth: number;
    fillStyle: Color | string | Image;
    font: string;
    /** @version 5.0.0.5+ */
    canvas: CanvasElement;

    clearRect(x: number, y: number, w: number, h: number): void;
    beginPath(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, antiClockWise?: boolean): void;
    arcTo(x: number, y: number, x2: number, y2: number, radius: number): void;
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, antiClockWise?: boolean): void;
    rect(x: number, y: number, w: number, h: number): void;
    closePath(): void;
    fill(...args): void;
    fillRect(x: number, y: number, w: number, h: number): void;
    fillText(text: string, x: number, y: number, maxWidth: number): void;
    stroke(...args): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    setLineDash(...args): void;
    save(): void;
    restore(): void;
    scale(x: number, y: number): void;
    translate(x: number, y: number): void;
    rotate(radian: number, x?: number, y?: number): void;
    transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;

    draw(path: Path, params: drawPathParams);
    draw(image: Image, params: drawImageParams);
    draw(text: gText, params: drawTextParams);

    pushLayer(x: number, y: number, w: number, h: number, opacity?: number, filter?: string): void;
    pushLayer(clipAreaName: keyof typeof clipAreaName, opacity?: number, filter?: string): void;
    pushLayer(path: Path, opacity?: number): void;
    pushLayer(mask: Image, useAlpha: boolean, opacity?: number): void;
    popLayer(): void;

    createTile(image: Image): Brush;
    createSolid(color: Color): Brush;
}

interface CanvasElement extends Element {
    height: number;
    width: number;
}

interface drawPathParams {
    x: number;
    y: number;
    fill?: "evenodd" | "nonzero";
    stroke?: boolean;
}

interface drawImageParams {
    x: number;
    y: number;
    width?: number;
    height?: number;
    srcX?: number;
    srcY?: number;
    srcWidth?: number;
    srcHeight?: number;
    opacity?: number;
}

interface drawTextParams {
    x: number;
    y: number;
    /** 1..9, defines meaning of x/y coordinates, see NUMPAD.  
     * `5` - center of text,  
     * `7` - left/top corner, etc. */
    alignment: number;
    fill?: Color;
}

type clipAreaName = "background-area" | "border-box" | "padding-box" | "margin-box" | "context-box";

interface Brush
{
    type: number;
    
    addColorStop(pos: number, color: Color): Brush;
    /** Creates linear gradient brush along the line from x1/y1 to x2/y2 */
    createLinearGradient(x1: number, y1: number, x2: number, y2: number): Brush;
    /** Creates radial gradient brush with center at x/y and radius r */
    createRadialGradient(x: number, y: number, r: number): Brush;
}

interface Color
{
    new(color: string): Color;
    /** float(0..1.0), red channel. */
    readonly r: number;
    /** float(0..1.0), green channel */
    readonly g: number;
    /** float(0..1.0), blue channel. */
    readonly b: number;
    /** float(0..1.0), alpha channel, 0.0 - fully transparent, 1.0 - fully opaque. */
    readonly a: number;
    /** int(0..255), red channel. */
    readonly R: number;
    /** int(0..255), green channel. */
    readonly G: number;
    /** int(0..255), blue channel. */
    readonly B: number;
    /** int(0..255), alpha channel, 0.0 - fully transparent, 1.0 - fully opaque. */
    readonly A: number;
    /** [hue:0..360, saturation:0..1, value: 0..1, alpha: 0..1], HSV color representation. */
    readonly hsv: number[];
    /**  [hue:0..360, saturation:0..1, lightness: 0..1], HSL color representation. */
    readonly hsl: number[];

    /** Produces strings in formats  
     *  `#RRGGBB`, `#RRGGBBAA`, `rgb(255,255,255)` or `rgba(255,255,255,1.0)` */
    toString(type?: "RGB" | "RGBA" | "rgb" | "rgba"): string;
    /** Color packaged to uint32 as `(a << 24) | (b << 16) | (g << 8) | (r)` */
    valueOf(): number;
}
declare var Color: {
    /** Creates `Graphics.Color` instance from r,g,b,a components in float numbers  
     * in `0.0-1.0` range. */
    rgb(r: number, g: number, b: number, a?: number): Color;
    /** Creates `Graphics.Color` instance from r,g,b,a components in integers  
     * in `0-255` range. */
    RGB(r: number, g: number, b: number, a?: number): Color;
    /** Creates `Graphics.Color` instance from HSV components in float numbers  
     * in `0.0-1.0` range but `h` is in `0.0-360.0` range. */
    hsv(h: number, s: number, v: number, a?: number): Color;
    /** Creates `Graphics.Color` instance from HSL components in float numbers  
     * in `0.0-1.0` range but `h` is in `0.0-360.0` range. */
    hsl(r: number, g: number, b: number, a?: number): Color;
}

interface Image
{
    /** Render DOM element onto bitmap. */
    new(width: number, height: number, element: Element): Image;
    /** Render arbitrary graphics on bitmap */
    new(width: number, height: number, canvas: (ctx: Graphics) => void, initColor?: number): Image;

    readonly src: string;
    readonly width: number;
    readonly height: number;
    /** Image format `png`, `webp`, etc. */
    readonly packaging: string;

    /** Static-Method load image from URL return promise of an Image object */
    load(url: string): Promise<Image>;
    /** Draw on the image surface. Image must be a bitmap. */
    update(...arg): void;
    toBytes(format: "png"|"jpeg"|"webp"|"bgra", compression?: number): ArrayBuffer;
    fromBytes(data: ArrayBuffer): Image;
    /** Returns pixel color at x/y. */
    colorAt(x: number, y: number): Color;
    /** Compose this image with src image. */
    compose(src: Image, operation: keyof typeof composeOps, dstX?: number, dstY?: number, srcX?: number, srcY?: number, srcW?: number, srcH?: number): Image;
    /** Return fragment of an image at position.
     * @version 5+
     */
    crop(x: number, y: number, width: number, height: number): Image;
}

enum composeOps {
    "src-over", "dst-over", "src-in", "dst-in", "src-out", "dst-out", "src-atop", "dst-atop", "xor", "copy"
}

interface Path
{
    /** Constructs new path object. accepts SVG's <path>s [d attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d) value. */
    new(svgPath?: string): Path;

    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, antiClockWise?: boolean): void;
    arcTo(x: number, y: number, x2: number, y2: number, radius: number): void;
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, antiClockWise?: boolean): void;
    rect(x: number, y: number, w: number, h: number): void;
    closePath(): void;
    isPointInside(x: number, y: number): boolean;
    bounds(): [x1: number, y1: number, x2: number, y2: number];
    /**  */
    combine(type: "union"|"intersect"|"xor"|"exclude", otherPath: Path): Path;
}

interface gText
{
    new(...args: string[]): gText;
    /** CSS style rules to decorate the text including fonts, alignment, borders and background.*/
    style: string;
    readonly lines: number;
    /** Text to render. */
    chars: string;
    class: string;
    
    /** Reports minimal, maximal and used width of the text block. */
    width(): [minWidth: number, maxWidth: number, usedWidth: number];
    /** Sets used width of the text block. Note: `text.lines` property may change after that */
    width(usedWidth: number): void;
    /** Reports content and used height of the text block. */
    height(): [contentHeight: number, usedHeight: number];
    /** Sets used height of the text block. Note: `vertical-align` of text style may change location of glyphs on screen. */
    height(usedHeight: number): void;
    lineMetrics(lineNo: number): [posY: number, height: number, baselineOffset: number];
    /** Textual content of the line */
    lineChars(lineNo: number): string;
}

