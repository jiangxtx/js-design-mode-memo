/**
 * Created by 仲夏 on 2017/12/10.
 * 工厂方法模式：
 *    将实际常见对象工作推迟到之类当中，核心类是一个抽象类。
 *
 */


// 安全模式类
var SafetyModeClass = function () {
  if (!this instanceof SafetyModeClass)
    return new SafetyModeClass();

}
SafetyModeClass.prototype = {
  show: function () {
    console.log('SafetyModeClass show method..');
  }
}
