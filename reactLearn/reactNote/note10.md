## 笔记10
### 自定义Hook与Hook使用规则
1. 自定义Hook
   组件之间重用一些状态逻辑，主流的两种解决方案：==高阶组件==和==render props==，自定义Hook可以不增加组件的情况下达到同样的目的
   ##### 自定义Hook是一个函数，其名称以“use”开头，函数内部可以调用其他Hook
   实例：抽取上篇文章定时器，用来公用
   ```
    import React, { useState, useEffect} from 'react'
    export default function HookPage(props) {
        // 定义一个叫count的state变量，初始化为0
        const [count, setCount] = useState(0)
        // 和didMount和didUpdate类似
        useEffect(() => {
            console.log('count改变 :>> ')
            // 只需要在count改变的时候执行
            document.title = `点击了${count}次`
        },[count])
        // 后一个参数是依赖项，依赖count改变
        // class组件中，清除定时器，willUnmount
        return (
            <div>
                <h3>HookPage</h3>
                <p>{count}</p>
                <button onClick={()=>setCount(count + 1)}>Add</button>
                <p>{useClock().toLocaleTimeString()}</p>
            </div>
        )
    }
    // 自定义一个hook，命名要以use开头，导出以复用
    export function useClock() {
        const [date, setDate] = useState(new Date())
        useEffect(() => {
            // timer只需要在didMount时候执行就可以了
            const timer = setInterval(() => {
                setDate(new Date())
            }, 1000)
            // 清除Effect
            return ()=> {clearInterval(timer)}
        }, [])
        return date
    }
   ```
2. Hook的使用规则
  * <font color=#FF0000 >只能在函数最外层调用Hook，不要在循环、条件判断或者子函数中调用</font> 
  * <font color=#FF0000 >只能在React的函数组件中调用Hook，不要在其他js函数中调用（还有自定义Hook可以调用Hook）</font> 