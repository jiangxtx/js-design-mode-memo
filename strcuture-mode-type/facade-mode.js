/**
 * Created by 仲夏 on 2017/12/10.
 *
 * 外观模式
 *    为一组复杂的子系统接口提供一个更高级的统一接口。
 *    简化底层接口的复杂性。
 *    封装不同浏览器的兼容性问题。
 */


/**
 * 添加一个点击事件
 *  直接形如下面的写法，有两大弊端：
 *    1. onclick 为DOM0 级别事件，容易被覆盖
 *    2. 没有考虑兼容性
 */
document.onclick = function () {
  ///...
}


// 外观模式实现
// 当然了，再优化的话，可以考虑 dom 方法判断问题，只在第一次加载该函数时判断即可。
function addEvent(dom, type, fn) {
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    dom.attachEvent(`on${type}`, fn);
  } else {
    dom[`on${type}`] = fn;
  }
}
