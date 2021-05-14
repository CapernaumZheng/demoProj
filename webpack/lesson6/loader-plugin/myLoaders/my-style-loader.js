module.exports = function(source) {
  console.log(source)
  return `var ele = document.createElement('style');
   ele.innerHTML = ${JSON.stringify(source)};
   document.head.appendChild(ele)
  `
}