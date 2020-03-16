import {VmdRuler, util, ContentItem, VmdTemplate, LoaderCandy} from "../main";

const fs = require("fs");
const vueLoader = require("vue-loader");

const id = "v-md-import plugin";
const pluginType = "vmd-import";

const importFromReg = /import\s+([^\s]+?)\s+from\s+([^\s]+?)\s?(;|\r|\n)/;
const importReg = /import\s+(["']+.*?["']+)/;

export = (vmdRuler: VmdRuler) => {
    vmdRuler.hooks.compiler.tap(id, (filename: string, webpack: any, i: ContentItem, vmdTemplate: VmdTemplate) => {
        if (i.type === pluginType && i.key) {
            const vmdId = i.key;
            const sourceContent = util.getMdCodeSource(i.content);
            if (!sourceContent) return;
            const importMatcher: any = importReg.exec(sourceContent);
            let sourceImportFile: string;
            //import "xx"
            if (importMatcher) {
                sourceImportFile = importMatcher[1];
            } else {
                const importFromMather: any = importFromReg.exec(sourceContent);
                // import xx from "xxx"
                sourceImportFile = importFromMather[2];
            }
            if (!sourceImportFile) return;
            const virtualCode = `
                import xx from ${sourceImportFile};
                export default xx;
            `;

            vmdRuler.putStore(vmdId, virtualCode);
            vmdTemplate.appendImport(
                `import ${vmdId} from "${util.generateRelativePath(filename, {"vmdType": pluginType, vmdId})}"`
            );
            const componentTag = `vmd-${vmdId}`;
            vmdTemplate.setComponent(componentTag, vmdId);
            i.template = `<${componentTag}/>\n`;
        }
    });

    vmdRuler.hooks.loader.tap(id, (s: LoaderCandy) => {
        if (s.vmdType === pluginType) {
            s.content = vmdRuler.getStore(s.vmdId);
        }
    })
}