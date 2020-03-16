"use strict";
const main_1 = require("../main");
const id = "v-md-template plugin";
const pluginType = "vmd-template";
module.exports = (vmdRuler) => {
    vmdRuler.hooks.compiler.tap(id, (filename, webpack, i, vmdTemplate) => {
        if (i.type === pluginType && i.key) {
            const sourceContent = main_1.util.getMdCodeSource(i.content);
            if (!sourceContent)
                return;
            i.template = sourceContent;
            i.withReveal.showSource = sourceContent;
        }
    });
};
