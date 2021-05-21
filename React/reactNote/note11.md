## 笔记11
### Hook API之useMemo与useCallback
#### 1. useMemo
把“创建”函数和依赖项数组作为参数传入useMemo，它仅会在某个依赖项改变时才重新计算memoized值。这种优化有助于避免在每次渲染时都进行高开销的计算
代码实例：
```
import React, { useState, useEffect, useMemo } from 'react'
export default function LearnMemoDemo(props) {
    const [count, setCount] = useState(0)
    const [value, setValue] = useState('')
    // 当前的计算只和count有关
    const expensive = useMemo(() => {
        console.log('compute')
        let sum = 0
        for(let i=0;i<count;i++) {
            sum+=i
        }
        return sum
        // 只有count改变的时候，当前函数才会重新执行
    }, [count])
    return (
        <div>
            <h3>LearnMemoDemo</h3>
            <p>count: {count}</p>
            <p>expensive: {expensive}</p>
            <button onClick={()=> setCount(count + 1)}>Add</button>
            <input value={value} onChange={(event)=>setValue(event.target.value)}/>
        </div>
    )
}
```
#### 2. useCallback
把内联回调函数及依赖项数组作为参数传入useCallback，它将返回该回调函数的memoized版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如shouldComponentUpdate）的子组件时，将非常有用
实例：
```
import React, { Component, useState, useEffect, useCallback, PureComponent} from 'react'
export default function UseCallbackPage() {
    const [count, setCount] = useState(0)
    const [value, setValue] = useState('')
    const addClick = useCallback(() => {
        console.log('compute')
        let sum = 0
        for(let i=0;i<count;i++) {
            sum+=i
        }
        return sum
    },[count])
    return (
        <div>
            <h3>UseCallbackPage</h3>
            <h3>LearnMemoDemo</h3>
            <p>count: {count}</p>
            <button onClick={()=> setCount(count + 1)}>Add</button>
            <input value={value} onChange={(event)=>setValue(event.target.value)}/>
            <Child addClick={addClick}/>
        </div>
    )
}
export class Child extends PureComponent {
    render() {
        const { addClick } = this.props
        console.log('child render')
        return (
            <div>
                <h3>render</h3>
                <button onClick={console.log(addClick())}>Add</button>
            </div>
        )
    }
}
```