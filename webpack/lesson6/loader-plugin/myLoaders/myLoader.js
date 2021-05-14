module.exports = function(source,sourceMap,ast) {
  // loader处理模块
  // 多个loader是有顺序的
  // 一定要有返回值
  // console.log(this, this.query, source)
  const result = source.replace('你好',this.query.name)
  // console.log(result)
  // return result
  // this.callback //可以返回多个信息
  this.callback(null, result)
  // // 异步处理
  // const callback = this.async()
  // setTimeout(() => {
  //     const result = source.replace('你好',this.query.name)
  //     callback(null, result)
  // }, 3000)
  
}