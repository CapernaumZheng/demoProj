```typescript
let a1: number;
let a2: string;
let a3: boolean;
// 联合类型
let a4: "male" | "female";  // a4只能是"male"或"female"
let a5: number | string;
let a6: any // 任意类型，可以赋值给任意类型   a2 = a6
let a7: unknown // 未知类型  不可以直接给其他赋值  a2 = a7;(报错)
if(typeof a7 === 'string') {
    a2 = a7;
}
// 类型断言
/**
 * as
 * <>
 */
a2 = a7 as string;
a2 = <string> a7;
// void 空值
function fn():void{
}
// 不返回值
function error(): never{
   throw new Error('报错了') // 报错程序结束，没有返回值
}
let a8: object;
let a9: {name: string};  // a9必须是一个对象，有只有一个name属性
let a10: {name: string, age?:number};  // a9必须是一个对象，必须有一个name属性,可选age属性，不能有其他属性
let a11: {name: string, [propName: string]:any} // a10必须有一个name属性，也可以有其他属性
let a12: Function;
let a13: (a:number,b:number) => number;  // a13函数有两个number类型的参数，返回number类型
// 数组声明
let a14:string[]  // 字符串数组
let a15:Array<number> // 数字数组 
// 元组,固定长度的数组
let a16:[string, string];
a16 = ['aaa','bbbb'];
// enum 枚举
enum Gender {
    Male = 0,
    Female = 1
}
let a17: {name: string, gender: Gender };
a17 = {
    name: "章三",
    gender: Gender.Male
}
// & 同时满足
let a18: {name: string} & {age: number}  // a18对象需要同时满足有name属性和age属性
a18 = {name:'章三',age:18}
// 类型别名
type myType = 1 | 2 | 3 | 'aaa'
let a19: myType;
```