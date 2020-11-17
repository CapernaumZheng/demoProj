## 笔记9
### Hook
1. 啥是Hook
    &emsp;&emsp;Hook是一个特殊函数，它可以让你“钩入”React的特性。例如，useState是允许你在React函数组件中添加state的Hook
    <br/>
2. 啥时候用Hook
   &emsp;&emsp;如果你在编写函数组件并意识到需要向其添加一些state，以前的做法是必须将其转化为class，现在你可以在现有函数组件中使用Hook   
代码实例：
```
import React, { useState, useEffect} from 'react'
export default function HookPage(props) {
    // 定义一个叫count的state变量，初始化为0
    const [count, setCount] = useState(0)
    return (
        <div>
            <h3>HookPage</h3>
            <p>{count}</p>
            <button onClick={()=>setCount(count + 1)}>Add</button>
        </div>
    )
}
```
3. 啥是Effect Hook
   Effect Hook可以让你在函数组件中执行副作用操作
   数据获取，设置订阅以及手动更改React组件中的DOM都属于副作用。
    <br>
   实例代码：
```
import React, { useState, useEffect} from 'react'
export default function HookPage(props) {
    // 定义一个叫count的state变量，初始化为0
    const [count, setCount] = useState(0)
    // 和didMount和didUpdate类似
    useEffect(() => {
        document.title = `点击了${count}次`
    })
    return (
        <div>
            <h3>HookPage</h3>
            <p>{count}</p>
            <button onClick={()=>setCount(count + 1)}>Add</button>
        </div>
    )
}
```
4. effect的条件执行
```
import React, { useState, useEffect} from 'react'
export default function HookPage(props) {
    // 定义一个叫count的state变量，初始化为0
    const [count, setCount] = useState(0)
    const [date, setDate] = useState(new Date())
    // 和didMount和didUpdate类似
    useEffect(() => {
        console.log('count改变 :>> ')
        // 只需要在count改变的时候执行
        document.title = `点击了${count}次`
    },[count])
    // 后一个参数是依赖项，依赖count改变
    useEffect(() => {
        // timer只需要在didMount时候执行就可以了
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000)
    }, [])
    return (
        <div>
            <h3>HookPage</h3>
            <p>{count}</p>
            <button onClick={()=>setCount(count + 1)}>Add</button>
            <p>{date.toLocaleTimeString()}</p>
        </div>
    )
}
```
5. 清除effect
   通常，组件卸载时需要清除effect创建的诸如订阅或计时器ID等资源。要实现这一点，useEffect函数需返回一个清除函数，以防止内存泄漏，清除函数会在组件卸载前执行
```
import React, { useState, useEffect} from 'react'
export default function HookPage(props) {
    // 定义一个叫count的state变量，初始化为0
    const [count, setCount] = useState(0)
    const [date, setDate] = useState(new Date())
    // 和didMount和didUpdate类似
    useEffect(() => {
        console.log('count改变 :>> ')
        // 只需要在count改变的时候执行
        document.title = `点击了${count}次`
    },[count])
    // 后一个参数是依赖项，依赖count改变
    useEffect(() => {
        // timer只需要在didMount时候执行就可以了
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000)
        // 清除Effect
        return ()=> {clearInterval(timer)}
    }, [])
    // class组件中，清除定时器，willUnmount
    return (
        <div>
            <h3>HookPage</h3>
            <p>{count}</p>
            <button onClick={()=>setCount(count + 1)}>Add</button>
            <p>{date.toLocaleTimeString()}</p>
        </div>
    )
}
```