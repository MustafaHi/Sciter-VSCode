declare module "@env" {
    /** OS identification name: `"Windows-10.1"`... */
    export const OS: string;
    /** OS/platform generic name: `"Windows", "OSX", "Linux", "Android"`, etc. */
    export const PLATFORM: string;
    /** Device type */
    export const DEVICE: "desktop" | "mobile";
    /** Returns two-letter language abbreviation of user's default language. */
    export function language(): string;
    /** Returns two-letter country abbreviation of the user's country */
    export function country(): string;
    export function userName(): string;
    /** Machine network name. */
    export function machineName(): string;
    /** Machine network domain. */
    export function domainName(): string;
    /**
     * Launch file/URL with default system application
     */
    export function launch(path:string): void;
    /** Converts relative path to absolute path using location of `sciter.dll` as a base. */
    export function home(relpath ?: string): string;
    /** Converts relative path to absolute path prefixed by `file://` using location of sciter.dll as a base. */
    export function homeURL(relpath ?: string): string;
    /**
     * Return path of default system folder ie. documents|downloads
     * @param name of default system folder
     * @param relpath relative path to name
     */
    export function path(name: keyof typeof systemPath, relpath ?: string): string;
    /**
     * Return path of default system folder ie. documents|downloads, prefixed by `file://`
     * @param name of default system folder
     * @param relpath relative path to name
     */
    export function pathURL(name: keyof typeof systemPath): string;
    /** Get/Set environment variable */
    export function variable(key: string, value?: string): string;
    /**
     * Execute comma seperated arguments
     */
    export function exec(...args: string[]): void;
}

enum systemPath { "home", "root", "desktop", "applications", "downloads", "documents", "music", "videos", "pictures", "USER_APPDATA" }

