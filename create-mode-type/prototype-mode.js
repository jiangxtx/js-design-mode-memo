/**
 * Created by 仲夏 on 2017/12/10.
 *
 * 语言之魂-原型模式
 *    更多的是用在对对象的创建上面。
 */

/**
 * 图片轮播类基类
 * @param imgArr
 * @param container
 * @constructor
 */
var LoopImages = function (imgArr, container) {
  this.imgsArr = imgArr;
  this.container = container;
}
LoopImages.prototype = {
  createImage: function () {
    console.log('createImage() loaded..')
  },
  // 切换下一张图片
  changeImage: function () {
    console.log('changeImage() loaded..')
  }
}

/**
 * 左右滑动轮播类
 * @param imgArr
 * @param container
 * @constructor
 */
var SlideLoopImg = function (imgArr, container) {
  // 构造函数继承图片轮播类基类
  LoopImages.call(this, imgArr, container);
}
SlideLoopImg.prototype = new LoopImages();  // 继承基类的 prototype 方法，！important 不能漏掉！
SlideLoopImg.prototype.changeImage = function () {
  console.log('SlideLoopImg changeImage() loaded..')
}


/**
 * 基于已经存在的模板对象，克隆出新对象的模式 !important！
 * @returns {F}
 */
function prototypeExtend() {
  var F = new function () {},  // 缓存类，为实例化返回对象临时创建
    args = arguments,  // 模板对象的参数序列
    i = 0,
    len = args.length;

  for(; i<len; i++) {
    for (var key in args[i]) {
      F.prototype[key] = args[i][key]; // 将这些熟悉复制到缓存类原型中
    }
  }

  return new F();
}


/**
 * 基于 prototypeExtend模板创建的 企鹅游戏类
 * @type {F}
 */
var qieGame = prototypeExtend(
  {
    speed: '200 km/h',
    swim: function () {
      console.log('swim speed is: ' + this.speed);
    }
  }, {
    run: function (speed) {
      console.log('run speed is: ' + speed + 'km/h.');
    }
  }
);

// TODO...代码运行报错了，待研究...2017-12-10.
qieGame.swim();
qieGame.run(45);
