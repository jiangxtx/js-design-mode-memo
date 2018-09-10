/**
 * Created by 仲夏 on 2018/1/7.
 *
 * 链模式：(本章高能提醒：涉及prototype较多，比较繁杂！)
 *    实现对同一个对象多个方法的链式调用；
 *    简化同一个对象的多次引用；
 *
 * 举例：
 *    jQuery，一个高端而不失奢华的框架库。
 */

var A = function () { }
A.prototype = {
  length: 9,
  size: function () {
    return this.length;
  }
}


console.log((new A()).size())  // 9
// 下面两种访问都会报错！
console.log(A.size())
console.log(A().size())


/**
 * 借助另一个对象来实现访问
 * @returns {{length: number, size: C.size}}
 * @constructor
 */
var C = function () {
  return D;
}
var D = C.prototype = {
  length: 12,
  size: function () {
    return this.length;
  }
}

console.log(C().size()) // 12


/**
 * jQuery中，为了减少变量的创建而采用的方法。
 * @returns {{length: number, size: G.size}|*}
 * @constructor
 */
var G = function () {
  return G.fn;
}
G.fn = G.prototype = {
  length: 36,
  size: function () {
    return this.length;
  }
}

console.log(G().size()) // 36


var G = function (selector, context) {
  return new G.fn.init(selector, context)
}
G.fn.prototype = {
  constructor: G,
  init: function (selector, context) {
    this.length = 0;
    context = context || document;
    if (selector.indexOf('#') === 0) {
      this[0] = document.getElementById(selector.slice(1));
      this.length = 1;
    } else {
      var doms = context.getElementsByTagName(selector),
        i = 0,
        len = doms.length;
      for (; i< len; i++) {
        this[i] = doms[i];
      }
      this.length = len;
    }
    this.context = context; // 保存上下文
    this.selector = selector; // 保存选择符
    return this;
  }
}

/**
 * JavaScript中并没有纯粹的数组类型。
 * JavaScript引擎的实现也没有做严格的校验，都是基于对象实现的。
 *
 var arr = {0:'jack',1:'tom',2:'hellen',length:3, push:function(){},splice:function(){},sort:function(){}}，
 上述的 arr 对象，在控制台就会以数组的形式输出来。
 *
 */
