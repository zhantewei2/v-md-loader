import { SyncWaterfallHook } from "tapable";
export declare const shareData: {};
export interface LoaderCandy {
    content: "";
    webpack: any;
    vmdId: string;
    vmdType: string;
}
export declare class VmdRuler {
    hooks: {
        compiler: SyncWaterfallHook<any, any, any>;
        loader: SyncWaterfallHook<any, any, any>;
    };
    store: Map<string, any>;
    vmdStore: Map<string, any>;
    putStore(key: string, value: any): void;
    getStore(key: string): any;
    putVmdStore(key: string, value: any): void;
    getVmdStore(key: string): any;
    clearStore(): void;
}
declare class Util {
    b52Table: string;
    to52(num: number): string;
    preTimestamp: number | null;
    preUniqueTag: number;
    /** not thread safe
     **/
    getUniqueId(): string;
    getFilenameFromPath(path: string): string;
    paramsToStr(opts: {
        [key: string]: any;
    }): string;
    strToParams(str: string): {
        [key: string]: any;
    };
    generateRelativePath(filename: string, options: Record<string, any>): string;
    getMdCodeSource(mdSource: string): null | string;
}
export declare const util: Util;
export declare const vmdRuler: VmdRuler;
export {};
