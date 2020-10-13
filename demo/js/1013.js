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

function getID(json, id) {
  var o = {}
  json.forEach(function (item) {
    if (item.id == id) {
      o = item
      // return item
    } else if (item.goods && item.goods.length > 0) {
      getID(item.goods, id)
    }
  })
  return o
}

console.log('object :>> ', getID(data, 1))
console.log('object :>> ', getID(data, 2))
console.log('object :>> ', getID(data, 11))
console.log('object :>> ', getID(data, 12))
