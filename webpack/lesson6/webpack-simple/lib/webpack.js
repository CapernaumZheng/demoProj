const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const { transformFromAst } = require('@babel/core')
module.exports = class webpack {
  constructor(options) {
    // console.log(options);
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = []
  }
  run () {
    // 递归转化每一个依赖文件的抽象语法树
    const info = this.parse(this.entry)
    // console.log(info);
    this.modules.push(info)
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item;
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.parse(dependencies[j]))
        }
      }
    }
    // 拼装转化好的js和js依赖信息为对象，作为参数，传入file方法，写文件
    const obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code
      }
    })
    // console.log(obj);
    this.file(obj)
  }
  parse (entryFile) {
    // 开始分析入口模块内容
    const content = fs.readFileSync(entryFile, "utf-8");
    // console.log(content);
    const ast = parser.parse(content, {
      sourceType: "module"
    })
    // 读取文件内容，使用@babel/parse解析为ast抽象语法树
    const dependencies = {}
    // 使用traverse遍历抽象语法树，提取分析依赖，获取依赖路径
    traverse(ast, {
      ImportDeclaration ({ node }) {
        const newPathName = "./" + path.join(path.dirname(entryFile), node.source.value)
        path.dirname(entryFile)
        dependencies[node.source.value] = newPathName;
      }
    });
    // 将抽象语法树，使用@babel/preset-env转为js代码
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
    });
    // console.log(code);
    return {
      entryFile,   // 文件相对于项目路径
      dependencies, // 依赖
      code          // 文件业务代码
    }
  }
  file (code) {
    // 创建自运行函数，处理require，module，exports
    // 生成main.js=>dist/main.js
    const filePath = path.join(this.output.path, this.output.filename)
    // console.log(filePath);
    const newCode = JSON.stringify(code)
    const bundle = `(function(graph){
      function require(module) {
        function reRequire(relativePath) {
          return require(graph[module].dependencies[relativePath]);
        };
        var exports = {};
        (function(require, exports, code){
          eval(code);
        })(reRequire, exports, graph[module].code);
        return exports;
      }
      require('${this.entry}');
    })(${newCode})`
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}