"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tapable_1 = require("tapable");
exports.shareData = {};
class VmdRuler {
    constructor() {
        this.hooks = {
            compiler: new tapable_1.SyncWaterfallHook(["fileName", "webpack", "contentItem", "vmdTemplate"]),
            loader: new tapable_1.SyncWaterfallHook(["candy", "params"]),
        };
        this.store = new Map(); // for vmd option loader
        this.vmdStore = new Map(); // to handle vue-loader repeated load file
    }
    putStore(key, value) {
        this.store.set(key, value);
    }
    getStore(key) {
        const value = this.store.get(key);
        // this.store.delete(key);
        return value;
    }
    putVmdStore(key, value) {
        this.vmdStore.set(key, value);
    }
    getVmdStore(key) {
        return this.vmdStore.get(key);
    }
    clearStore() {
        this.vmdStore.clear();
        this.store.clear();
    }
}
exports.VmdRuler = VmdRuler;
class Util {
    constructor() {
        this.b52Table = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        this.preTimestamp = null;
        this.preUniqueTag = 0;
    }
    to52(num) {
        let str = "";
        let remainder;
        do {
            remainder = num % 52;
            num = Math.floor(num / 52);
            str += this.b52Table[remainder];
        } while (num > 1);
        return str;
    }
    /** not thread safe
     **/
    getUniqueId() {
        let nowTimestamp = new Date().getTime();
        let nowUniqueId;
        if (nowTimestamp === this.preTimestamp) {
            this.preUniqueTag += 1;
            nowUniqueId = this.to52(this.preTimestamp) + this.to52(this.preUniqueTag);
        }
        else {
            this.preTimestamp = nowTimestamp;
            nowUniqueId = this.to52(this.preTimestamp);
            this.preUniqueTag = 0;
        }
        return nowUniqueId;
    }
    getFilenameFromPath(path) {
        return (path && path.match(/[^\/\\]*$/) || "").toString();
    }
    paramsToStr(opts) {
        let str = "";
        for (let key in opts) {
            str += key + "=" + opts[key] + "&";
        }
        return str.slice(0, -1);
    }
    strToParams(str) {
        str = str[0] === "?" ? str.slice(1) : str;
        const params = {};
        str.split("&").forEach(i => {
            if (!i)
                return;
            const [key, value] = i.split("=");
            params[key] = value === undefined ? true : value;
        });
        return params;
    }
    generateRelativePath(filename, options) {
        return `./${filename}?${this.paramsToStr(options)}`;
    }
    getMdCodeSource(mdSource) {
        const m = mdSource.match(/```.*((.|\n|\r)*)```/);
        return m && m[1].trim();
    }
}
exports.util = new Util();
exports.vmdRuler = new VmdRuler();
