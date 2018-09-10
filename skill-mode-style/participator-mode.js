/**
 * Created by 仲夏 on 2018/1/7.
 *
 * 参与者模式：
 *    在特定的作用域中执行给定的函数，并将参数原封不动的传递。
 *    两种技术的结晶：函数绑定 & 函数柯里化。
 *
 */


/**
 * 手动封装一个函数绑定bind，注意与原生bind 方法的差别。
 * @param fn
 * @param context
 * @returns {Function}
 */
function bind(fn, context) {
  return function () {
    return fn.apply(context, arguments)
  }
}


/**
 * bind函数的兼容性写法。
 *  用apply来实现bind函数。
 * @type {*}
 */
Function.prototype.bind = Function.prototype.bind || function (context) {
  // 缓存数组slice方法 Array.prototype.slice
  var Slice = [].slice;
  var args = Slice.call(arguments, 1);
  var _this = this;

  return function () {
    var addArgs = Slice.call(arguments); // 将arguments转化为数组
    var allArgs = args.concat(addArgs);

    // !important。注意_this.apply 的书写！
    return _this.apply(context, allArgs);
  }
}



/**
 * 函数柯里化
 * @param fn
 */
function curry(fn) {
  // 缓存数组slice方法 Array.prototype.slice
  var Slice = [].slice;
  var args = Slice.call(arguments, 1);
  return function () {
    var addArgs = Slice.call(arguments); // 将arguments转化为数组
    var allArgs = args.concat(addArgs);
    return fn.apply(null, allArgs);
  }
}

// 应用实例
function plus(a,b) { return a*b;}
var plus5 = curry(plus, 5);
console.log(plus5(3))  // 15


