import React, { Component, createContext, useContext } from 'react';
// context跨层级传递信息

// let {Provider,Consumer} = createContext();
let myContext = createContext();

class Child extends Component {
  static contextType = myContext;
  render () {
    return (
      <div>
        <strong>我是子组件</strong>
        <p>父组件信息：{this.context.info}</p>
      </div>
    )
  }
}

function Child2 () {
  const context = useContext(myContext);
  return (
    <div>
      <strong>我是函数组件</strong>
      {/* <myContext.Consumer>
        {(context)=>{
          return  (<p>父组件信息：{context.info}</p>)
        }}
      </myContext.Consumer> */}
      <p>父组件信息：{context.info}</p>
    </div>
  )
}

// class Child extends Component {
//   render(){
//     return (
//       <div>
//         <strong>我是子组件</strong>
//         <myContext.Consumer>
//           {(context)=> {
//             return (<p>父组件信息：{context.info}</p>)
//           }}
//         </myContext.Consumer>
//       </div>
//     )
//   }
// }

class Parent extends Component {
  render () {
    return (
      <div>
        <Child />
        <Child2 />
      </div>
    )
  }
}


export default class Context extends Component {
  render () {
    return (
      <div>
        <myContext.Provider value={{ info: "我是祖先" }}>
          <Parent />
        </myContext.Provider>
      </div>
    )
  }
}