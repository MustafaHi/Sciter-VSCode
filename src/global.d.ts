/** Call function after x time
 * @return Timeout ID for `clearTimeout(ID)`
 */
declare function setTimeout(cb: Function, milliseconds: number): number;
/** Cancel `setTimeout` function by it returned ID */
declare function clearTimeout(tID: number): void;
/** Call function every x amount of time
 * @return Interval ID for `clearInterval(ID)`
 */
declare function setInterval(cb: Function, milliseconds: number): number;
/** Cancel `setInterval` function by it returned ID */
declare function clearInterval(iID: number): void;
/** Call function on every frame
 * @return function ID for `cancelAnimationFrame(ID)`
 */
declare function requestAnimationFrame(cb: Function): number;
/** Cancel `requestAnimationFrame` function by it returned ID */
declare function cancelAnimationFrame(aID: number): void;

declare var console:
{
   log(...arg: any): void;
   warn(...arg: any): void;
   error(...arg: any): void;
}

declare function getComputedStyle(el: Element, pseudoElement?: Element): Style;

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

/** 
 * "module" version of stock `eval()` function.  
 * It evaluates the text as a module body. If the url is provided it is used as a base URL
 * for resolving relative paths in `import ... from "relpath"` statements inside.
 * @return module's exported data as an object.
 */
declare function evalModule(text: string, url?: string): any;

/** Loads and executes JavaScript at url synchronously. */
declare function loadScript(url: string): void;

/** Loads and executes JavaScript module at url synchronously. Returns modules exports object */
declare function loadScriptModule(url: string): any;

/** Number of physical screen pixels in logical CSS px (dip) */
declare var devicePixelRatio: float;

/** Current document directory */
declare const __DIR__: string;

declare var globalThis: object;
declare var window: typeof globalThis;


declare function fetch(url: string | Request, params?: fetchParams): Promise<Response>;

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
   body?: string|FormData;
   headers?: {
      Accept?: string;
      'Accept-Language'?: string;
      'Content-Type'?: 'application/json'|'application/x-www-form-urlencoded'|'text/plain'|'multipart/form-data';
      'Content-Language'?: string;
      [name: string]: string|boolean;
   }
   /** Callback function to be called on download progress.  
    * Note: total argument can be zero if server does not provide `Content-Length` info. */
   downloadProgress?: (fetched: number, total: number) => void;
}

interface Response
{
   readonly body: string;
   readonly bodyUsed: boolean;
   readonly headers: any;
   readonly ok: boolean;
   readonly redirected: boolean;
   readonly status: number;
   readonly statusText: string;
   readonly type: string;
   readonly url: string;
   /** if true then the request was aborted by `request.abort()` call.
    * @version 5.0.1.1+ */
   readonly aborted: boolean;
   readonly request: Request;
   
   arrayBuffer(): Promise<ArrayBuffer>;
   blob(): Promise<ArrayBuffer>;
   clone(): Response;
   error(): Response;
   redirect(url: string, status?: number): Response;
   formData(): Promise<FormData>;
   json(): Promise<any>;
   text(): Promise<string>;
}

interface Request
{
   cache: "no-cache" | "reload" | "default";
   context: "html" | "image" | "style" | "cursor" | "script" | "data" | "font" | "audio";
   headers: any;
   method: 'POST'|'GET'|'PUT'|'DELETE';
   url: string;
   /** Try to abort current request; Response of aborted request will have `response.aborted` property set to true.
    * @version 5.0.1.1+ */
   abort(): void;
   progress?: (bytesLoaded: number, totalBytes: number) => void;

   /** Appends a new value to existing key inside the object, or adds the key if it does not already exist.  
    * To overwrite existing key/value use `set()`.
    */
   append(key: string, value: any, filename?: string): void;
   /** Sets a new value for an existing key inside the object, or adds the key/value if it does not already exist. */
   set(key: string, value: any, filename?: string): void;
   delete(key: string): void;
   /** Returns an iterator allowing to go through all key/value pairs contained in this object */
   entries(): [key: string, value: any][];
   /** Returns the first value associated with a given key */
   get(key: string): any;
   /** Returns all the values associated with a given key */
   getAll(key: string): any[];
   /** Returns a boolean stating whether object contains a certain key. */
   has(key: string): boolean;
   /** Returns an iterator allowing to go through all keys contained in this object.  */
   keys(): string[];
   /** Returns an iterator allowing to go through all values contained in this object. */
   values(): any[];
}
declare var Request:
{
   new(): Request;
}
interface FormData extends Request
{

}
declare var FormData:
{
   new(): FormData;
}

interface URL
{
   /** `#hash` */
   readonly hash: string;
   /** `sub.domain.org` */
   readonly host: string;
   readonly hostname: string;
   /** Full URL */
   readonly href: string;
   /** `https://sub.domain.org` */
   readonly origin: string;
   /** `/path/without/host` */
   readonly pathname: string;
   readonly port: number;
   /** Protocol type: `https:|http:|file:` */
   readonly protocol: string;
   /** Query paramters: `?q=1&w=w` */
   readonly search: string;

   readonly filename: string;
   readonly dir: string;
   readonly extension: string;

   guessMimeType(): string;
}
declare var URL: {
   new(url: string): URL;
   /** Decode and remove prefix */
   toPath(path: string): string;
   /** Encode and prefix path with `file://` */
   fromPath(path: string): string;
}

/** Creates binary JSON pack/unpack context. */
interface BJSON
{
   /** Serializes JSON data to the ArrayBuffer */
   pack(data: object): ArrayBuffer;
   /** Restore data from BJSON blob
    * @param data previously packed JSON data
    * @param cb function taking `(data)` as argument
   */
   unpack(data: ArrayBuffer, cb: Function): void;
}
declare var BJSON: {
   new(): BJSON;
}

declare var Clipboard:
{
   read(): clipboardObject;
   readText(): string;
   write(data: clipboardObject): boolean;
   writeText(text: string): boolean;
   has(type: "text"|"html"|"image"|"file"|"json"|"link"): boolean;
}
interface clipboardObject
{
   text?: string;
   html?: string;
   json?: any;
   /** List of files path */
   file?: string[];
   link?: { caption: string, url: string };
   image?: Image;
}

/** The Zip class allows access to the content of a zip file or blob.
 * @version 5.0.0.2+
 */
interface Zip
{
   /** Number of files(items) in the Zip. */
   readonly length: number;
   /** Fetch file by it index. */
   item(index: number): ZipItem;
   /** Fetch file by it path (local to the zip). */
   item(path: string ): ZipItem;
}
declare var Zip:
{
   openFile(path: string): Zip;
   openData(data: ArrayBuffer): Zip;
}
interface ZipItem
{
   readonly isDir: boolean;
   readonly isFile: boolean;
   /** Local path of the item inside the zip. */
   readonly path: string;
   /** Data of the item as ArrayBuffer. */
   readonly data: ArrayBuffer;
}

