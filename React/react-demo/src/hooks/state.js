// import React, { Component } from 'react'

// 类组件
// export default class State extends Component {
//   state = {
//     name: "leo",
//     age: 18
//   }
//   setAge=()=>{
//     let {age} = this.state;
//     this.setState({
//       age: ++age
//     })
//   }
//   render() {
//     let {name, age} = this.state;
//     return (
//       <div>
//         姓名:{name}<br/>
//         年龄:{age} <br/>
//         <button onClick={this.setAge}>长大一岁</button>
//       </div>
//     )
//   }
// }

import React, { useState } from 'react';

//  函数组件，使用Hook
export default function State () {
  // console.log(useState(18));
  const [state, setState] = useState({
    name: "leo",
    age:  18
  })
  // 建议姓名，年龄维护两个state
  let {age, name} = state;
  return (
    <div>
      姓名:{name}<br />
        年龄:{age}<br />
      <button onClick={() => {
        setState({
          ...state, // 需要自己合并state
          age: age + 1
        })
      }}>长大一岁</button>
    </div>
  )
}

