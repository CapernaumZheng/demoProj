## 模板语法

1. Vue模板语法

`{{data}}`
```
<h2 :title="title">
    {{title}}
 </h2>
```
2. 列表渲染
   
```
<div v-for="item in list" :key="item">
    {{ item }}
</div>
```

3. 表单输入绑定

`v-model`
` <input v-model="value" type="text" />`

4. 事件处理
` <button @click="submit"></button>`
