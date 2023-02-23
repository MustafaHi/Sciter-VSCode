declare module "@sys" {
    export function spawn(args: string[], options?: spawnOptions ): Process;
    export function hrtime(): bigint;
    export function gettimeofday(): number;
    export function uname(): unameObject;
    /** Returns `true` if fd is an open file descriptor referring to a terminal. */
    export function isatty(): boolean;
    /** Retrieves all environment variables */
    export function environ(): object;
    export function getenv(name: string): string;
    export function setenv(name: string, value: string): void;
    export function unsetenv(name: string): void;
    export function cwd(): string;
    export function homedir(): string;
    export function tmpdir(): string;
    /** Return path of this executable file. */
    export function exepath(): string;
    export function random(buffer: ArrayBuffer);

    declare var UDP: {
        new(): UDPSocket;
    };
    declare var TCP: {
        new(): TCPSocket;
    };
    declare var TTY: {
        new(): TTY;
    };
    declare var Pipe: {
        new(): Pipe;
    };

    namespace fs {
        /**
         * Monitor files or folders for changes
         * @param path 
         * @param cb callback function
         */
        function watch(path:string, cb: (path:string, events: 0x01 | 0x02) => void): WatchFS;
        /**
         * Open file instance
         * @param path 
         * @param flags method to open the file with read/write
         * @param mode file content encoding
         */
        function open(path:string, flags: keyof typeof OpenFlagOptions, mode ?: number): Promise<File>;
        /**
         * Synchronously open file instance
         * @param path 
         * @param flags method to open the file with read/write
         * @param mode file content encoding
         * @deprecated >5.0.0.5 use `fs.sync.open()`
         */
        function $open(path:string, flags: keyof typeof OpenFlagOptions, mode ?: number): File;
        function openSync(path:string, flags: keyof typeof OpenFlagOptions, mode ?: number): File;
        /** Return information about the file at path. */
        function stat(path:string): Promise<StatStruct>;
        /** Return information about the file at path. (sync) 
         * @deprecated >5.0.0.5 use `fs.sync.stat()` or `fs.statSync()`
        */
        function $stat(path:string): StatStruct;
        /** Return information about the file at path. (sync)
         * @version 5.0.0.6+
         */
        function statSync(path:string): StatStruct;
        /** `lstat()` is identical to `stat()`, except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to. */
        function lstat(): Promise<StatStruct>;
        /** ( sync version of `lstat()` ) `$lstat()` is identical to `$stat()`, except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to. 
         * @deprecated >5.0.0.5 use `fs.sync.lstat()` or `fs.lstatSync()`
        */
        function $lstat(): StatStruct;
        /** ( sync version of `lstat()` ) `$lstat()` is identical to `$stat()`, except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to. 
         * @version 5.0.0.6+
        */
        function lstatSync(): StatStruct;
        /** Expands all symbolic links and resolves references `/./`, `/../` and extra `/` characters in the pathname string to produce a canonicalized absolute pathname. */
        function realpath(pathname: string): string;
        /** Splits path to `0`: directory without trailling `/` and `1`: file name and extension */
        function splitpath(path: string): [directory: string, file: string];
        /** Remove file */
        function unlink(path:string): Promise;
        function unlinkSync(path:string);
        function rename(oldpath:string, newpath: string) : Promise;
        /** Creates unique temporary directory. The last six characters of template must be "XXXXXX". */
        function mkdtemp(template:string) : Promise<string>;
        /** Creates unique temporary file. The last six characters of template must be "XXXXXX" */
        function mkstemp(template:string) : Promise<string>;
        /** Delete directory (async) */
        function rmdir(path:string) : Promise;
        /** Delete directory (sync)
         * @deprecated >5.0.0.5 use `fs.sync.rmdir()` or `fs.rmdirSync()`
         */
        function $rmdir(path:string);
        /** Delete directory (sync) 
         * @version 5.0.0.6+
        */
        function rmdirSync(path:string);
        /** Create directory (async) */
        function mkdir(path:string, mode ?: 0o777): Promise;
        /** Create directory (sync)
         * @deprecated >5.0.0.5 use `fs.sync.mkdir()` or `fs.mkdirSync()`
         */
        function $mkdir(path:string, mode ?: 0o777);
        /** Create directory (sync)
         * @version 5.0.0.6+
         */
        function mkdirSync(path:string, mode ?: 0o777);
        /** Change mode command used to manage file system access permissions on Unix and Unix-like systems.
         * @version 5.0.0.6+
         * @reference [chmod](https://man7.org/linux/man-pages/man2/chmod.2.html)
         */
        function chmod(path: string, mode ?: number): Promise;
        /** Change mode command used to manage file system access permissions on Unix and Unix-like systems. (sync)
         * @version 5.0.0.6+
         * @reference [chmod](https://man7.org/linux/man-pages/man2/chmod.2.html)
         */
        function chmodSync(path: string, mode ?: number);
        /**
         * Asynchronous file copy.
         * @param flag a combination of `fs.UV_FS_COPYFILE_***`
         */
        function copyfile(source: string, destination: string, flag?: number): Promise;
        function copyfileSync(source: string, destination: string, flag?: number);
        /** Read directory contents asynchronously. The promise resolves to file list. */
        function readdir(path: string): Promise<FileList[]>;
        /** Read directory contents synchronously. return file list. 
         * @deprecated >5.0.0.5 use `fs.sync.readdir()` or `fs.readdirSync()`
        */
        function $readdir(path: string): FileList[];
        /** Read directory contents synchronously. return file list. 
         * @version 5.0.0.6+
        */
        function readdirSync(path: string): Promise<FileList[]>;
        /** Return file content, check `readfileSync` for sync method. */
        function readFile(path: string): Promise<ArrayBuffer>;
        function readfile(path: string): Promise<ArrayBuffer>;
        /** Synchronously return file content.
         * @deprecated >5.0.0.5 use `fs.sync.readfile()` or `fs.readfileSync()`
         */
        function $readfile(path: string): ArrayBuffer;
        /** Synchronously return file content.
         * @version 5.0.0.6+
         */
        function readFileSync(path: string): ArrayBuffer;
        function readfileSync(path: string): ArrayBuffer;
        
        const UV_DIRENT_UNKNOWN: 0;
        const UV_DIRENT_FILE: 1;
        const UV_DIRENT_DIR : 2;
        const UV_DIRENT_LINK: 3;
        const UV_DIRENT_FIFO: 4;
        const UV_DIRENT_SOCKET: 5;
        /** Character stream device, like terminal. */
        const UV_DIRENT_CHAR: 6;
        const UV_DIRENT_BLOCK: 7;
        
        /** `fs.copyfile()` flag : return an error if the destination already exists */
        const UV_FS_COPYFILE_EXCL: 1;
        /** `fs.copyfile()` flag : attempt to create a reflink, if copy-on-write is not supported, a fallback copy mechanism is used. */
        const UV_FS_COPYFILE_FICLONE: 2;
        /** `fs.copyfile()` flag : attempt to create a reflink, if copy-on-write is not supported, an error is returned. */
        const UV_FS_COPYFILE_FICLONE_FORCE: 4;

        /** Synchronous methods of existing Asynchronous file system methods.
         * @version 5.0.0.6+
         */
        namespace sync {
            /**
             * Open file instance
             * @param path 
             * @param flags method to open the file with read/write
             * @param mode file content encoding
             */
            function open(path:string, flags: keyof typeof OpenFlagOptions, mode ?: number): File;
            /** Return information about the file at path. */
            function stat(path:string): StatStruct;
            /** `lstat()` is identical to `stat()`, except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to. */
            function lstat(): StatStruct;
            /** Delete directory. */
            function rmdir(path:string);
            /** Create directory.*/
            function mkdir(path:string, mode ?: 0o777);
            /** Change mode command used to manage file system access permissions on Unix and Unix-like systems.
             * @reference [chmod](https://man7.org/linux/man-pages/man2/chmod.2.html)
            */
            function chmod(path: string, mode ?: number);
            /** Read directory contents. The promise resolves to file list. */
            function readdir(path: string): FileList[];
            /** Return file content. */
            function readfile(path: string): ArrayBuffer;
            function unlink(path:string);
            function rename(oldpath:string, newpath: string);
            function copyfile(source: string, destination: string, flag?: number);
        }
    }

    interface Dir {
        close();
        path: string;
        next();
        [async iterator];
    }

    declare interface File {
        read (length?:number, fileposition ?: number): Promise<Uint8Array>;
        /** @deprecated >5.0.0.5 use `readSync()` */
        $read(length?:number, fileposition ?: number): Uint8Array;
        /** @version 5.0.0.5+ */
        readSync(length?:number, fileposition ?: number): Uint8Array;
        write (data:string|string[]|ArrayBuffer, filePosition ?: number) : Promise<number>;
        /** @deprecated >5.0.0.5 use `writeSync` */
        $write(data:string|string[]|ArrayBuffer, filePosition ?: number) : number;
        /** @version 5.0.0.6+ */
        writeSync(data:string|string[]|ArrayBuffer, filePosition ?: number) : number;
        close (): Promise<undefined>;
        /** @deprecated >5.0.0.5 use `closeSync` */
        $close(): undefined;
        /** @version 5.0.0.6+ */
        closeSync(): undefined;
        fileno(): number;
        stat(): Promise<StatStruct>;
        path: string;
    }

    interface FileList {
        /** local file name + extension (relative to directory) */
        name: string;
        /** ORed flags (see `fs.UV_DIRENT_****`)  */
        type: number;
    }

    declare interface WatchFS {
        readonly path: string;
        close(): void;
    }

    declare interface StatStruct {
        isFile ?: boolean;
        isDirectory ?: boolean;
        isSymbolicLink ?: boolean;
        st_dev: number;
        st_ino: number;
        st_mode: number;
        st_nlink: number;
        st_uid: number;
        st_gid: number;
        st_rdev: number;
        st_size: number;
        st_blksize: number;
        st_blocks: number;
        st_atime: number;
        st_mtime: number;
        st_ctime: number;
        st_birthtime: number;
    }

    interface unameObject {
        /** OS code name: Windows_NT */
        sysname: string;
        /** OS version: 10.0.19044  */
        release: string;
        /** OS type: Windows 10 Enterprise */
        version: string;
        /** Processor type: i686 */
        machine: string;
    }

    interface spawnOptions {
        stdin ?: string;
        stdout?: string;
        stderr?: string;
    }
}

declare enum OpenFlagOptions { 'a', 'ax', 'a+', 'ax+', 'as', 'as+', 'r', 'r+', 'rs+', 'w', 'wx', 'w+', 'wx+' }

declare interface Process {
    kill();
    wait(): Promise<ProcessStats>;
    pid: number;
    stdin: Pipe;
    stdout: Pipe;
    stderr: Pipe;
}

declare interface ProcessStats {
    exit_status: number;
    term_signal: number;
    exitCode: number;
    terminationSignal: number;
}

declare interface Socket {
    close(): void;
    fileno(): number;
    getsockname(): NetworkParam;
    getpeername(): NetworkParam;
    connect(param: NetworkParam): Promise<void>;
    bind(param: NetworkParam): void;
}

declare interface UDPSocket extends Socket {
    recv(): Promise<{data: ArrayBuffer, flags: number, addr: NetworkParam}>;
    send(data: string|ArrayBuffer): Promise<void>;
}

declare interface TCPSocket extends Socket {
    shutdown(): void;
    listen(): void;
    accept(): Promise<TCPSocket>;
    read(): Promise<ArrayBuffer>;
    write(data: string|ArrayBuffer): void;
}

declare interface Pipe extends Socket {
    listen(): void;
    accept(): Promise<Pipe>;
    bind(name: string): void;
    getpeername(): string;
    getsockname(): string;
    read(): Promise<ArrayBuffer>;
    write(data: string|ArrayBuffer): void;
}

declare interface TTY {
    close();
    read();
    write();
    fileno();
    setMode();
    getWinSize();
}

declare interface NetworkParam {
    family?: number;
    ip: string;
    port: number;
}

