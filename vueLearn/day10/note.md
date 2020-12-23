### 手写Vue
#### 涉及类型介绍
+ kVue： 框架构造函数
+ Observer：执行数据响应化（分辨数据是对象还是数组）
+ Compile：编译模板、初始化视图，收集依赖（更新函数，watcher创建）
+ Watcher：执行更新函数（更新dom）
+ Dep：管理多个Watcher，批量更新
#### 实现思路
1. defineReactive时为每一个key创建一个Dep实例
2. 初始化视图时读取某个key，例如name1，创建一个watcher1
3. 由于触发name1的getter方法，便将watcher1添加到name1对应的Dep中
4. 当name1更新，setter触发时，便可通过对应Dep通知其管理所有Watcher更新
```
源代码在handVue文件夹下
```