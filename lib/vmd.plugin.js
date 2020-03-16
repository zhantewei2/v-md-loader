"use strict";
const main_1 = require("./main");
const id = "vmd-plugin";
module.exports = class VMDPlugin {
    apply(compiler) {
        compiler.hooks.shouldEmit.tap(id, () => {
            main_1.vmdRuler.clearStore();
        });
    }
};
