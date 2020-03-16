import {SeparateVmtp, VMTPDict, ContentItem, WithReveal} from "./separate-vmtp";

export {
    VMTPDict,
    ContentItem,
    WithReveal
}

export default class extends SeparateVmtp {
    constructor() {
        super();
    }

    apply(source: string): VMTPDict {
        return this.getVMTPDict(source);
    }

    registerTpType() {

    }
}