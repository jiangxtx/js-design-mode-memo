/**
 * Created by 仲夏 on 2018/1/7.
 *
 * 简单模板模式：
 *    避免创建视图时的大量节点操作，可优化内存开销；
 *    主要运用在 DOM 操作较多的场合。
 *
 *    关键字：抽象、复用、封装。
 *
 *    创建模板的三大部分：
 *      1. 字符串模板库
 *      2. 格式化方法
 *      3. 字符串拼接操作
 *
 */


var A = A || {}; // 命名空间，单体对象
A.root = document.getElementById('container')
A.strategy = {
  listPart: function () { },
  codePart: function () { },
  guide: function () { },
}
A.init = function (data) {

}
