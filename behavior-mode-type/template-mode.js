/**
 * @description
 * @author XIAJIUJIANG239
 * @createtime 2017/12/12
 *
 * 模板方法模式。
 *    父类中定义算法骨架，将一些市县步骤延迟到子类中。
 *    核心在于对方法的统一、重用。
 *    约束性与规范性较强。
 *
 * 举例：
 *    提示框归一化
 */


/**
 * 创建一个基类提示框
 * @param data
 * @constructor
 */
var Alert = function (data) {
  if (!data) return;

  this.content = data.content;
  this.panel = document.createElement('div');
  this.contentNode = document.createElement('p')
  this.confirmBtn = document.createElement('span')
  this.cancelBtn = document.createElement('span')

  this.panel.className = 'alert'
  this.confirmBtn.className = 'confirm'
  this.cancelBtn.className = 'cancel'

  this.confirmBtn.innerHTML = data.confirm || 'Confirm';
  this.cancelBtn.innerHTML = data.cancel || 'Cancel';
  this.contentNode.innerHTML = this.content;

  var emptyFn = function() {}
  this.confirmHandler = data.confirmHandler || emptyFn;
  this.cancelHandler = data.cancelHandler || emptyFn;
}
// 基类提示框的原型方法
Alert.prototype = {
  // 创建提示框
  init: function () {
    this.panel.appendChild(this.cancelBtn)
    this.panel.appendChild(this.contentNode)
    this.panel.appendChild(this.confirmBtn)

    document.body.appendChild(this.panel)
    this.bindEvent();
    this.show();
  },

  bindEvent: function () {
    var _this = this;
    this.cancelBtn.onclick = function () {
      _this.cancelHandler();
      _this.hide();
    }

    this.confirmBtn.onclick = function () {
      _this.confirmHandler();
      _this.hide();
    }
  },

  hide: function () {
    this.panel.style.display = 'none'
  },

  show: function () {
    this.panel.style.display = 'block';
  }
}


/**
 * 基于上述的基类，可以创建子模板类
 * @constructor
 */
var RightAlert = function () {

}
