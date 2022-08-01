interface Style {
    getPropertyValue(name: string): string;
    setProperty(name: string, value: string|length, important?: boolean): void;
    removeProperty(name: string): void;
    colorOf(name: string): Color | null;
    pixelsOf(name: string): number | null;
    imageOf(name: string): Image | null;
    /** Get/Set CSS variables applied to the element
     * @return `{name: value...}`
     */
    variables(variables?: object): object;
    setCursor(cursor: Image|null, x: number, y: number): void;


    behavior: string;
    aspect: string;
    prototype: string;
    size: string;
    flow: string;
    fontRenderingMode: "sub-pixel" | "snap-pixel";
    imageRendering: "auto" | "inherit" | "default" | "crispy-edges" | "pixelated" | "optimize-quality" | "optimize-speed";
    contextMenu: string;
    hitMargin: string;
    content: string;
    scrollManner: string;
    verticalScrollbar: string;
    horizontalScrollbar: string;
    textOverflow: string;
    popupPosition: string;


    font: string;
    fontSize: length;
    height: length;
    width: length;

    color: string;
    background: string;
    backgroundColor: string;
    backgroundImage: string;
    foreground: string;
    foregroundColor: string;
    foregroundImage: string;

    [name: string]: string|length;
}

