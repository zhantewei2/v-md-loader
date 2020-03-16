export declare class VmdTemplate {
    mdContent: string;
    components: Record<string, string>;
    importList: string[];
    render(): string;
    injectComponents(): string;
    appendImport(importLine: string): void;
    setComponent(key: string, value: string): void;
    setMdContent(content: string): void;
    getVueFileContent(): string;
    getVueCompiledValueFromContent(webpack: any, renderContent: string): any;
    getVueCompiledValue(webpack: any): any;
}
