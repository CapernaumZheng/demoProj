## 笔记8
### PureComponent
1. 实现性能优化
实例：
```
import React, { Component } from 'react'
export default class PureComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    setCount = () => {
        this.setState({
            count: 100
        })
    }
    // 设置shouldComponentUpdate生命周期函数
    // 如果下次更新count不等于上次的count再继续render
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.count !== this.state.count
    }
    render() {
        // 每次setCount都会执行render，尽管count一直是100，没有更新
        console.log('render :>> ')
        const  { count } = this.state
        return (
            <div>
                <h3>PureComponent</h3>
                <button onClick={this.setCount}>{count}</button>
            </div>
        )
    }
}
```
2. 使用PureComponent实现(组件继承自PureComponent)
```
import React, { PureComponent } from 'react'
export default class PureComponentPage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    setCount = () => {
        this.setState({
            count: 100
        })
    }
    render() {
        console.log('render :>> ')
        const  { count } = this.state
        return (
            <div>
                <h3>PureComponent</h3>
                <button onClick={this.setCount}>{count}</button>
            </div>
        )
    }
}
```
<font color=#FF0000 >
注意点：
1. 必须使用class组件
2. 浅比较，只能比较1层，复杂对象就会一直render
   
</font>
##### 解释：
&emsp;&emsp;React.PureComponent与React.Component很相似，两者的区别在于React.Component未实现shouldComponentUpdate()，而React.PureComponent中以浅层对比prop和state的方式实现了该函数
&emsp;&emsp;如果赋予React组件相同的props和state，render()函数会渲染相同的内容，那么在某些情况下使用React.PureComponent会提高性能