import {vmdRuler, util, VmdHandler, VMTPDict, VmdTemplate} from "./main";
import marked from "./lib/markdown";
import vmdOptionLoader from "./vmd-option.loader";

const loader = function (this: any, source: string) {
    const resourceName = util.getFilenameFromPath(this.resourcePath);

    if (this.resourceQuery) {
        const params = util.strToParams(this.resourceQuery);
        if (params.vmdType && params.vmdId) return vmdOptionLoader(this, params);
    }

    let cacheFileContent: string = vmdRuler.getVmdStore(resourceName);
    const vmdTemplate = new VmdTemplate();
    if (!cacheFileContent) {
        const vmdHandler = new VmdHandler();

        const vmtpDict: VMTPDict = vmdHandler.apply(source);
        const mdContent: string = vmtpDict.contentList
            .map(i => {
                if (i.key) {
                    i.template = "";
                    vmdRuler.hooks.compiler.call(resourceName, this, i, vmdTemplate);
                } else {
                    i.template = marked.parser(marked.lexer(i.content));
                }
                return i;
            })
            .map(i => i.template || "")
            .join("");

        vmdTemplate.setMdContent(mdContent);
        cacheFileContent = vmdTemplate.getVueFileContent();
        vmdRuler.putVmdStore(resourceName, cacheFileContent);
    }
    return vmdTemplate.getVueCompiledValueFromContent(this, cacheFileContent);
};

export = loader;