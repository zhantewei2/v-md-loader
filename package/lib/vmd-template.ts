const vueLoader = require("vue-loader");

export class VmdTemplate {
    mdContent: string;
    components: Record<string, string> = {};
    importList: string[] = [];

    render() {
        return `
<template>
    <div>
        ${this.mdContent}
    </div>
</template>
<script>
${this.importList.join(";\n")}

export default {
    components:${this.injectComponents()}

}      
</script>
        `
    }

    injectComponents() {
        let str = "{";
        for (let key in this.components) {
            str += `"${key}":${this.components[key]},`
        }
        return str + "}";
    }

    appendImport(importLine: string) {
        this.importList.push(importLine);
    }

    setComponent(key: string, value: string) {
        this.components[key] = value;
    }

    setMdContent(content: string) {
        this.mdContent = content;
    }

    getVueFileContent() {
        return this.render();
    }

    getVueCompiledValueFromContent(webpack: any, renderContent: string) {
        return vueLoader.call(webpack, renderContent);
    }

    getVueCompiledValue(webpack: any) {
        return vueLoader.call(webpack, this.getVueFileContent());
    }

}