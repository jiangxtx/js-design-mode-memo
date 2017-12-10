/**
 * Created by 仲夏 on 2017/12/10.
 * 简单工厂模式，一般有两种方式：
 *    1. 通过类实例化对象创建
 *    2. 通过创建一个新对象，然后包装增强其属性与功能来实现
 *
 */

// 篮球基类
var Basketball = function () {
  this.intro = 'Basketball is powerful.';
}
Basketball.prototype = {
  getMember: function () {
    console.log('Each troop needs 5 persons.')
  }
}

// 足球基类
var Football = function () {
  this.intro = 'Football is powerful.';
}
Football.prototype = {
  getMember: function () {
    console.log('Each troop needs 11 persons.')
  }
}

// 创建一个基于球类的运动工厂
var SportsFactory = function (name) {
  switch (name) {
    case 'NBA':
      return new Basketball();
    case 'wordCup':
      return new Football();
  }
}


/**
 * 创建一个书籍的工厂模式。
 *    很类似于一个寄生式继承；
 *    与上面 SportsFactory 工厂相比，这里的 obj 没有继承任何类或对象。
 *
 * @param name
 * @param time
 * @param type
 * @returns {{name: *, time: *, type: *}}
 */
function createBook(name, time, type) {
  var obj = {
    name: name,
    time: time,
    type: type
  };
  obj.getName = function () {
    return this.name;
  }

  return obj;
}

var bo1 = createBook('<javasript guide>', 2014, 'js');
bo1.getName();  // '<javasript guide>'
