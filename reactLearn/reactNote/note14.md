## 笔记14
### 弹窗类组件的设计与实现
#### 1. DialogPage.js
```
import React, { Component } from 'react'
import Dialog from './components/Dialog'
export default class DialogPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDialog: false
        }
    }
    render() {
        const { showDialog } = this.state
        return (
            <div>
                <h3>弹窗页面</h3>
                <button onClick={() => {
                    this.setState({
                        showDialog: !showDialog
                    })
                }}>{showDialog?'隐藏':'显示'}</button>
                {   showDialog && 
                    <Dialog>
                        <p>我是一段文本</p>
                    </Dialog>
                }
            </div>
        )
    }
}
```
#### 2. Dialog.js
```
import React, { Component } from 'react'
// 传送门
import { createPortal } from 'react-dom'
export default class Dialog extends Component {
    constructor(props) {
        super(props)
        const doc = window.document
        this.node = doc.createElement('div')
        doc.body.appendChild(this.node)
    }
    componentWillUnmount() {
        // 卸载组件的时候，移除append的div标签
        window.document.body.removeChild(this.node)
    }
    render() {
        return createPortal(
            <div className="dialog">
                <h3>弹窗组件</h3>
                {this.props.children}
            </div>,
            this.node
        )
    }
}
```