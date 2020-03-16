import { SeparateVmtp, VMTPDict, ContentItem, WithReveal } from "./separate-vmtp";
export { VMTPDict, ContentItem, WithReveal };
export default class extends SeparateVmtp {
    constructor();
    apply(source: string): VMTPDict;
    registerTpType(): void;
}
