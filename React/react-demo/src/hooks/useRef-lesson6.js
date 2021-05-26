//  函数组件，生命周期
import React, { useState, useEffect, useRef } from 'react';
// 使用Ref记录上一次的状态
export default function Ref () {
  const [num, setNum] = useState(0);
  const prev = useRef(num);
  console.log('aa',prev.current)
  useEffect(()=> {
    console.log('副作用执行');  
    prev.current = num;
  })
  return (
      <div>
        <p>当前值：{num}</p>
        <p>上一次值：{prev.current}</p>
        <button onClick={()=>{
            setNum(num+1)
        }}>递增</button>
      </div>
  )
}