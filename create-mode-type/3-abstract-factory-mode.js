/**
 * Created by 仲夏 on 2017/12/10.
 * 抽象工厂模式
 *    通过对类的工厂抽象，使其业务用于对产品类簇的创建，而不负责某一类实例的创建。
 *    是设计模式中最为抽象的一种。
 *
 * 抽象类的一个作用：
 *    定义一个产品簇，并声明一些必备的方法，若子类中没有重写则抛出错误（如下示例Car）。
 *
 */

/**
 * 抽象工厂方法
 * @param subType
 * @param superType
 * @returns {Error}
 * @constructor
 */
var VehicleFactory = function (subType, superType) {
  if (typeof VehicleFactory[superType] === 'function') {
    // 定义一个缓存类
    function F() {}
    F.prototype = new VehicleFactory[superType](); // 继承父类属性 & 方法
    subType.constructor = superType;
    subType.prototype = new F(); // 子类原型继承父类
  } else {
    return new Error(`Abstract class: ${superType} did not created.`);
  }
}


/**
 * 汽车抽象类
 *    实际使用中，只能继承该类并复写方法来使用。
 * @constructor
 */
VehicleFactory.Car = function () {}
VehicleFactory.Car.prototype = {
  getPrice: function () {
    return new Error('Abstract getPrice() cannot be used, please inherit it first!');
  },

  getSpeed: function () {
    return new Error('Abstract getSpeed() cannot be used, please inherit it first!');
  },
}

VehicleFactory.Bus = function () {}
VehicleFactory.Bus.prototype = {
  getPrice: function () {
    return new Error('Abstract getPrice() cannot be used, please inherit it first!');
  },

  getMaxNumber: function () {
    return new Error('Abstract getMaxNumber() cannot be used, please inherit it first!');
  },
}

VehicleFactory.Trunk = function () {}
VehicleFactory.Trunk.prototype = {
  getPrice: function () {
    return new Error('Abstract getPrice() cannot be used, please inherit it first!');
  },

  getMaxWeight: function () {
    return new Error('Abstract getMaxWeight() cannot be used, please inherit it first!');
  },
}



/**
 * 一个实例化的宝马汽车子类定义
 * @param price
 * @param speed
 * @constructor
 */
var BMW = function (price, speed) {
  this.price = price;
  this.speed = speed;
}
VehicleFactory(BMW, 'Car');
BMW.prototype = {
  getPrice: function () {
    return this.price;
  },
  getSpeed: function () {
    return this.speed;
  }
}


var bm = new BMW('300000￥', '360km/s');
bm.getPrice();  // 300000￥
