### 1. 创建react项目
`npx create-react-app 项目名`
### 2. 引入react、引入react-dom
```
import React from 'react'
import ReactDOM from 'react-dom'
```

##### 解释

1. render方法返回了一个React元素，也就是JSX语法书写的对渲染内容的描述，其中，html标签会被编译成React.createElement('标签')
2. JSX中可以使用js表达式，js表达式使用{}括起来,每一个React元素事实上是一个js对象

------

### 3. 组件传递参数
##### 3.1 怎样写一个组件
```
class Test extends React.Component {
    render() {
        return (
            <div>我是一个组件</div>
        )
    }
}
```
##### 3.2 如何传递参数？(父组件向子组件传递参数)
```
<Test value="传递的值"/>

class Test extends React.Component {
    render() {
        return (
            <div>
                <div>我是一个组件</div>
                <div>传递给我的参数是:{ this.porps.value }</div>
            </div<>
        )
    }
}
```
##### 3.3 JSX标签上如何写class和点击事件

```
// className ==> class
class Test extends React.Component {
    render() {
        return (
            <div>
                <div className="c-title">我是一个组件</div>
            </div>
        )
    }
}
```

```
class Test extends React.Component {
    render() {
        return (
            <div>
                <button onClick={function() { alert('测试按钮点击') }}>点我</button>
            </div>
        )
    }
}
```

------

### 4. state的使用

##### 4.1 初始化state
在React组件的==构造函数==中设置`this.state`来初始化state，`this.state`视为一个组件的私有属性

```
class Test extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: null
        }
     }

    render() {
        return (
            <div>
                <div>我是一个组件</div>
            </div>
        )
    }
}
```

<font color=#FF0000>注意：在js中，每次你定义其子类的构造函数时，都需要调用super方法。因此，在所有含有构造函数的React组件中，构造函数必须以super(props)开头</font>


##### 4.2 设置state的值

```
class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: null
        }
    }
    render() {
        return (
            <div>
                <div>设置的值是:{this.state.value}</div>
                <button onClick={()=> {this.setState({value:'zack'})}>设置成zack</button>
            </div>
        )
    }
}
```

------

### 5. 状态提升

##### 5.1 何时要状态提升

当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的state数据提升至其共同的父组件当中保存。之后父组件可以通过props将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了

##### 5.2 子组件修改父组件的state(A组件修改B组件的state)

向子组件传入一个方法A，父组件定义方法A，子组件通过调用方法A修改父组件中的state

```
  class Father extends React.Component {
      constructor(props) {
          super(props)
          this.state = {
              // 父组件state声明一个数组list
              list: Array(5).fill(null)
          }
      }

      handleClick(i) {
          // 这里相当于A方法
          const newList = this.state.list.slice()
          newList[i] = newList[i] == '新' ? '旧' : '新'
          this.setState({ list: newList})
      }

      render() {
          return (
              <div>
                  {/* 放4个son组件 */}
                  <Son 
                    status={this.state.list[0]} 
                    onClick={() => {
                        this.handleClick(0)
                    }} 
                  />
                  <Son 
                    status={this.state.list[1]} 
                    onClick={() => {
                        this.handleClick(1)
                    }} 
                  />
                  <Son 
                    status={this.state.list[2]} 
                    onClick={() => {
                        this.handleClick(2)
                    }} 
                  />
                  <Son 
                    status={this.state.list[3]} 
                    onClick={() => {
                        this.handleClick(3)
                    }} 
                  />
                  <Son 
                    status={this.state.list[4]} 
                    onClick={() => {
                        this.handleClick(4)
                    }} 
                  />
              </div>
          )
      }
  }


  class Son extends React.Component {
      // 传过来了status和onClick
      // 通过onClick来更新父组件的state中的list
      render() {
          return (
              <div>
                  <div>
                    现在的状态：{this.props.status}
                  </div>
                  <button onClick={() => this.props.onClick()}>
                    点击更新状态
                  </button>
              </div>
          )
      }
  }
```

<font color=#FF0000>注意： </font>
<font color=#FF0000>
1. 为了可读性，把返回的React元素拆分为多行，同时外层加小括号  
2. state的数据不能直接修改
3. 传给子组件的onClick可以起任意的名字
4. 在 React 中，有一个命名规范，通常会将代表事件的监听 prop 命名为 on[Event]，将处理事件的监听方法命名为 handle[Event] 这样的格式。 
</font>


### 6. 函数组件
组件只包含render方法，不包含state，使用函数组件更简单
```
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}