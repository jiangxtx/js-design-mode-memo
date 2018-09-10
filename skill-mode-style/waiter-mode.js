/**
 * Created by 仲夏 on 2018/1/7.
 *
 * 等待者模式：
 *    （本文思想，清晰晓畅，值得借鉴！）
 *    对多个异步进程监听，来出发未来发生的动作。
 *    用来解决那些不确定先后完成顺序的异步逻辑。
 *    提供了一个抽象的非阻塞的解决方案，旨在处理比较耗时的操作。
 *
 * 举例：
 *    接口拆分；
 *    入场仪式；
 *    很多框架中都有等待者模式的设计，比如jQuery中的Deferred 对象。
 *    轮循；
 *
 */


// 等待者对象
var Waiter = function () {
  var dfd = [], // 注册了的等待对象容器
    doneArr = [], // 成功回调方法容器
    failArr = [], // 失败回调方法容器
    slice = Array.prototype.slice,
    that = this;

  // 监控对象类
  var Primise = function () {
    this.resolved = false; // 监控对象是否解决成功状态
    this.rejected = false; // 监控对象是否解决失败状态
  }
  Primise.prototype = {
    // 解决成功回调
    resolve: function () {
      this.resolved = true;
      if (!dfd.length) return;
      for (var i=dfd.length - 1; i>=0; i--) {
        if (dfd[i] && !dfd[i].resolved || dfd[i].rejected) {
          return;
        }
        dfd.splice(i, 1);  // 清楚监控对象
      }
      _exec(doneArr); // 执行解决成功回调方法.
    },
    reject: function () {
      this.rejected = true;
      if (!dfd.length) return;
      dfd.splice(0);
      _exec(failArr); //
    }
  }

  // 创建监控对象
  that.Deferred = function () {
    return new Primise();
  }

  // 回调执行方法
  function _exec(arr) {
    for (var i=0; i<arr.length; i++) {
      try {
        arr[i] && arr[i]();
      } catch (e) {
        console.error(e)
      }
    }

  }

  // 监控异步方法，监控已注册过的监控对象的异步逻辑。
  that.when = function () {
    dfd = slice.call(arguments);
    for (var i=0; i<dfd.length; i++) {
      if (!dfd[i] || dfd[i].resolved || dfd[i].rejected
        || !dfd[i] instanceof Primise) {
        dfd.splice(i, 1)
      }
    }
    return that; // 返回等待者对象
  }

  // 解决成功回调函数
  that.done = function () {
    doneArr = doneArr.concat(slice.call(arguments));
    return that; // 返回等待者对象
  }

  // 解决失败回调函数
  that.fail = function () {
    failArr = failArr.concat(slice.call(arguments));
    return that; // 返回等待者对象
  }

}


////// test for Waiter-mode ///////////////////////////////////

var waiter = new Waiter();

// 第一个彩蛋，5秒后停止
var dan_1 = function () {
  var dtd = waiter.Deferred();
  setTimeout(function () {
    console.log('dan_1 finished!')
    dtd.resolve()
  }, 3000);
  return dtd;
}

// 第二个彩蛋，8秒后停止
var dan_2 = function () {
  var dtd = waiter.Deferred();
  setTimeout(function () {
    console.log('dan_2 finished!')
    dtd.resolve()
  }, 5000);
  return dtd;
}

// 用等待者对象监听两个彩蛋的工作状态
waiter
  // 注意此处，教材上为：when(dan_1, dan_2)，有误！important.
  // 我去！我看错了！教材上dan_1 用的是立即执行函数！
  .when(dan_1(), dan_2())
  .done(() => console.log('All caidans success!'))
  .fail(() => console.log('Some caidans failed!'));




/**
 * 封装异步请求函数
 * @param url
 * @param successHandler
 * @param failHandler
 */
var ajaxGet = function (url, successHandler, failHandler) {
  var xhr = new XMLHttpRequest()
  var dtd = waiter.Deferred();
  xhr.onload = function (e) {
    if (xhr.status >=200 && xhr.status <=300 || xhr.status ==304) {
      successHandler && successHandler();
      dtd.resolve();
    } else {
      dtd.reject();
      failHandler && failHandler();
    }
  }
  xhr.open('get', url, true)
  xhr.send(null);

  return dtd;
}



/**
 * 后续再有涉及多个异步请求并需等待所有请求都完成后的回调时，
 * 就不需要回调地狱了！
 * 直接采用等待者模式，搞定！--2018-1-7.
 */
waiter
  .when(ajaxGet('getJSON1'), ajaxGet('getJSON2'))
  .done(() => console.log('All ajax succeed!'))
