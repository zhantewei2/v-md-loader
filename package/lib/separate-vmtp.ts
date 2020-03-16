import {util} from "../vmd-public-data";

export interface WithReveal {
    showSource?: string;
}


export interface ContentItem {
    startIndex: number;
    endIndex: number;
    key?: string;
    type?: string;
    content: string;
    template?: string; // vue template html or markdown html
    replaceMethod?: (cb: (content: string) => string) => void;
    withReveal: WithReveal;
}

export class VMTPDict {
    dict: Map<string, ContentItem> = new Map();
    contentList: ContentItem[] = [];
    sourceContent: string;

    constructor(source: string) {
        this.sourceContent = source;
    }

    pushContent(contentItem: ContentItem) {

        if (contentItem.key) {
            this.dict.set(contentItem.key, contentItem);
            contentItem.replaceMethod = (cb) => {
                contentItem.content = cb(contentItem.content);
            };
        }
        this.contentList.push(contentItem);
    }

}

export class SeparateVmtp {
    matchReg: RegExp = /```(vmd-.*)(.*|\r|\n)*?```/g;

    getVMTPDict(source: string): VMTPDict {
        let matcher: any;
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
                key: util.getUniqueId(),
                content: source.slice(startIndex, endIndex),
                withReveal: {}
            });

            beginIndex = endIndex;
        }
        const endIndex = source.length;
        if (beginIndex != endIndex) vmtpDict.pushContent({
            startIndex: beginIndex,
            endIndex,
            content: source.slice(beginIndex, endIndex),
            withReveal: {}
        });

        return vmtpDict;
    }
}