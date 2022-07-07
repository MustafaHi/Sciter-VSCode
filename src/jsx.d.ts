/** Enable JSX React support */
declare var React: any;

declare namespace JSX {
    // Custom Element documentation support
    interface IntrinsicElements {
        /** Root document element */
        html: any;
        [tagName: string]: any;
    }
}

