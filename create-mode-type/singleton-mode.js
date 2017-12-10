/**
 * Created by 仲夏 on 2017/12/10.
 * 单例模式
 *    只允许实例化一次的对象类。
 *
 * 单例的作用：
 *    1. 有时可用一个对象规划一个命名空间，防止全局污染。
 *       例如jQuery中的jQuery对象，就是一个全局单例对象。
 *    2. 单例还可用来管理代码库的各个模块。
 *       例如，看看百度的命名模块思路：
 *         baidu.dom.addClass          // 添加元素类
 *         baidu.dom.append            // 插入元素
 *         baidu.event.stopPropagation // 阻止冒泡
 *         baidu.event.preventDefault  // 阻止默认行为
 *         ......
 *    3. 无法修改的静态变量。
 *    4. 惰性单例。
 *
 *
 *  （看到这里，方才觉得我之前对单例模式的理解，过于狭隘了！--仲夏 2017-12-10）
 */


// 无法修改的静态变量
var Config = (function () {
  var _config = {
    MAX_NUM: 100,
    PI: 3.1415,
    COUNT: 999
  };

  return {
    // 取值器的方法
    get: function (key) {
      return _config[key];
    }
  }
})()

console.log(Config.get('PI'));  // 3.1415



var LazySingleton = (function () {
  var instance = null; // 单例实力引用
  var count = 0; // 用来测试单例函数是否只实例化一次

  // 单例函数
  function Singleton() {
    count++;

    return {
      version: 'V1.0.0',
      name: 'lazy singleton',
      show: function () {
        console.log('show info: version--%s, name--%s. and count: %s',
          this.version, this.name, count);
      }
    }
  }

  return function () {
    if (!instance) {
      instance = new Singleton();
    }

    return instance;
  }
})()


// test singleton
LazySingleton().show();
LazySingleton().show();
LazySingleton().show();
