const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

// 同步读取
// const data = fs.readFileSync('./conf.js')
// console.log('data',data.toString())


// 异步读取
// fs.readFile('./conf.js', (err, data) => {
//   if(err) throw err
//   console.log(data.toString())
// })

process.nextTick(async () => {
  const data = await readFile('./conf.js')
  console.log(data.toString())
})