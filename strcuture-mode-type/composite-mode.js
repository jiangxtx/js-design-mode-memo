/**
 * Created by 仲夏 on 2018/1/7.
 *
 * 组合模式：部分-整体模式
 *
 * 类比餐厅里的草滩服务。
 * 表单中常用到组合模式。
 *
 */

/**
 * 新闻虚拟父类
 * @constructor
 */
var News = function () {
  this.children = []; // 子组件容器
  this.element = null; // 当前组件元素
}
News.prototype = {

}

