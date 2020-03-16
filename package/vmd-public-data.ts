import {SyncWaterfallHook} from "tapable";


export const shareData = {};

export interface LoaderCandy {
    content: "";
    webpack: any;
    vmdId: string;
    vmdType: string;
}


export class VmdRuler {
    hooks = {
        compiler: new SyncWaterfallHook(["fileName", "webpack", "contentItem", "vmdTemplate"]),
        loader: new SyncWaterfallHook(["candy", "params"]),
    };
    store: Map<string, any> = new Map(); // for vmd option loader
    vmdStore: Map<string, any> = new Map(); // to handle vue-loader repeated load file

    putStore(key: string, value: any) {
        this.store.set(key, value);
    }

    getStore(key: string) {
        const value = this.store.get(key);
        // this.store.delete(key);
        return value;
    }

    putVmdStore(key: string, value: any) {
        this.vmdStore.set(key, value);
    }

    getVmdStore(key: string) {
        return this.vmdStore.get(key);
    }

    clearStore() {
        this.vmdStore.clear();
        this.store.clear();
    }
}


class Util {
    b52Table = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    to52(num: number): string {
        let str = "";
        let remainder;
        do {
            remainder = num % 52;
            num = Math.floor(num / 52);
            str += this.b52Table[remainder];
        } while (num > 1);

        return str;
    }

    preTimestamp: number | null = null;
    preUniqueTag: number = 0;

    /** not thread safe
     **/
    getUniqueId(): string {
        let nowTimestamp: number = new Date().getTime();
        let nowUniqueId: string;

        if (nowTimestamp === this.preTimestamp) {
            this.preUniqueTag += 1;
            nowUniqueId = this.to52(this.preTimestamp) + this.to52(this.preUniqueTag);
        } else {
            this.preTimestamp = nowTimestamp;
            nowUniqueId = this.to52(this.preTimestamp);
            this.preUniqueTag = 0;
        }
        return nowUniqueId;
    }

    getFilenameFromPath(path: string) {
        return (path && path.match(/[^\/\\]*$/) || "").toString();
    }

    paramsToStr(opts: { [key: string]: any }): string {
        let str = "";
        for (let key in opts) {
            str += key + "=" + opts[key] + "&";
        }
        return str.slice(0, -1);
    }

    strToParams(str: string): { [key: string]: any } {
        str = str[0] === "?" ? str.slice(1) : str;
        const params: { [key: string]: any } = {};
        str.split("&").forEach(i => {
            if (!i) return;
            const [key, value] = i.split("=");
            params[key] = value === undefined ? true : value;
        });
        return params;
    }

    generateRelativePath(filename: string, options: Record<string, any>) {
        return `./${filename}?${this.paramsToStr(options)}`;
    }

    getMdCodeSource(mdSource: string): null | string {
        const m = mdSource.match(/```.*((.|\n|\r)*)```/)
        return m && m[1].trim();
    }
}

export const util = new Util();
export const vmdRuler = new VmdRuler();