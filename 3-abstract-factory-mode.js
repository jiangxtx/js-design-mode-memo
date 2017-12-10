/**
 * Created by 仲夏 on 2017/12/10.
 * 抽象工厂模式
 *    通过对类的工厂抽象，使其业务用于对产品类簇的创建，而不负责某一类实例的创建。
 *
 * 抽象类的一个作用：
 *    定义一个产品簇，并声明一些必备的方法，若子类中没有重写则抛出错误（如下示例Car）。
 *
 */

/**
 * 汽车抽象类
 *    实际使用中，只能继承该类并复写方法来使用。
 * @constructor
 */
var Car = function () {}
Car.prototype = {
  getPrice: function () {
    return new Error('Abstract getPrice() cannot be used, please inherit it first!');
  },

  getSpeed: function () {
    return new Error('Abstract getSpeed() cannot be used, please inherit it first!');
  },
}
