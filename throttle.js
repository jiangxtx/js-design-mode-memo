/**
 * @description
 *    预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期。
 *
 * 调用示例：
      var i = 0;
      var scrollHandler = function() { console.log(i++) }
      window.onscroll = _throttle(scrollHandler, 400);
 *
 * @author xiajiujiang239
 * @createtime 2017/12/8
 */


/**
 * 预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期。
 * @param func 延迟执行的函数
 * @param wait 延迟时间，单位毫秒
 * @param options
 */
function throttle(func, wait, options) {
  options = options || {};
  var context, // 上下文
    args, // 参数
    result; // 返回结果函数
  var timeout = null; // 定时器
  var previous = 0;

  var later = function () {
    previous = options.leading === false ? 0 : +new Date();  // (new Date()).getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  }

  return function () {
    var now = +new Date();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);  // 计算剩余时间
    context = this;
    args = arguments;

    // 当到达wait指定的时间间隔，则调用func函数
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(func, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  }
}
