module.exports = function(source,sourceMap,ast) {
  const result = source.replace('zack','zxy')
  console.log(result)
  this.callback(null, result)
}