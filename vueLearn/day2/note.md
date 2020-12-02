#### 1. Vue相关API

Vue.set   // 设置数据   （this.\$set）
Vue.delete  // 删除属性 （this.\$delete）

##### 事件相关

vm.\$on   &emsp;&emsp;&emsp;&emsp;   // 监听实例上自定义事件
vm.\$emit  &emsp;&emsp;&emsp;&emsp;  // 触发事件
vm.\$once  &emsp;&emsp;&emsp;&emsp;  // 只触发一次
vm.\$off   &emsp;&emsp;&emsp;&emsp;  // 

vm.\$off()  &emsp;&emsp;  // 移除当前实例所有事件的监听器
vm.\$off('test')  &emsp;&emsp; // 移除当前实例该事件的所有监听器
vm.\$off('test', callback)  &emsp;&emsp;  // 只移除当前实例这个回调的监听器


#### 事件总线



Vue.prototype.$bus = new Vue()

// 可以在任意组件中使用this.$bus访问该vue实例

A组件内派发事件：`this.$bus.$emit('eventName','参数')`
B组件内监听事件：`this.$bus.$on('eventName', (‘参数’) => {})`


#### 组件或元素引用

ref或vm.\$refs

ref被用来给元素或自组件注册引用信息。引用信息将会组册在父组件的\$refs对象上，如果在普通的DOM元素上使用，引用指向的就是DOM元素，如果用在子组件上，引用就指向组件实例


<font color=#FF0000 >注意</font>

+ ref是作为渲染结果被创建的，在初始渲染时不能访问它们
+ \$ref不是响应式的，不要试图用它在模板中做数据绑定
+ 当v-for用于元素或组件时，引用信息将是包含DOM节点或组件实例的数组