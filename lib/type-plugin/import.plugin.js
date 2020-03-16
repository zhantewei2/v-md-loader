"use strict";
const main_1 = require("../main");
const fs = require("fs");
const vueLoader = require("vue-loader");
const id = "v-md-import plugin";
const pluginType = "vmd-import";
const importFromReg = /import\s+([^\s]+?)\s+from\s+([^\s]+?)\s?(;|\r|\n)/;
const importReg = /import\s+(["']+.*?["']+)/;
module.exports = (vmdRuler) => {
    vmdRuler.hooks.compiler.tap(id, (filename, webpack, i, vmdTemplate) => {
        if (i.type === pluginType && i.key) {
            const vmdId = i.key;
            const sourceContent = main_1.util.getMdCodeSource(i.content);
            if (!sourceContent)
                return;
            const importMatcher = importReg.exec(sourceContent);
            let sourceImportFile;
            //import "xx"
            if (importMatcher) {
                sourceImportFile = importMatcher[1];
            }
            else {
                const importFromMather = importFromReg.exec(sourceContent);
                // import xx from "xxx"
                sourceImportFile = importFromMather[2];
            }
            if (!sourceImportFile)
                return;
            const virtualCode = `
                import xx from ${sourceImportFile};
                export default xx;
            `;
            vmdRuler.putStore(vmdId, virtualCode);
            vmdTemplate.appendImport(`import ${vmdId} from "${main_1.util.generateRelativePath(filename, { "vmdType": pluginType, vmdId })}"`);
            const componentTag = `vmd-${vmdId}`;
            vmdTemplate.setComponent(componentTag, vmdId);
            i.template = `<${componentTag}/>\n`;
        }
    });
    vmdRuler.hooks.loader.tap(id, (s) => {
        if (s.vmdType === pluginType) {
            s.content = vmdRuler.getStore(s.vmdId);
        }
    });
};
