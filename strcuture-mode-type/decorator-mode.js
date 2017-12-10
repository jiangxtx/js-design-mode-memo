/**
 * Created by 仲夏 on 2017/12/10.
 *
 * 装饰者模式
 *    不改变源对象的基础上，包装拓展，使其满足更复杂的需求。
 *    理解该模式，就类比房子的装修过程，本质上是一样的。
 *    比较简单，就是对原有对象的属性、方法的添加。
 *    对源对象是一种良性的拓展，无需了解其具体实现。
 *
 */

// 需求：给原有的input 输入框加一个判断，点击时输入框旁边的提示文案消失（在 form中很常见的需求）。

/**
 * 装饰原来的 input DOM元素
  * @param dom
 * @param fn
 */
var decorator = function (dom, fn) {
  if (typeof dom.onclick === 'function') {// 若事件源已经绑定事件
    var clickFnTmp = dom.onclick; // 缓存原有事件

    dom.onclick = function () {
      clickFnTmp();
      fn();
    }
  } else {
    dom.onclick = fn;
  }
}
