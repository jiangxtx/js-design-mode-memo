/**
 * 函数式编程 *
 *
 * 函数式编程中函数有三种不同的解读方式，分别为：
 *    1. 纯函数
 *    2. 高阶函数
 *    3. 一等函数
 *
 *  具体参见“印象笔记”中的《函数式编程中的 “函数们”》。
 *
 * Ramda 中有一个API：evolve，其接受的首个参数便是一个属性值为函数的对象。
 * evolve 函数会递归地对 “待处理对象” 的属性进行变换，变换的方式由 transformation 内置函数属性值的对象定义。
 *
 * 示例如下：
 *
     var tomato = {
       name: 'Tomato',
       data: {elapsed: 100, remaining: 1400},
       id:123
     };
     var transformations = {
       name: R.toUpper,
       data: {elapsed: R.add(1), remaining: R.add(-1)}
     };

     R.evolve(transformations)(tomato);
     //=> {name: 'TOMATO', data: {elapsed: 101, remaining: 1399}, id:123}

 * 本文将模拟 Ramada.evolve 函数的实现。
 */

const R = {}

R.toUpper = str => {
  if (str == null || typeof str !== 'string') {
    return ''
  }

  return str.toUpperCase()
}

R.add = val => {
  return typeof +val !== 'number' ? NaN : (+val + 1)
}

R.evolve = transform => {
  if (typeof transform !== 'object') {
    throw new Error('[evolve] parm should be a object.')
  }

  return obj => {
    // TODO..针对此处 具体业务逻辑 --2018-9-13 12:08.

    return {
      ...obj,
      name: transform.name(obj.name),
      data: {
        ...obj.data,
        elapsed: transform.data.elapsed(obj.data.elapsed),
        remaining: transform.data.remaining(obj.data.remaining),
      }
    }
  }
}


// test your simulation.
var tomato = {
  name: 'Tomato',
  data: {elapsed: 100, remaining: 1400},
  id:123
};
var transformations = {
  name: R.toUpper,
  // data: {elapsed: R.add(1), remaining: R.add(-1)}
  data: {elapsed: R.add, remaining: R.add}
};

R.evolve(transformations)(tomato);
