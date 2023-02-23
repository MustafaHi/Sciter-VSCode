/** This module provides Sciter's built-in data persistence - data storage and retrieval. */
declare module '@storage' {
  declare interface storage {
    /** Storage root object containing the data.
    * any modification of this object will result in saving the data to storage file. */      
    root: any;
    /**
    * Create Index to provide effective access and ordering of potentially large data sets.
    * @param type defines type of keys in the index. It can be "string", "integer", "long", "float" or "date".
    * @param unique `true` if the index supports only unique keys, or `false` if records with the same key values are allowed in the index.
    */
    createIndex(type: 'string'|'integer'|'long'|'float'|'date', unique?: boolean): index|null;
    /** Closes underlying Storage object. Commits all data before closing.
     * After closing the storage all persistent objects that are still in use are set to non-persistent state. */
    close(): void;
    /** Commits (writes) all persistent objects reachable from its root into storage. */
    commit(): void;

    /** 
     * Registers class (a.k.a. constructor function in terms of ES5) of persistable objects.
      When an object is stored into DB, name of its class is also stored. 
      When the object is fetched from the DB, it gets the class assigned automatically if that class was registered before.
      @version 5.0.2.4+
    */
    registerClass(cls);
  }
  /** Index object in persistent storage. provide effective access and ordering of potentially large data sets. */
  interface index {
    /** Insert or replace object in index associated with the key value. */
    set(key: any, value: any, replace?: boolean): boolean;
    /** Returns object associated with the key or null. key has to be of the same type as the type of the index object.
    *  If the index was created as non unique then the return value is an array - list of items under the key. */
    get(key: any): any|any[]|null;
    /** Returns selection in the Index based on criteria `min-key, max-key` sorted by ascent or descent order, start-inclusive and end-inclusive.  
     * @info Either `minKey or maxKey` can be `null` that means search from very first or very last key in the index. */
    select(minKey: any, maxKey: any, ascending?: true, startInclusive?: true, endInclusive?: true): any[];
    /** Remove object by it key from the index. If the index is unique, obj is optional. */
    delete(key: any, object?: any): boolean;
    /** Removes all items from the index object. */
    clear(): void;

    /** Number of objects associated represented by the index. */
    readonly length: number;
    /** `true` if the index was declared as unique. */
    readonly unique: boolean;
    /** key type as it was declared at creation time. */
    readonly type: string;
  }

  /** Opens the storage and returns an instance of Storage object. If allowWrite is false then storage is opened in read-only mode. */
  export function open(path: string, allowWrite?: true): storage|null;
}

