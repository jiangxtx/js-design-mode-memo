/**
 * Created by 仲夏 on 2017/12/10.
 * 建造者模式
 *    将一个复杂对象的构建层与表现层相互分离。
 *    这种模式创建的对象是一个复合对象。
 *
 * 与工厂模式的区别：
 *    工厂模式，关注最终的产出，而不关注过程
 *    建造者模式，更注重创建的细节。
 *
 */


// 创建一个人类的类
var Human = function (param) {
  const { skill='保密', hobby='保密'} = param || {};
  this.skill = skill;
  this.hobby = hobby;
}
Human.prototype = {
  getSkill: function () {
    return this.skill;
  },

  getHobby: function () {
    return this.hobby;
  }
}

/**
 * 实例化姓名类
 * @param name
 * @constructor
 */
var Named = function (name) {
  var _this = this;
  (function (name, that) {
    that.wholeName = name;
    if (name.indexOf(' ') > -1) {
      that.firstName = name.slice(0, name.indexOf(' '));
      that.lastName = name.slice(name.indexOf(' '));
    }
  })(name, _this)
}

/**
 * 实例化职位类
 * @param work
 * @constructor
 */
var Work = function (work) {
  var workName, workDescp;
  switch (work) {
    case 'code':
      workName = 'Enginner';
      workDescp = 'Deeped into coding.';
      break;
    case 'UI':
    case 'UE':
      workName = 'Designer';
      workDescp = 'Deeped into designing everyday...';
      break;
    case 'teach':
      workName = 'Teacher';
      workDescp = 'Teaching students is a happy thing..';
      break;
    default:
      workName = work;
      workDescp = 'No valid work descp for this work!';
  }
  this.workName = workName;
  this.workDescp = workDescp;
}
Work.prototype = {
  changeWork: function (work) {
    // TODO...此处目前只改变了 workName，而没有更新对应的 workDescp 字段。
    // 现在的问题是：如何复用上面代码中的 switch 代码段？
    this.workName = work;
  },

  changeDescp: function (descp) {
    this.workDescp = descp;
  }
}

/**
 * 应聘者建造者类
 * @param name
 * @param work
 * @returns {Human}
 * @constructor
 */
var Person = function (name, work, param) {
  // 创建应聘者缓存对象
  var _person = new Human(param);

  /**
   * !important！本质上，Named、Work类与 Human类并没有什么关联。只是通过 _person.name 把它们桥接了起来。
   * 所以 _person 实例对象中，并没有wholeName 字段，而是在 name.wholeName 中。
   *
   * 再直观点认知下面一行的代码就是：
   *    var nameObj = new Named(name);
   *    _person.name = nameObj;
   */
  _person.name = new Named(name)
  _person.work = new Work(work)

  return _person;
}


// test demo
var person = new Person('Jiangxtx', 'code', { hobby: 'football & coding' });
console.log(person.hobby)
