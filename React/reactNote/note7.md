## 第7篇笔记
#### react-router
&emsp;&emsp;react-router包含3个库，react-router、react-router-dom和react-router-native。react-router提供最基本的路由功能，实际使用的时候我们不会直接安装react-router，而是根据应用运行环境选择安装react-router-dom(浏览器中使用)或react-router-native(在rn中使用)。react-router-dom和react-router-native都依赖react-router，所以在安装时，react-router也会自动安装。
`npm install react-router-dom --save`
&emsp;&emsp;react-router中奉行一切皆组件的思想，路由器-Router、链接-Link、路由-Route、独占-Switch、重定向-Redirect都以组件形式存在
Route渲染优先级：children>component>render
##### children: func
有时候，不管location是否匹配，你都需要渲染一些内容，这时候你可以用children
除了不管location是否匹配都会被渲染之外，其他工作方法与render完全一样
##### render: func
用render,调用的只是一个函数
只在当location匹配的时候渲染
#### component:component
只在当location匹配的时候渲染
代码实例：
###### App.js
```
import React from 'react'
import './App.css'
import RouterPage from './RouterPage'
function App() {
  return (
    <div>
      <RouterPage />
    </div>
  )
}
export default App;
```
##### RouterPage.js
```
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
export default class RouterPage extends Component {
    render() {
        return (
            <div>
                <h3>RouterPage</h3>
                <Router>
                    <Link to="/">首页</Link>
                    <Link to="/user">用户中心</Link>
                    <Switch>
                        {/* 添加Switch表示仅匹配一个 */}
                        {/* 根路由要添加exact，实现精准匹配 */}
                        <Route exact path="/" 
                            // 优先级children>component>render互斥
                            children={()=> <div>测试1</div>}
                            component={HomePage}
                            render={()=> <div>测试2</div>}
                            >
                        </Route>
                        <Route path="/user" component={UserPage}></Route>
                        <Route path="/test1" ></Route>
                        <Route component={EmptyPage} ></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}
export class HomePage extends Component {
    render() {
        return (
            <div>
                首页页面
            </div>
        )
    }
}
export class UserPage extends Component {
    render() {
        return (
            <div>
                用户页面
            </div>
        )
    }
}
export class EmptyPage extends Component {
    render() {
        return (
            <div>
                404页面
            </div>
        )
    }
}
```