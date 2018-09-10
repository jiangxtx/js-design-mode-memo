/**
 * @description
 * @author XIAJIUJIANG239
 * @createtime 2017/12/14
 *
 * 发布-订阅者模式
 *
 * 举例：
 *    Node 的API 架构师因为太喜欢PubSub，所以决定包含一个一般性的PubSub 实体。这个实体叫做EventEmitter（事件发生器），
 *    其他对象可以继承它。Node 中几乎所有的I/O 源都是EventEmitter 对象：文件流、HTTP 服务器，甚至是应用进程本身。
 *
 */

/**
 * PubSub 模式的核心思想代码如下
 * @type {{}}
 */
var PubSub = { handlers: {} };

// 添加事件监听器
PubSub.on = function (eventType, handler) {
  if (!eventType in this.handlers) {
    this.handlers[eventType] = [];
  }
  this.handlers[eventType].push(handler);
  return this;
}

// 触发事件操作
PubSub.emit = function (eventType) {
  const handlerParams = Array.prototype.slice.call(arguments, 1)
  for (var i=0; i<this.handlers[eventType].length; i++) {
    this.handlers[eventType][i].apply(this, handlerParams);
  }
  return this;
}

// 移除事件处理 & 一次性事件处理 & ....


/**
 * 持续优化项目：
 *    1. 各种 PubSub 实现在特性方面会稍有不同。
 *    2. 很多PubSub 实现负责解析事件字符串以提供一些特殊功能。例如形如 "click.tbb" 和 "hover.tbb" 的事件绑定。
 *    3. 如果事件按顺序触发了过多的处理器，就会有阻塞线程且导致浏览器不响应的风险。更糟糕的是，如果事件处理器本身触发了事件，还很容易造成无限循环。
 */
