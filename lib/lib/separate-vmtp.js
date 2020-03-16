"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vmd_public_data_1 = require("../vmd-public-data");
class VMTPDict {
    constructor(source) {
        this.dict = new Map();
        this.contentList = [];
        this.sourceContent = source;
    }
    pushContent(contentItem) {
        if (contentItem.key) {
            this.dict.set(contentItem.key, contentItem);
            contentItem.replaceMethod = (cb) => {
                contentItem.content = cb(contentItem.content);
            };
        }
        this.contentList.push(contentItem);
    }
}
exports.VMTPDict = VMTPDict;
class SeparateVmtp {
    constructor() {
        this.matchReg = /```(vmd-.*)(.*|\r|\n)*?```/g;
    }
    getVMTPDict(source) {
        let matcher;
        let beginIndex = 0;
        const vmtpDict = new VMTPDict(source);
        while (matcher = this.matchReg.exec(source)) {
            const tpType = matcher[1];
            const [startIndex, endIndex] = [matcher.index, this.matchReg.lastIndex];
            vmtpDict.pushContent({
                startIndex: beginIndex,
                endIndex: startIndex,
                content: source.slice(beginIndex, startIndex),
                withReveal: {}
            });
            vmtpDict.pushContent({
                startIndex,
                endIndex,
                type: tpType,
                key: vmd_public_data_1.util.getUniqueId(),
                content: source.slice(startIndex, endIndex),
                withReveal: {}
            });
            beginIndex = endIndex;
        }
        if (!vmtpDict.contentList.length)
            vmtpDict.pushContent({
                startIndex: beginIndex,
                endIndex: source.length,
                content: source,
                withReveal: {}
            });
        return vmtpDict;
    }
}
exports.SeparateVmtp = SeparateVmtp;
