## 第6篇笔记
#### react-redux
安装
`npm install react-redux --save`
使用react-redux
1. Provider为后代组件提供store
2. connect为组件提供数据和变更方法
实例代码：
##### index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/'
import { Provider } from 'react-redux'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
```
##### ReactReduxPage.js
```
import React, { Component } from 'react'
import { connect } from 'react-redux'
export default connect(
    // mapStateToProps  把state映射到props
    state=>({num: state}),
    // mapDispatchToProps 把dispatch映射到props
    {
        add: ()=> ({type: 'ADD'})
    }
)(
    class ReactReduxPage extends Component {
        render() {
            const {num, dispatch, add} = this.props
            console.log('props', this.props)
            return (
                <div>
                    <h3>React Redux Page</h3>
                    <p>{num}</p>
                    {/* <button onClick={()=> dispatch({type: 'ADD'})}>ADD</button> */}
                    <button onClick={add}>add</button>
                </div>
            )
        }
})
```
##### store=>index.js
```
import { createStore } from 'redux'
// 定义state初始化和修改规则,reducer是一个纯函数
function counterReducer(state=0, action) {
    switch(action.type) {
        case "ADD":
            return state += 1
        case "MINUs":
            return state -= 1
        default:
            return state
    }
}
const store = createStore(counterReducer)
export default store
```