
import axios from 'axios'
export const $getJson = (url) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      dataType: "json",
      crossDomain: true,
      cache: false
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 
 * @param {Object or Array} data 待拷贝的数据
 * @returns 拷贝后的数据
 */
export const copy = (data) => JSON.parse(JSON.stringify(data))

/**
 * 功能：判断nodeId节点是否是根节点
 * @param {String} nodeId 节点id
 * @param {Array} treeList 树渲染数据
 * @returns {Boolean} 如果节点是根节点，返回true，否则返回false
 */
export const isRootNode = (nodeId, treeList) => {
  typeof(nodeId)=='string' || (nodeId = nodeId.toString());
  if(!Array.isArray(treeList)) throw new Error('树渲染数据必须是数组');
  return treeList.findIndex(item => item.id === nodeId) !== -1
}

/**
 * 功能：获取树（页面）的所有待配置权限
 * @param {Array} treeList 树渲染数据
 * @param {Array} accessList 所有权限列表
 * @returns {Array} 返回accessList所有权限列表
 */
export const getAllPagesAccess = (treeList, accessList = [], parentIds = []) => {
  if(!Array.isArray(treeList)) throw new Error('树渲染数据必须是数组');
  treeList.forEach((item, idx) => {
    if(item.children) {
      parentIds.unshift(item.id)
      getAllPagesAccess(item.children, accessList, parentIds)
    } else {
      accessList.push({...item, parentIds: copy(parentIds)})
    }
    if(idx === treeList.length - 1) {
      parentIds.length > 0  && parentIds.splice(0,1)
    }
  })
  return accessList
}

// total read part none
/**
 * 功能：根节点状态更新，根据根节点id，更新子节点
 * @param {VueComponent} vNode vue实例
 * @param {String} nodeId 根节点id
 */
export function updateAccessByRootNode(vNode, nodeId){
  let updateType = vNode['treeSelectData'][nodeId];  // total/read/part/none
  if(updateType === 'total') {  // 根节点选了【完全】，所有的子节点设置为【完全】，所有的权限设置勾选
    vNode['treeAccessData'].forEach(item => {
      let [rootId] = [...item['parentIds']].reverse();
      let parentIds = copy([...item['parentIds']].reverse());
      parentIds.splice(0, 1);
      if(rootId === nodeId) {
        vNode['treeSelectData'][item.id] = '';
        vNode.$set(vNode['treeSelectData'], item.id, item.id);
        parentIds.forEach(parentId => {
          vNode['treeSelectData'][parentId] = '';
          vNode.$set(vNode['treeSelectData'], parentId, 'total');
        })
      }
    })
  }
}

