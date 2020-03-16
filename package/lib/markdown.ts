import marked from "marked";
import {hljsHandler} from "./hightlight";

marked.setOptions({
    highlight: hljsHandler,
});

export default marked;