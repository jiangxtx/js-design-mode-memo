/**
 * Created by 仲夏 on 2017/12/23.
 *
 * Data access object-DAO
 * 数据访问对象模式
 *    抽象与封装对数据源的访问与存储；
 *    对数据库的操作进行封装；
 *    DAO是一个对象，封装了属性与方法；
 *
 * 使用举例：
 *    新用户的引导操作；
 */


/**
 * 本地存储类
 * @param prefix 本地数据库前缀，防止多人冲突
 * @param joinToken 连接拼接符
 *                  对于本地存储，保存存储的时间是必要的，有助于后续的数据管理；
 * @constructor
 */
function BaseLocalStorage(prefix, joinToken) {
  this.prefix = prefix;
  this.joinToken = joinToken || '|--|';
}

BaseLocalStorage.prototype = {
  // operate status
  status: {
    SUCCESS: 0,
    FAILURE: 1,
    OVERFLOW: 2,
    TIMEOUT: 3,
  },

  storage: localStorage || window.localStorage,

  // 获取本地存储数据库的真实字段key
  getKey: function (key) {
    return this.prefix + key;
  },

  get: function (key, callback) {
    key = this.getKey(key);
    let status = this.status.SUCCESS,
      value = null, // key对应的值
      result; // 最终获取的数据

    try {
      value = this.storage.getItem(key);
    } catch (e) {
      result = {
        status: this.status.FAILURE,
        value: null
      };
      callback && callback.call(this, result);
      return result;
    }

    if (value) {
      const valueArr = value.split(this.joinToken);
      value = value[0];
    } else {
      value = null;
      status = this.status.FAILURE;
    }

    result = {
      status,
      value
    };
    callback && callback.call(this, result);
    return result;
  },

  /**
   * 添加数据
   * @param key key值
   * @param value 数据值
   * @param callback 回调函数
   * @param time Long 有效时间戳
   */
  set: function (key, value, callback, time) {
    let status = this.status.SUCCESS;

    // 代码的健壮性，可见一斑！正所谓失之毫厘谬以千里，这也是大师与一般人之间的差距！
    try {
      time = new Date(time).getTime() || time.getTime();
    } catch (e) {
      // 为有效时间设置默认时效一个月。
      time = +new Date() + 1000 * 60 * 60 *24 * 31;
    }

    try {
      this.storage.setItem(this.getKey(key), value + this.joinToken + time);
    } catch (e) {
      status = this.status.OVERFLOW;
      this.errorlog('set error: overflow!');
    }

    // 注意体会下面写法的精妙之处！一般的写法估计就是 callback(status)了，此处call函数运用的妙哉！
    callback && callback.call(this, status, key, value);
  },

  remove: function (key, callback) {
    let status = this.status.SUCCESS,
      key = this.getKey(key),
      value = null;
    try {
      this.storage.removeItem(key);
    } catch (e) {
      status = this.status.FAILURE;
    }

    callback && callback.call(this, status);
  },

  errorlog: function (info) {
    window.console && window.console.error(info);
  }
}
