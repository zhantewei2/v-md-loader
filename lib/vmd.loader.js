"use strict";
const tslib_1 = require("tslib");
const main_1 = require("./main");
const markdown_1 = tslib_1.__importDefault(require("./lib/markdown"));
const vmd_option_loader_1 = tslib_1.__importDefault(require("./vmd-option.loader"));
const loader = function (source) {
    const resourceName = main_1.util.getFilenameFromPath(this.resourcePath);
    if (this.resourceQuery) {
        const params = main_1.util.strToParams(this.resourceQuery);
        if (params.vmdType && params.vmdId)
            return vmd_option_loader_1.default(this, params);
    }
    let cacheFileContent = main_1.vmdRuler.getVmdStore(resourceName);
    const vmdTemplate = new main_1.VmdTemplate();
    if (!cacheFileContent) {
        const vmdHandler = new main_1.VmdHandler();
        const vmtpDict = vmdHandler.apply(source);
        const mdContent = vmtpDict.contentList
            .map(i => {
            if (i.key) {
                i.template = "";
                main_1.vmdRuler.hooks.compiler.call(resourceName, this, i, vmdTemplate);
            }
            else {
                i.template = markdown_1.default.parser(markdown_1.default.lexer(i.content));
            }
            return i;
        })
            .map(i => i.template || "")
            .join("");
        vmdTemplate.setMdContent(mdContent);
        cacheFileContent = vmdTemplate.getVueFileContent();
        main_1.vmdRuler.putVmdStore(resourceName, cacheFileContent);
    }
    return vmdTemplate.getVueCompiledValueFromContent(this, cacheFileContent);
};
module.exports = loader;
