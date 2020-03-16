Example title
---
#### js code
```js
const fn=()=>()=>()=>"void";
```
#### vmd-template
```vmd-template
<div>hello-{{$data?"true":"false"}}</div>
```
#### vmd-component
```vmd-component
<template>
<div><span :style="{background:i}" v-for="i in arr">{{i}}</span>
</div>
</template>
<script>
export default {
    data:function(){return ({arr:["indianred","yellow","skyblue"]})}
}
</script>
```
#### vmd-import
```vmd-import
import "./import-sample.vue";
```
end
---