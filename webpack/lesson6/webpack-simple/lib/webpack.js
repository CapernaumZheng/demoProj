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
   const info = this.parse(this.entry)
   // console.log(info);
   this.modules.push(info)
   for (let i = 0; i < this.modules.length; i++) {
     const item = this.modules[i];
     const { dependencies } = item;
     if(dependencies) {
       for (let j in dependencies) {
        this.modules.push(this.parse(dependencies[j]))
       }
     }
   }
   console.log(this.modules);
  }
  parse (entryFile) {
    // 开始分析入口模块内容
    const content = fs.readFileSync(entryFile, "utf-8");
    // console.log(content);
    const ast = parser.parse(content, {
      sourceType: "module"
    })
    const dependencies = {}
    traverse(ast, {
      ImportDeclaration ({ node }) {
        const newPathName = "./" + path.join(path.dirname(entryFile), node.source.value).replace('\\', '\/')
        path.dirname(entryFile)
        dependencies[node.source.value] = newPathName;
      }
    });
    const {code} = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
    });

   // console.log(code);

    return {
      entryFile,
      dependencies,
      code
    }
   
  }
}