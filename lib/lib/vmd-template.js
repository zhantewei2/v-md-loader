"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vueLoader = require("vue-loader");
class VmdTemplate {
    constructor() {
        this.components = {};
        this.importList = [];
    }
    render() {
        return `
<template>
    <div class="vmd-wrapper">
        ${this.mdContent}
    </div>
</template>
<script>
${this.importList.join(";\n")}

export default {
    components:${this.injectComponents()}

}      
</script>
        `;
    }
    injectComponents() {
        let str = "{";
        for (let key in this.components) {
            str += `"${key}":${this.components[key]},`;
        }
        return str + "}";
    }
    appendImport(importLine) {
        this.importList.push(importLine);
    }
    setComponent(key, value) {
        this.components[key] = value;
    }
    setMdContent(content) {
        this.mdContent = content;
    }
    getVueFileContent() {
        return this.render();
    }
    getVueCompiledValueFromContent(webpack, renderContent) {
        return vueLoader.call(webpack, renderContent);
    }
    getVueCompiledValue(webpack) {
        return vueLoader.call(webpack, this.getVueFileContent());
    }
}
exports.VmdTemplate = VmdTemplate;
