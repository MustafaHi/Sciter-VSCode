declare module "@env" {
    export const OS: string;
    export const PLATFORM: string;
    export const DEVICE: "desktop" | "mobile";
    export function language(): string;
    export function country(): string;
    export function userName(): string;
    export function machineName(): string;
    export function domainName(): string;
    /**
     * Launch file/URL with default system application
     */
    export function launch(path:string): void;
    export function home(relpath ?: string): string;
    export function homeURL(relpath ?: string): string;
    /**
     * Return path of default system folder ie. documents|downloads
     * @param name of default system folder
     * @param relpath relative path to name
     */
    export function path(name: keyof typeof systemPath, relpath ?: string): string;
    export function pathURL(name: string): string;
    /**
     * Execute comma seperated arguments
     */
    export function exec(...args: string[]): void;
    
}

declare enum systemPath { "home", "root", "desktop", "applications", "downloads", "documents", "music", "videos", "pictures" }

