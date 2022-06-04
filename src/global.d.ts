/** Call function after x time
 * @return Timeout ID for `clearTimeout(ID)`
 */
declare function setTimeout(cb: function, milliseconds: number): number;
/** Cancel `setTimeout` function by it returned ID */
declare function clearTimeout(tID: number): void;
/** Call function every x amount of time
 * @return Interval ID for `clearInterval(ID)`
 */
declare function setInterval(cb: function, milliseconds: number): number;
/** Cancel `setInterval` function by it returned ID */
declare function clearInterval(iID: number): void;
/** Call function on every frame
 * @return function ID for `cancelAnimationFrame(ID)`
 */
declare function requestAnimationFrame(cb: function): number;
/** Cancel `requestAnimationFrame` function by it returned ID */
declare function cancelAnimationFrame(aID: number): void;

declare var console:
{
   log(...arg: any): void;
   warn(...arg: any): void;
   error(...arg: any): void;
}

/**
 * Format arguments using [C-style printf conventions](https://en.cppreference.com/w/cpp/io/c/fprintf).  
 * Sciter specific:  
    `%v` - print as JSON.stringify(arg);  
    `%V` - print as JSON.stringify(arg, null, " ");
 */
declare function printf(...args: string[]): string;

/**
 * Format arguments using [C-style scanf conventions](https://en.cppreference.com/w/c/io/fscanf).  
 */
declare function scanf(...args: string[]): array<string | number>;

/** Number of physical screen pixels in logical CSS px (dip) */
declare var devicePixelRatio: float;

/** Current document directory */
declare const __DIR__: string;

declare function getComputedStyle(el: Element, pseudoElement?: Element): Style;

declare function fetch(url: string, params: fetchParams): Promise<object>;

interface fetchParams
{
   method?: 'POST'|'GET'|'PUT'|'DELETE';
   mode?: 'cors'|'no-cors'|'same-origin';
   cache?: 'default'|'no-cache'|'reload'|'force-cache'|'only-if-cached';
   credentials?: 'same-origin'|'include'|'omit';
   redirect?: 'follow'|'manual'|'error';
   referrerPolicy?: 'non-referrer-when-downgrade'|'non-referrer'|'origin'|'origin-when-cross-origin'|'same-origin'|'strict-origin'|'strict-origin-when-cross-origin'|'unsafe-url';
   integrity?: string;
   keepalive?: boolean;
   sync?: boolean;
   body?: Response;
   headers?: {
      'Content-Type': 'application/json'|'application/x-www-form-urlencoded';
      [name: string]: string|boolean;
   }
}

interface Response
{
   readonly body: string;
   readonly bodyUsed: boolean;
   readonly headers: object;
   readonly ok: boolean;
   readonly redirected: string[]|undefined;
   readonly status: number;
   readonly statusText: string;
   readonly type: string;
   readonly url: string;
   
   arrayBuffer(): Promise<ArrayBuffer>;
   blob(): Promise<ArrayBuffer>;
   clone(): Response;
   error(): Response;
   redirect(url: string, status?: number): Response;
   formData(): Promise<FormData>;
   json(): Promise<object>;
   text(): Promise<string>;
}

