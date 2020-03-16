export interface WithReveal {
    showSource?: string;
}
export interface ContentItem {
    startIndex: number;
    endIndex: number;
    key?: string;
    type?: string;
    content: string;
    template?: string;
    replaceMethod?: (cb: (content: string) => string) => void;
    withReveal: WithReveal;
}
export declare class VMTPDict {
    dict: Map<string, ContentItem>;
    contentList: ContentItem[];
    sourceContent: string;
    constructor(source: string);
    pushContent(contentItem: ContentItem): void;
}
export declare class SeparateVmtp {
    matchReg: RegExp;
    getVMTPDict(source: string): VMTPDict;
}
