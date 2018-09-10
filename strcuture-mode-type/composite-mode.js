/**
 * Created by 仲夏 on 2018/1/7.
 *
 * 组合模式：部分-整体模式
 *
 * 类比餐厅里的草滩服务。
 * 表单中常用到组合模式。
 *
 *  * 组合模式，又称“部分-整体模式”。
 *    使得用户对单个对象和组合对象的使用具有一致性。
 *    注意接口的统一。
 *    组合模式中运用到了继承。
 *
 * 举例：
 *    表单应用
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
