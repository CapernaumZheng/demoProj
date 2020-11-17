## 笔记12
### 高阶组件HOC
##### 1. 定义：高阶组件是参数为组件，返回值为新组件的函数
代码实例：
```
import React, { Component } from 'react'
//HOC:是一个函数，接收一个组件，返回一个新组件
function Child(props) {
    return <div>child</div>
}
// Cmp这里是function或者class组件
// foo就是一个高阶组件，接收参数Cmp，返回一个函数组件
// 返回的函数组件接收参数props，返回jsx
const foo = Cmp => props => {
    return (
        <div className="border">
            <Cmp {...props} />
        </div>
    )
}
const Foo = foo(Child)
export default class HocPage extends Component {
    render() {
        return (
            <div>
               <Foo /> 
            </div>
        )
    }
}
```
##### 2. 链式调用：`const Foo = foo(foo(foo(Child)))`
##### 3. 装饰器
&emsp;&emsp;高阶组件本身是对装饰器模式的应用，自然可以利用ES7中出现的装饰器语法来更优雅的书写代码
1. 安装
   `npm install -D babel-plugin-import @babel/plugin-proposal-decorators`
2. 更新config-overrides.js,配置完需要重启
    ```
    const { addDecoratorsLegacy } = require('customize-cra')
    module.exports = override(
        ......
        addDecoratorsLegacy()  //配置装饰器
    )
    ```
    ##### config-overrides.js完整代码
    ```
    const {
        override,
        fixBabelImports,
        addDecoratorsLegacy
    } = require("customize-cra")
    module.exports = override(
        fixBabelImports("import", {
            //antd 按需加载
            libraryName: "antd",
            libraryDirectory: "es",
            style: "css"
        }),
        addDecoratorsLegacy()  //配置装饰器
    )
    ```
 3. 如果vscode对装饰器有warning，vscode设置里加上
`"javascript.implicitProjectConfig.experimentalDecorators":true`
 高阶组件装饰器的写法：
 ```
 import React, { Component } from 'react'
//HOC:是一个函数，接收一个组件，返回一个新组件
// Cmp这里是function或者class组件
const foo = Cmp => props => {
    return (
        <div className="border">
            <Cmp {...props} />
        </div>
    )
}
// Child组件被foo装饰两层
@foo
@foo
class Child extends Component {
    render() {
        return (
            <div>
                Child
            </div>
        )
    }
}
export default class HocPage extends Component {
    render() {
        return (
            <div>
               <Child />
            </div>
        )
    }
}
 ```
<font color=#FF0000 >
使用HOC的注意事项
&emsp;&emsp;高阶组件(HOC)是React中用于复用组件逻辑的一种高级技巧。HOC自身不是React API的一部分，它是一种基于React的组合特性而形成的设计模式
1.不要在render方法中使用HOC
&emsp;&emsp;React的diff算法使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。如果从render返回的组件与前一个渲染中的组件相同，则React通过将子树与新子树进行区分来递归更新子树。如果它们不相等，则完全卸载前一个子树。
子树每次渲染都会进行卸载和重新挂载的操作
&emsp;&emsp;除了性能外，重新挂载组件会导致该组件及其所有子组件的状态丢失
</font>