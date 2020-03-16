import hljs from "highlight.js";

export const hljsHandler = (code: string, lang: string) => {
    const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(validLang, code).value;
};