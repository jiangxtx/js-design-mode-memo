/**
 * Created by 仲夏 on 2017/11/25.
 *
 * Chapter 1. 灵活的 JavaScript
 */


/**
 * 抽象一个统一添加函数的方法函数（1）
 * @param method
 * @param fn
 * @returns {Function}
 */
Function.prototype.addMethod = function (method, fn) {
    this[method] = fn;
    return this;  // 方便实现链式书写
}

var methods = function () {}

methods.addMethod('checkName', function (name) {
    // check name validate
    console.log('checkName function: ', name);

    // test 'this' symbol
    console.log(this === methods, this instanceof methods);  // true, false
    return this;
});

methods.addMethod('checkEmail', function (email) {
    // check name validate
    console.log('checkEmail function: ', email)
    return this;
});


// 调用示例
methods.checkName('Jackson').checkEmail('jianxtx@gmail.com')



/**
 * 抽象一个统一添加函数的方法函数（2）
 * @param method
 * @param fn
 * @returns {Function}
 */
Function.prototype.addMethod2 = function (method, fn) {
    this.prototype[method] = fn;
    return this;  // 方便实现链式书写
}

var methods2 = function () {}

methods2.addMethod2('checkEmail', function (email) {
    // check name validate
    console.log('checkEmail2 function: ', email)
    return this;
}).addMethod2('checkName', function (name) {
    console.log('checkName2 function: ', name);
    return this;
})


// 调用示例

// 这种调用会报错
// methods2.checkName('Jackson').checkEmail('jianxtx@gmail.com')

var mt = new methods2();
mt.checkName('tomson').checkEmail('tom@qq.com')