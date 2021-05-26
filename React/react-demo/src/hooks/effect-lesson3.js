// 类组件的生命周期
// import React, { Component, useState, useEffect } from 'react'
// class Txt extends Component {
//   componentWillUnmount() {
//     console.log("组件即将卸载");
//   }
//   render(){
//     let {text,setEdit} = this.props;
//     return (
//       <div>{text}<a onClick={()=>{
//         setEdit(true)
//       }}>编辑</a></div>
//     )
//   }
// }

// // 类组件
// export default class State extends Component {
//   state = {
//     text: "这是今天的课程",
//     edit: false
//   }
//   setEditState = (edit)=> {
//     this.setState({
//       edit
//     })
//   }
//   componentDidMount() {
//     console.log("组件挂载完毕");
//   }
//   componentDidUpdate() {
//     console.log("组件更新完毕");
//   }
//   render() {
//     let {text, edit} = this.state;
//     return (
//       <div>
//         {edit ? 
//           <input type="text" 
//           value={text}
//           onChange={
//             (e) => {
//               this.setState({
//                 text: e.target.value
//               })
//             }
//           }
//           onBlur={
//             (e)=> {
//               this.setEditState(false)
//             }
//           }
//           />
//           :
//           <Txt text={text} setEdit={this.setEditState}/>
//           }
//       </div>
//     )
//   }
// }





//  函数组件，生命周期
import React, { Component, useState, useEffect } from 'react';
function Txt(props) {
  let {text, setEdit} = props;
  useEffect(()=> {
    console.log("Txt组件状态有变化了");
    return () => {
      console.log("组件卸载？？？");
    }
  })
  return (
      <div>{text}<a onClick={()=>{
        setEdit(true)
      }}>编辑</a></div>
  )
}
export default function Effect () {
  const [text, setText] = useState("这是今天的课程");
  const [edit, setEdit] = useState(false);
  useEffect(()=>{
    console.log("状态有改变");
  })
  return (
      <div>
        {edit ? 
          <input type="text" 
          value={text}
          onChange={
            (e) => {
              setText(e.target.value)
            }
          }
          onBlur={
            (e)=> {
              setEdit(false)
            }
          }
          />
          :
          <Txt text={text} setEdit={setEdit}/>
          }
      </div>
  )
}

