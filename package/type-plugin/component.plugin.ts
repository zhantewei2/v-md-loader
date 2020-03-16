import {VmdRuler, util, ContentItem, VmdTemplate, LoaderCandy} from "../main";

const vueLoader = require("vue-loader");

const id = "v-md-component plugin";
const pluginType = "vmd-component";

export = (vmdRuler: VmdRuler) => {
    vmdRuler.hooks.compiler.tap(id, (filename: string, webpack: any, i: ContentItem, vmdTemplate: VmdTemplate) => {
        if (i.type === pluginType && i.key) {

            const sourceContent = util.getMdCodeSource(i.content);
            if (!sourceContent) return;
            const vmdId = i.key;
            vmdRuler.putStore(vmdId, sourceContent);
            const filePath = util.generateRelativePath(filename, {
                "vmdType": pluginType,
                vmdId
            });
            vmdTemplate.appendImport(
                `import ${vmdId} from "${filePath}"`
            );
            const componentTag = `vmd-${vmdId}`;
            vmdTemplate.setComponent(componentTag, vmdId);
            i.template = `<${componentTag}/>\n`;
            i.withReveal.showSource = sourceContent;
        }

    });

    vmdRuler.hooks.loader.tap(id, (s: LoaderCandy) => {

        if (s.vmdType === pluginType) {
            const sourceContent: any = vmdRuler.getStore(s.vmdId);
            if (!sourceContent) return;
            s.content = vueLoader.call(s.webpack, sourceContent);
        }
    })
}