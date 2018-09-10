/**
 * Created by 仲夏 on 2017/12/10.
 *
 * 桥接模式
 *    系统沿着多个维度变化的同时，不增加其复杂度，并且达到解耦的目的。
 *    将实现层与抽象层解耦分离。
 *    面向对象的一个原则：对拓展开放、对修改关闭。
 *    提取共同点，DRY原则。
 *    多元化对象应用。
 *
 * 举例说明：
 *    你要从北京开车去沈阳旅游，那么你就需要找到一条连接北京 & 沈阳的公路，才能顺利往返。这边是桥接模式的原型。
 *
 */



/**
 * 多元化对象的示例如下
 */

// 多维变量类：运动单元
function Speed(x, y) {
  this.x = x;
  this.y = y;
}
Speed.prototype.run = function () {
  console.log('Run Speed Now!')
}

// 多维变量类：着色单元
function Color(color) {
  this.color = color;
}
Color.prototype.draw = function () {
  console.log('Draw your Color: ' + this.color)
}

// 多维变量类：变形单元
function Shape(shape) {
  this.shape = shape;
}
Shape.prototype.revert = function (newShape) {
  console.log('Change your Shape, old shape: %s, new shape: %s ' ,this.shape, newShape || 'null')
}

// 多维变量类：说话单元
function Speak(spk) {
  this.speak = spk;
}
Speak.prototype.say = function () {
  console.log('Speak something: ' + this.speak)
}

// 创建一个可以运动、可以着色的球类
function Ball(x, y, color) {
  this.speed = new Speed(x, y);  // 实现运动单元
  this.color = new Color(color);
  this.shape = new Shape('circle');
}

var ball = new Ball(12,34,'red');
console.log(ball.color.draw());  // Draw your Color: red
ball.shape.revert('vertical');  // Change your Shape, old shape: circle, new shape: vertical
