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
 
