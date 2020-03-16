import VmdHandler, {VMTPDict, ContentItem, WithReveal} from "./lib/vmd-handler";
import {VmdTemplate} from "./lib/vmd-template";
import {vmdRuler, util, VmdRuler, LoaderCandy} from "./vmd-public-data";


const typePlugin = [
    require("./type-plugin/component.plugin"),
    require("./type-plugin/import.plugin"),
    require("./type-plugin/template.plugin")
];

typePlugin.forEach(i => i(vmdRuler));

export {
    VmdHandler,
    VMTPDict,
    ContentItem,
    WithReveal,
    vmdRuler,
    util,
    VmdRuler,
    VmdTemplate,
    LoaderCandy
}