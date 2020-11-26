## 笔记13
### 表单组件的设计与实现 （类似Antd3.x版本）
1. #### MyFormPage.js
   
```
import React, { Component } from 'react'
import kFormCreate from './components/kFormCreate'
const nameRules = { required: true, message: '请输入姓名' }
const passwordRules = { required: true, message: '请输入密码' }
@kFormCreate
class MyFormPage extends Component {
    submit = () => {
        console.log('提交')
        const { getFieldsValue, getFieldValue, validateFields } = this.props
        console.log('getFieldsValue:>>', getFieldsValue())
        console.log('getFieldValue:>>', getFieldValue('password'))
        validateFields((err, values) => {
            if(err) {
                console.log('err', err)
            } else {
                console.log('success', values)
            }
        })
    }
    render() {
        console.log('props :>> ', this.props)
        const { getFieldDecorator } = this.props
        return (
            <div>
                <h3>表单组件实现</h3>
                {getFieldDecorator('name', {rules: [nameRules]})(
                    <input type="text" placeholder="请输入姓名" />
                )}
                {getFieldDecorator('password', {rules: [passwordRules]})(
                    <input type="password" placeholder="请输入密码"/>
                )}
                <button onClick={this.submit}>提交</button>
            </div>
        )
    }
}
export default MyFormPage
```
2. #### kFormCreate.js
```
import React, { Component } from 'react'
export default function kFormCreate(Cmp) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.options = {}
        }
        handleChange = (e) => {
            // setState name value
            let { name, value } = e.target
            this.setState({[name]:value})
        }
        getFieldDecorator = (field, option) => {
            this.options[field] = option
            return InputCmp => {
                // 克隆一份
                return React.cloneElement(InputCmp, {
                    name: field,
                    value: this.state[field] || '',
                    onChange: this.handleChange
                })
            }
        }
        getFieldsValue = () => {
            return {...this.state}
        }
        getFieldValue = (field) => {
            return this.state[field]
        }
        validateFields = callback => {
            // 校验错误信息
            const errors = {}
            const state = {...this.state}
            for(let name in this.options) {
                if(this.state[name] === undefined) {
                    // 没有输入，判断为不合法
                    errors[name] = 'error'
                }
            }
            if(JSON.stringify(errors) === '{}') {
                // 合法
                callback(undefined, state)
            }else{
                callback(errors, state)
            }
        }
        render() {
            return (
                <div className="border">
                    <Cmp 
                        getFieldDecorator={this.getFieldDecorator} 
                        getFieldsValue={this.getFieldsValue}
                        getFieldValue={this.getFieldValue}
                        validateFields={this.validateFields}
                    />
                </div>
            )
        }
    }
}
```
#### 表单组件的设计思路
+ 表单组件要求实现==数据收集==、==校验==、==提交==等特性，可通过高阶组件扩展
+ 高阶组件给表单组件传递一个input组件==包装函数==接管其输入事件并统一管理表单数据
+ 高阶组件给表单组件传递一个==校验函数==使其具备数据校验的工能