/**
 * Created by 仲夏 on 2017/12/23.
 *
 * 惰性模式
 *    减少每次代码执行时的重复性的分支判断。
 *
 * 核心思想：
 *    第一次执行后就重新定义该元素、事件、对象等。
 *
 * 举例：
 *    函数事件的兼容性判断，只需一次而且是第一次即可；
 *
 * 两个实现思路：
 *    1. 文件加载进来时通过闭包执行该方法，并对其重新定义；
 *    2. 函数第一次调用时对其重新定义。
 *
 */


const Event = {};

// 思路一：加载即执行的实现，页面初始加载时会损耗一些性能。
Event.on = (function (dom, type, fn) {
  if (document.addEventListener) {
    return function (dom, type, fn) {
      dom.addEventListener(type, fn, false)
    }
  } else if (document.attachEvent) {
    return function (dom, type, fn) {
      dom.attachEvent('on' + type, fn)
    }
  } else {
    return function (dom, type, fn) {
      dom['on' + type] = fn;
    }
  }
})();

// 思路二：惰性执行，方法第一次运行会损耗一些性能。
Event.on = function (dom, type, fn) {
  if (document.addEventListener) {
    Event.on = function (dom, type, fn) {
      dom.addEventListener(type, fn, false)
    }
  } else if (document.attachEvent) {
    Event.on = function (dom, type, fn) {
      dom.attachEvent('on' + type, fn)
    }
  } else {
    Event.on = function (dom, type, fn) {
      dom['on' + type] = fn;
    }
  }

  // 执行重定义的on方法！important
  Event.on(dom, type, fn);
}


/**
 * 创建 XHR 对象的惰性函数优化
 */

// method 1
var createXHR = (function () {
  if (typeof XMLHttpRequest !== 'undefined') {
    return () => new XMLHttpRequest();
  } else if (typeof ActiveXObject !== 'undefined') {
    return () => new ActiveXObject()
  } else {
    return () => console.error('No XHR object available!')
  }
})();

// method 2
function createXHR() {
  if (typeof XMLHttpRequest !== 'undefined') {
    createXHR = () => new XMLHttpRequest();
  } else if (typeof ActiveXObject !== 'undefined') {
    createXHR = () => new ActiveXObject()
  } else {
    createXHR = () => console.error('No XHR object available!')
  }

  // important!
  return createXHR();
}
