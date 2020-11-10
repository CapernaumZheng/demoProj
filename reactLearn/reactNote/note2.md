## 第2篇笔记
##### 1. 暴露create-react-app创建项目的配置
`npm run eject`
##### 2. 依赖解释
```
// React 负责逻辑控制，数据 => VDOM
import React from 'react';
// ReactDom渲染实例DOM，VDOM => DOM
import ReactDOM from 'react-dom';
```
##### 3. jsx讲解
1. 基本使用 表达式用{}包裹
2. 函数
   `{调用函数}`
3. jsx对象
`const jsxObj = <div>good</div>`
4. 条件语句
    `{show ? '显示':'不显示'}`
5. 数组
   ```
   const arr = [0,1,2,3]
   // diff时候，首先比较type，然后是key，所以同级同类型元素，key值必须要唯一
    <ul>
    {
        a.map((item)=> <li key={item}>{item}</li>)
    }  
    </ul>
   ```   
6. 属性
   ```
   import logo from './logo192.png'
   <img src={logo} className="logo" style={{width:'50px',height: '30px'}}>
   ```    
7. 模块
   `import logo from './logo192.png'`

##### 4. React组件
&emsp;&emsp; 组件
&emsp;&emsp; 组件，从概念上类似于js函数。它接收任意的入参（即props），并返回用于描述页面展示内容的React元素。组件有两种形式：==class组件==和==function组件==
##### Class组件
class组件通常拥有状态和生命周期，继承于Component，实现render方法
实例：
```
import React, { Component } from 'react'
export default class TestComponent extends Component {
    constructor(props) {
        super(props)
        // 存储状态
        this.state = {
            date: new Date()
        }
    }
    // 组件挂载完成之后执行
    componentDidMount() {
        this.timer = setInterval(() => {
            // 更新state
            this.setState({
                date: new Date()
            })
        }, 1000)
    }
    // 组件卸载之前执行
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        const { date } = this.state
        return (
            <div>
                <h3>{date.toLocaleTimeString()}</h3>
            </div>
        )
    }
}
import TestComponent from './testComponent'
<TestComponent />
```
##### Function组件
没有props，简单的渲染组件
```
import React, { useState, useEffect } from 'react'
export function TestComponent(props) {
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        // 相当于componentDidMount、componentWillUnmount的集合
        // 不写依赖项，相当于componentDidUpdate
        console.log('useEffect :>> ')
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])
    // []依赖项，谁改变了，重新执行
    return (
        <div>
            <h3>{date.toLocaleTimeString()}</h3>
        </div>
    )
} 
```
----
##### 5. setState
`setState(partialState, callback)`
1. partialState: Object | Function
   用于产生与当前state合并的子集
2. callback: function
   state更新之后被调用
   
<font color=#FF0000 >setState注意点：</font> 
1. 不要直接修改State，而是应该使用setState()
2. State的更新可能是异步的
3. setState更新回合并（后面的覆盖前面的）
#### 异步
```
import React, { Component } from 'react'
export default class SetStatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }
    componentDidMount() {
        this.changeValue(1)
    }
    changeValue = (v) => {
        // setState在合成事件和声明周期里中是异步的，这里说的异步是批量更新
        // 达到优化性能的目的
        this.setState({
            counter: this.state.counter + v
        })
        // 这里拿不到最新更新的counter，因为异步
        console.log('counter :>> ', this.state.counter)
    }
    setCounter = () => {
        this.changeValue(1)
    }
    render() {
        return (
            <div>
                <h3>SetStatePage</h3>
                <button 
                    onClick={this.setCounter}>
                    {this.state.counter}
                </button>
            </div>
        )
    }
}
```
#### 同步1
setState在setTimeout中是同步的
```
import React, { Component } from 'react'
export default class SetStatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }
    changeValue = (v) => {
        this.setState({
            counter: this.state.counter + v
        })
        // 同步的，在setTimeout
        console.log('counter :>> ', this.state.counter)
    }
    setCounter = () => {
        // setState在setTimeout中是同步的
        setTimeout(() => {
            this.changeValue(1)
        }, 0)
    }
    render() {
        return (
            <div>
                <h3>SetStatePage</h3>
                <button 
                    onClick={this.setCounter}>
                    {this.state.counter}
                </button>
            </div>
        )
    }
}
```
#### 同步2   
setState在原生事件中是同步的
```
import React, { Component } from 'react'
export default class SetStatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }
    componentDidMount() {
       document.getElementById('test').addEventListener('click', this.setCounter)
    }
    changeValue = (v) => {
        // setState在原生事件中是同步的
        this.setState({
            counter: this.state.counter + v
        })
        console.log('counter :>> ', this.state.counter)
    }
    setCounter = () => {
        this.changeValue(1)
    }
    render() {
        return (
            <div>
                <h3>SetStatePage</h3>
                <button id="test">{this.state.counter}</button>
            </div>
        )
    }
}
```
#### 同步3  
setState更新后回调
```
import React, { Component } from 'react'
export default class SetStatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }
    changeValue = (v) => {
        // setState更新后回调打印
        this.setState({
            counter: this.state.counter + v
        }, () => {
            console.log('counter :>> ', this.state.counter)
        })
    }
    setCounter = () => {
        this.changeValue(1)
    }
    render() {
        return (
            <div>
                <h3>SetStatePage</h3>
                <button 
                    onClick={this.setCounter}>
                    {this.state.counter}
                </button>
            </div>
        )
    }
}
```
#### setState的链式调用
```
import React, { Component } from 'react'
export default class SetStatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }
    changeValue = (v) => {
        this.setState((state) => {
            return {
                counter: state.counter + v
            }
        }, () => {
            console.log('counter :>> ', this.state.counter)
        })
    }
    setCounter = () => {
        // 普通的setState  后面的覆盖前面的
        // 使用setState第一个参数使用函数，实现链式调用
        this.changeValue(1)
        this.changeValue(2)
    }
    render() {
        return (
            <div>
                <h3>SetStatePage</h3>
                <button 
                    onClick={this.setCounter}>
                    {this.state.counter}
                </button>
            </div>
        )
    }
}
```