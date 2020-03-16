import {VmdRuler, util, ContentItem, VmdTemplate, LoaderCandy} from "../main";

const id = "v-md-template plugin";
const pluginType = "vmd-template";


export = (vmdRuler: VmdRuler) => {
    vmdRuler.hooks.compiler.tap(id, (filename: string, webpack: any, i: ContentItem, vmdTemplate: VmdTemplate) => {
        if (i.type === pluginType && i.key) {
            const sourceContent = util.getMdCodeSource(i.content);
            if (!sourceContent) return;
            i.template = sourceContent;
            i.withReveal.showSource = sourceContent;
        }
    })
}