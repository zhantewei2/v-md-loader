"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const separate_vmtp_1 = require("./separate-vmtp");
exports.VMTPDict = separate_vmtp_1.VMTPDict;
class default_1 extends separate_vmtp_1.SeparateVmtp {
    constructor() {
        super();
    }
    apply(source) {
        return this.getVMTPDict(source);
    }
    registerTpType() {
    }
}
exports.default = default_1;
