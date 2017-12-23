/**
 * Created by 仲夏 on 2017/12/23.
 *
 * 节流模式
 *    对重复的业务逻辑进行节流控制，以提升性能。
 *    通常又称之为“函数的节流”。
 *
 * 举例：
 *    通常配合 window.scroll、mouseleave、mouseout 等事件来使用；
 *    优化浮层，鼠标滑过元素的交互效果；
 *    图片的延迟加载，房子页面快速拉至底部时，上面的图片优先加载导致可视区图片加载的延时！important；
 *
 *
 */


/**
 * 节流函数
 */
function throttle() {
  // logic codes here..
}


/**
 * 节流延迟加载图片类
 * @param id 图片容器ID
 * @constructor
 */
function ImgLazyLoad(id) {
  this.container = document.getElementById(id); // image container
  this.imgs = this.getImgs(); // caches images
  this.init();
}

ImgLazyLoad.prototype = {
  // 初始执行逻辑
  init: function () {
    this.update(); // 加载当前视图图片
    this.bindEvent();
  },

  // 获取延迟加载图片
  getImgs: function () {
    const imgs = this.container.getElementsByTagName('img')
    const arr = Array.prototype.slice.call(imgs);
    return arr;
  },

  // load imgs
  update: function () {
    const _this = this;
    if (!this.imgs.length) return; // all imgs loaded.
    this.imgs.forEach((item, idx) => {
      if (this.shouldShow(idx)) {
        item.src = item.getAttribute('data-src');
        _this.imgs.splice(idx, 1); // clear this cache.
      }
    })
  },

  // judge whether img should show
  shouldShow: function (i) {
    const currentImg = this.imgs[i]
    const scrollTop = document.body.scrollTop,  // 可视范围内顶部高度
      scrollBottom = scrollTop + document.documentElement.clientHeight,
      imgTop = this.pageY(currentImg), // 图片顶部高度
      imgBottom = imgTop + currentImg.offsetHeight;

    return imgBottom > scrollTop && imgBottom < scrollBottom ||
        imgTop < scrollBottom && imgTop > scrollTop;

  },

  // 获取页面元素的纵坐标位置
  pageY: function (element) {

  },

  // 为窗口绑定resize、scroll事件
  bindEvent:function () {
    const _this = this;
    window.scroll = function () {
      throttle(_this.update)
    }
    window.resize = function () {
      throttle(_this.update)
    }
  }

};


// 调用示例
new ImgLazyLoad('imgs_id');
