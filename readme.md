@ztwx/vue-md-loader
---
[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]

Features
---
- Load markdown file as a vue component.

- highlight code in markdown.

- **Render vue code in markdown**

- **Render vue code in markdown**

- **Render vue code in markdown**

Example
---
`render result`:

![render-image][img_render]

`vmd markdown code`:

![origin-image][img_origin]


Install
---

```
npm install @ztwx/vue-md-loader --save-dev
```

Usage
---

Markdown file will be loaded as a vue component.
so you can use it like the follow example.

```javascript

import markdownComponent from "./sample.v.md";
Vue.component("my-md",markdownComponent);
//or
...
render:h=>h(markdownComponent);
...
```

### style

**main.js**

```javascript
import "@ztwx/vue-md-loader/lib/style/main.css";
```

or **main.scss**

```scss
@import "~@ztwx/vue-md-loader/lib/style/main.css";
```

`@ztwx/vue-md-loader ` presets the github style of `highlight.js`.

You can choose which style you want from `highlight.js`.


Config
---

webpack



```javascript

const VmdPlugin = require("@ztwx/vue-md-loader/lib/vmd.plugin");
...
module.exports={
  modules:{
      rules:[
        {
          test:/\.v\.md$/,
          loader:"@ztwx/vue-md-loader"
        }],
    },
    plugins:[
        new VmdPlugin()
    ]
}

```

webpack-chain

```javascript

const VmdPlugin = require("@ztwx/vue-md-loader/lib/vmd.plugin");
config.module.rule("vmd")
    .test(/\.v\.md/)
    .use("@ztwx/vue-md-loader")
    .loader("@ztwx/vue-md-loader");
config.plugin("vmd")
    .use(VmdPlugin);
```

Render Vue code
---
Forgive me. I have to write markdown in markdown.

Please replace **'** to **`**

### vmd-template

`example.v.md`:
```html
# your title

'''js
console.log("This is plain javascript code.")
'''

'''vmd-template
<my-card></my-card>
<my-button></my-button>
'''
```
The code below the `vmd-template` will be rendered.

### vmd-component


`example.v.md`

```html
# your title
**your markdown tag**
'''vmd-component
  <template>
      <div>vmd component work!!!</div>
  </template>
  <script>
  export default {}
  </script>
'''
```
The embedded `vue component` will be rendered in the final markdown file.

### vmd-import


`example.v.md`

```javascript

# your title

'''vmd-import
import "./you.vue"
'''
```

`you.vue` will be rendered as a component in the markdown file.





## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/@ztwx/vue-md-loader.svg
[npm-downloads]: https://img.shields.io/npm/dt/@ztwx/vue-md-loader.svg
[npm-url]: https://www.npmjs.com/package/@ztwx/vue-md-loader
[img_render]: https://zhantewei2.github.io/v-md-loader/md-render.png
[img_origin]: https://zhantewei2.github.io/v-md-loader/md-origin.png
