/**
 * Created by 仲夏 on 2017/12/23.
 *
 * 委托模式
 *    注意与代理模式的区别！
 *    委托给另一对象（通常为父元素）统一处理；
 *    可预言未来(给未来的元素添加绑定事件)；
 *    可防止内存外泄（尤其针对低版本IE）；
 *    数据分发；
 *
 */


// 一个常见的写法
const ul = document.getElementById('container')
ul.onclick = function (e) {
  const target = e.target;
  if (target.nodeName.toLowerCase() === 'li') {
    // do something you need...
  }
}

/**
 * // TODO...用委托模式封装一个事件委托方法 demo
 * @param destEle 委托对象
 * @param className
 * @param type 委托事件类型
 * @param handler 委托事件钩子函数
 */
function delegate(destEle, className, type, handler) {
  const ensureEle = destEle || document.body;

}
