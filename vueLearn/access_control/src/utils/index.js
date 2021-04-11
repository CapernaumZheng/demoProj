
import axios from 'axios'
export const $getJson = (url, params={}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      transformRequest: [function(data) {
        data = JSON.stringify(data)
        return data
      }],
      data: params,
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
 * 配置页面哪些元素是【查看】权限需要勾选的
 * 这么配置显然并不可靠且无法做到每个页面特异性的适配
 * 比如：配置readOnlyMap = ['查看','报表']则所有页面，配【查看】权限，都可看'查看'和'报表'
 * 无法做到某个页面配【查看】权限,'查看'可看，'报表'不能看或反之'报表'可看,'查看'不能看
 * 要实现每个页面灵活的特异性【查看】配置，可能要修改数据结构和程序逻辑，我这里暂不考虑
 */
const readOnlyMap = ['查看'];
let allAccessNum = 0;

/**
 * 功能：简单深拷贝
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
    allAccessNum++;
    if(item.children) {
      parentIds.unshift(item.id);
      getAllPagesAccess(item.children, accessList, parentIds);
    } else {
      accessList.push({...item, parentIds: copy(parentIds)});
    }
    if(idx === treeList.length - 1) {
      parentIds.length > 0  && parentIds.splice(0,1);
    }
  })
  return {configAccessList: accessList, allAccessNum: allAccessNum}
}

/**
 * 功能：tree状态更新，根据节点id，更新
 * @param {VueComponent} vNode tree的vue实例
 * @param {String} nodeId 节点id
 */
export function updateAccessBySelect(vNode, nodeId) {
  if(isRootNode(nodeId, vNode['treeData'])) {
    updateAccessFromTopToBottom(vNode, nodeId);
  } else {
    updateAccessFromTopToBottom(vNode, nodeId);
    updateAccessFromBottomToTop(vNode, nodeId);
  }
}

/**
 * 功能：通过checkbox的勾选更新tree状态
 * @param {VueComponent} vNode tree的vue实例
 * @param {String} nodeId 节点id
 */
export function updateAccessByCheckbox(vNode, nodeId) {
  let checkedList = [];
  let fatherId = vNode['treeAccessData'].find(item => item.id === nodeId)['parentIds'][0];
  let brotherNodes = copy(vNode['treeAccessData']).filter(item => {
    return item.parentIds[0] === fatherId
  });
  brotherNodes.forEach(brother => {
    if(vNode['treeSelectData'][brother.id]) {
      checkedList.push(brother)
    }
  })
  if(checkedList.length === brotherNodes.length) {
    fatherId && vNode.$set(vNode['treeSelectData'], fatherId, 'total');
  } else if(checkedList.map(item => item.label).sort().toString() === readOnlyMap.sort().toString()) {
    fatherId && vNode.$set(vNode['treeSelectData'], fatherId, 'read');
  } else if(checkedList.length === 0) {
    fatherId && vNode.$set(vNode['treeSelectData'], fatherId, 'none');
  } else {
    fatherId && vNode.$set(vNode['treeSelectData'], fatherId, 'part');
  }
  updateAccessFromBottomToTop(vNode, fatherId);
}

/**
 * 功能：状态上到下更新，根据节点id，更新子节点
 * @param {VueComponent} vNode tree的vue实例
 * @param {String} nodeId 节点id
 */
 function updateAccessFromTopToBottom(vNode, nodeId){
  let updateType = vNode['treeSelectData'][nodeId];  // total/read/part/none
  let childSelectVal = updateType === 'part' ? '' : updateType;
  vNode['treeAccessData'].forEach(item => {
    let level = getLevel(vNode, nodeId);
    let parentIds = [...item['parentIds']].reverse();
    let compareId = parentIds[level];
    parentIds.splice(0, getLevel(vNode, nodeId)+1);
    if(compareId === nodeId) {
      let leafCheckboxVal = '';
      if(updateType === 'total') {
        leafCheckboxVal = item.id;
      }else if(updateType === 'read') {
        leafCheckboxVal = (readOnlyMap.includes(item.label) && item.id) || '';
      }
      vNode.$set(vNode['treeSelectData'], item.id, leafCheckboxVal);
      parentIds.forEach(parentId => {
        vNode.$set(vNode['treeSelectData'], parentId, childSelectVal);
      })
    }
  })
}

/**
 * 功能：状态下到上更新，根据子节点id，更新父节点
 * @param {VueComponent} vNode tree的vue实例
 * @param {String} nodeId 节点id
 */
function updateAccessFromBottomToTop(vNode, nodeId) {
  let level = getLevel(vNode, nodeId);
  for(let i = level;i>=0;i--) {
    let {allSame, fatherId} = getBrotherAndCompare(vNode, nodeId, i)
    if(allSame) {
      fatherId && vNode.$set(vNode['treeSelectData'], fatherId, vNode['treeSelectData'][nodeId]);
    } else {
      fatherId && vNode.$set(vNode['treeSelectData'], fatherId, 'part');
    }
  }
}

/**
 * 功能:获取节点的层级
 * @param {VueComponent} vNode tree的vue实例
 * @param {String} nodeId 节点id
 * @returns {Number} 节点的层级
 */
function getLevel(vNode, nodeId) {
  let childNodes = vNode['treeAccessData'].filter(item => item.parentIds.includes(nodeId));
  let parentIds = copy(childNodes[0].parentIds).reverse();
  return parentIds.findIndex(item => item === nodeId);
}

/**
 * 功能：比较同级节点状态是否相同
 * @param {VueComponent} vNode tree的vue实例
 * @param {String} nodeId 节点id
 * @param {Number} level 节点的层级
 * @returns {Object} {allSame:相同为true,fatherId:父节点Id}
 */
function getBrotherAndCompare(vNode, nodeId, level) {
  let allSame = true;
  let childNodes = vNode['treeAccessData'].filter(item => item.parentIds.includes(nodeId));
  let parentIds = copy(childNodes[0].parentIds).reverse();
  let fatherId = parentIds[level-1];
  let brotherChildNodes = copy(vNode['treeAccessData']).filter(item => {
    let parentIds = copy(item.parentIds).reverse();
    return parentIds[level] !== nodeId && parentIds[level-1] === fatherId
  });
  let obj = {};
  brotherChildNodes = brotherChildNodes.reduce((cur,next) => {
    obj[next.parentIds[level]] ? "" : obj[next.parentIds[level]] = true && cur.push(next)
    return cur 
  },[])
  for(let brotherChildItem of brotherChildNodes) {
    let brotherId = copy(brotherChildItem.parentIds).reverse()[level];
    if(vNode['treeSelectData'][brotherId] !== vNode['treeSelectData'][nodeId]) {
      allSame = false;
      break;
    }
  }
  return {allSame: allSame, fatherId: fatherId}
}