## 第4篇笔记
#### 组件复合
顶部栏，底部栏布局实例：
Layout.js
```
import React, { Component } from 'react'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
export default class Layout extends Component {
    componentDidMount() {
        const { title='首页' } = this.props
        document.title = title
    }
    render() {
        const {children, showTopBar, showBottomBar} = this.props
        console.log('children :>> ', children);
        return (
            <div>
               { showTopBar && <TopBar /> } 
                    {/* {this.props.children} */}
                    { children.content }
                    { children.txt }
                   <button onClick={children.btnClick}>
                        Layout按钮
                   </button> 
               {showBottomBar && <BottomBar />}
            </div>
        )
    }
}
```
##### App.js
```
import React from 'react';
import './App.css';
import Layout from './Layout';
function App() {
  return (
    <Layout showTopBar={ false } 
            showBottomBar={ true }
            title="主页"
    >
      {/* <div className="App">
        主页
      </div> */}
      {/* {传递一个对象，对象里可以是jsx，可以是事件} */}
      {
        {
          content: (
            <div className="App">
              主页
            </div>
          ),
          txt: '这里是一段文字文本',
          btnClick: () => {
            console.log('button click!!')
          }
        }
      }
    </Layout>
  );
}
export default App;
```
##### BottomBar.js
```
import React, { Component } from 'react';
class BottomBar extends Component {
    render() {
        return (
            <div>
               <div style={{ 
                        textAlign:'center',       background: '#ccc',
                        color: '#fff'
                    }}>
                   底部栏
               </div> 
            </div>
        );
    }
}
export default BottomBar;
```
##### TopBar.js
```
import React, { Component } from 'react';
class TopBar extends Component {
    render() {
        return (
            <div>
                <div style={{ 
                        textAlign:'center',       background: '#ccc',
                        color: '#fff'
                    }}>
                    顶部栏
                </div>
            </div>
        );
    }
}
export default TopBar;
```