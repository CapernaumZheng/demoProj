// 递归求斐波那契数列
// 1,1,2,3,5,8,13,21......
// 用户输入一个数字 n，就可以求出这个数字对应的序列值

function fb(n) {
  if (n === 1 || n === 2) {
    return 1
  }
  return fb(n - 1) + fb(n - 2)
}

//////////////////////////////////////////////////////////////////

// 递归求：根据id返回对应的数据对象
var data = [
  {
    id: 1,
    name: '家电',
    goods: [
      {
        id: 11,
        gname: '冰箱',
      },
      {
        id: 12,
        gname: '洗衣机',
      },
    ],
  },
  {
    id: 2,
    name: '服饰',
  },
]

// 输入id号，就可以返回数据对象
// 1.利用 forEach 去遍历每一个对象

function getID(json, id) {
  var o = {}
  json.forEach(function (item) {
    if (item.id == id) {
      o = item
      return item
    } else if (item.goods && item.goods.length > 0) {
      o = getID(item.goods, id)
    }
  })
  return o
}
console.log('getID :>> ', getID(data, 1))
