"use strict";
const main_1 = require("../main");
const vueLoader = require("vue-loader");
const id = "v-md-component plugin";
const pluginType = "vmd-component";
module.exports = (vmdRuler) => {
    vmdRuler.hooks.compiler.tap(id, (filename, webpack, i, vmdTemplate) => {
        if (i.type === pluginType && i.key) {
            const sourceContent = main_1.util.getMdCodeSource(i.content);
            if (!sourceContent)
                return;
            const vmdId = i.key;
            vmdRuler.putStore(vmdId, sourceContent);
            const filePath = main_1.util.generateRelativePath(filename, {
                "vmdType": pluginType,
                vmdId
            });
            vmdTemplate.appendImport(`import ${vmdId} from "${filePath}"`);
            const componentTag = `vmd-${vmdId}`;
            vmdTemplate.setComponent(componentTag, vmdId);
            i.template = `<${componentTag}/>\n`;
            i.withReveal.showSource = sourceContent;
        }
    });
    vmdRuler.hooks.loader.tap(id, (s) => {
        if (s.vmdType === pluginType) {
            const sourceContent = vmdRuler.getStore(s.vmdId);
            if (!sourceContent)
                return;
            s.content = vueLoader.call(s.webpack, sourceContent);
        }
    });
};
