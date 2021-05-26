//  函数组件，生命周期
import React, { useState, useEffect, useRef } from 'react';
function Txt(props) {
  let {text, setEdit} = props;
  return (
      <div>{text}<a onClick={()=>{
        setEdit(true)
      }}>编辑</a></div>
  )
}
function Edit(props) {
  let {text,setText,setEdit} = props;
  let t = useRef(null);  
  // 组件挂载之后执行
  function toScroll() {
    let y = window.scrollY;
    console.log(t);
    t.current.style.transform = `translateY(${y}px)`
  }
  useEffect(()=>{
    window.addEventListener("scroll",toScroll);
    t.current.select();
    return () => {
      // 需要清除的副作用
      console.log("组件卸载之后");
      window.removeEventListener
      ("scroll", toScroll)
    }
  },[])
  return <input ref={t} type="text" value={text}
  onChange={
    (e) => {
      setText(e.target.value)
    }
  }
  onBlur={
    (e)=> {
      setEdit(false)
    }
  }/>
}
export default function Ref () {
  const [text, setText] = useState("这是今天的课程");
  const [edit, setEdit] = useState(false);
  // 只监听edit发生改变
  useEffect(()=> {
    console.log("组件更新了");
  },[edit])
  return (
      <div>
        {edit ? 
          <Edit text={text} setText={setText} setEdit={setEdit}/>
          :
          <Txt text={text} setEdit={setEdit}/>
          }
          {[...(".".repeat(100))].map((item, idx)=> {
            return <div key={idx}>页面内容</div>
          })}
      </div>
  )
}