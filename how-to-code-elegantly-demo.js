/**
 * @description
 *      用一个实例函数 revertStateFunc() 来说明：如何编写优雅的代码（优雅代码炼成记）
 * @author xiajiujiang239
 * @createtime 2017/12/5
 */


/**
 * 编程第一阶段：功能实现
 *
 * 主要缺点：
 *   1. idsArr 缺少容错性默认值；
 *   2. if (idsArr.length > 0) 其实可以简写；
 *   3. 一个函数中，如此密集的出现了两个 return，总觉得别扭；
 *   4. return 对象中存在着代码冗余。
 */
function revertStateFunc(state, action) {
  const idsArr = action.payload;
  if (idsArr.length > 0) {
    return {
      ...state,
      stateIds: idsArr,
      flag: false
    }
  }

  return {
    ...state,
    stateIds: idsArr,
  }
}


/**
 * 编程第二阶段：简介完备
 *
 * 其实，能优化到这一版本已经很不错了。至少看上去，代码简练精干，书写的落落大方，
 * 也没有障眼碍眼的冗余、拖沓的代码。
 *
 * 那么，还能够如何优化呢？
 *
 * 答案便是：优雅，极致的优雅！如果说编程只有一种追求的话，那必定是“优雅”。
 *
 * 代码优雅的思路？
 *   1. if-else 中，能不用 else 分支就不用；
 *   2. 能用三元运算符取代 if 的，就用三元运算符；
 *   3. 能体现函数式编程思想的代码，甚好；
 *   4. ....
 *
 */
function revertStateFunc(state, action) {
  const idsArr = action && action.payload || [];
  const newState = {
    ...state,
    stateIds: idsArr,
  };
  if (idsArr.length) {
    Object.assign(newState, { flag: false });
  }

  return {
    ...state,
    stateIds: idsArr,
  }
}


/**
 * 编程第三阶段：代码优雅
 *
 * 突出特点：
 *   1. 代码数量急剧降低了，可读性姣好；
 *   2. 代码简介明了，没有一丝残余，就像身姿曼妙的女性一样，没有一丝赘肉；
 *   3. 变量、方法等，各司其职，恰如其分；
 *   4. 赏心悦目，是也。
 *
 * “优雅”自定义：
 *     增之一分则高，去之一分则低；就像女子的比基尼装，穿多了则凸显不了身材，穿少了则容易暴露bug。
 *     一句话形容，不能再少了！
 *
 *  ——jiangxtx 2017-12-5
 */
function revertStateFunc(state, action) {
  const idsArr = action && action.payload || [];
  const newState = {
    ...state,
    stateIds: idsArr,
  };

  return !idsArr.length ? newState : Object.assign(newState, { flag: false });
}