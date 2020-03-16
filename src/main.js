import cc from "./test.v.md";
import Vue from "vue";
import "./style/main.scss";

// import cc2 from "./test2.v.md";
const div = document.createElement("div");
document.body.appendChild(div);

new Vue({
    render: h => h("div", [h(cc)])
}).$mount(div);