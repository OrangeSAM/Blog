---
title: JavaScript核心原理精讲
---
## 开篇词

## 基本功测试之数据类型

```javascript
[] == ![] // true, 史诗级迷惑
// 解析
// 首先可以推断出右边一定是false，
// 对于左边，我的看法是直接Boolean([])等于true，但true == false 肯定为false，
// 坤哥前端群张哥的解释是，左边得这样算，Boolean([].valueOf().toString())，这样算下来确实左边就是false，满足最终答案true，
// 但不解的点在于为什么要这样算
// 深圳前端群发胖的菜鸡给的官方链接(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)里
// 写到，如果一边是Boolean，另一边是对象，就得ToPrimitive(A) == ToNumber(B)，这就和张哥说的对上了。
// 因为ToPrimitive通过尝试调用A.toString()和A.valueOf()方法，将A转换为原始值。
// 即，a = []，a.valueOf().toString() => "", "" == false => true


null == undefined // true
// 解析
// 对于'=='，如果其中一个操作值是null或者undefined，那么另一个操作符必须为null或者undefined，才会返回true，否则都返回false

Number(null) // 0
// 规定，记着就好了

parseInt('') // NaN
// 解析
// 如果第一个字符不能转换为数字，parseInt会返回NaN，但Number('')是0，所以这里计算为NaN是因为没有字符？

{} + 10 // 10
// 解析： 对象在作为操作数时，解释器总是优先调用valueOf()， 而其他情况，解释器总是认为我们想要的是字符串，所以会优先调用toString() 因此对象在前面返回结果就是Number;其他情况对象默认用toString
10 + {} // 10[object Object]
```
`Object.prototype.toString.call()// 判断数据类型`
*强制类型转换的方法*

`Number(), String(), Boolean, ParseInt, ParseFloat, toString()`

## 基本功测试之深浅拷贝

引用与浅拷贝的区别就在于： 对第一层数据是否依旧修改后互相影响。

### 浅拷贝的方法
- Object.assign()
- ...
- Array.concat()
- Array.slice()


### 浅拷贝实现的逻辑
- 对基础类型做一个最基本的拷贝
- 对引用类型开辟一个新的存储，并且拷贝一层对象属性

### 手写浅拷贝
```javascript
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? []: {};
    for (let prop in target) {
      // 这一步是为了排除target原型链上其他属性
      if (target.hasOwnProperty(prop)) {
          cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

### 深拷贝
深拷贝实现了内存上的分离

各种版本的深拷贝

- 乞丐版
    JSON.parse(JSON.stringfy())
    缺陷: 
    1. 拷贝的对象的值中如果有函数、undefined、symbol 这几种类型，经过 JSON.stringify 序列化之后的字符串中这个键值对会消失；
    
    2. 拷贝 Date 引用类型会变成字符串；
    
    3. 无法拷贝不可枚举的属性；
    
    4. 无法拷贝对象的原型链；
    
    5. 拷贝 RegExp 引用类型会变成空对象；
    
    6. 对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；
    
    7. 无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)。
    
- 基础版，手写递归实现
只能处理对象形式的，跟乞丐版没差。
```javascript
function deepClone(obj) { 
  let cloneObj = {}
  for(let key in obj) {                 //遍历
    if(typeof obj[key] ==='object') { 
      cloneObj[key] = deepClone(obj[key])  //是对象就再次调用该函数递归
    } else {
      cloneObj[key] = obj[key]  //基本类型的话直接复制值
    }
  }
  return cloneObj
}
```

**你写的每一行代码都是需要经过深思熟虑并且非常清晰明白的，这样你才能经得住面试官的推敲。**

- 改进版

上面两种版本中尚待解决的问题：
1. 针对能够遍历对象的不可枚举属性以及symbol类型，我们可以使用reflect.ownKeys方法；
2. 当参数为Date、RegExp类型，则直接生成一个新的实例返回。
3. 利用Object的getOwnPropertyDescriptors方法可以获得对象的所有属性，以及对应的特性，顺便结合Object的create方法创建一个新对象，并继承传入原对象的原型链
4. 利用 WeakMap 类型作为 Hash 表，因为 WeakMap 是弱引用类型，可以有效防止内存泄漏（你可以关注一下 Map 和 weakMap 的关键区别，这里要用 weakMap），作为检测循环引用很有帮助，如果存在循环，则引用直接返回 WeakMap 存储的值。


## 继承的六种方式

`Object.create()`，用于创建一个新对象，且新对象的__proto__等于所提供的现有的对象。
```javascript
let sam = {
  name: 'sam'
}
let a = Object.create(sam)
a//打印出a为一个空对象，其上一级原型为对象sam
__proto__:
    name: "sam"
    __proto__:
// 如果想通过先给a赋值，再使用object.create改变其原型，那么不会有用。我的理解是再赋值就有点字面量的感觉了，会覆盖掉之前的赋值。
// 如果想在改变a原型的时候，同时给a设置属性，需要用到第二个参数。
let b = Object.create(sam, {
  name: {
    value: 'b'
  }
})
b//
name: "cc"
    __proto__:
        name: "sam"
        __proto__

// 创建一个没有原型的对象
let c = Object.create(null, {
  name: {
    value: 'cc'
  }
})
let c = {}
c.__proto__ = null
```
### 原型链继承
```javascript
function Parent1() {
    this.name = 'parent1';
    this.play = [1, 2, 3]
}

function Child1() {
    this.type = 'child2';
}

Child1.prototype = new Parent1();

console.log(new Child1());
```
不明白的点：
1. 对于一个函数来说，prototype和__proto__的差别


## 继承进阶，如何实现new apply bind call的底层逻辑

new 关键词的主要作用就是执行一个构造函数，返回一个实例对象。
new 分为一下几个步骤
- 创建一个新对象
- 将构造函数的作用域赋给新对象(this指向新对象)
- 执行构造函数中的代码(为这个新对象添加属性)
- 返回新对象

**new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是 return 语句指定的对象。**

**call、apply 和 bind 是挂在 Function 对象上的三个方法，调用这三个方法的必须是一个函数。**

---

## 函数那些事：JS闭包难点剖析

全局作用域，

函数作用域，

块级作用域，if语句及for语句后面{}这里面所包括的，就是块级作用域

闭包：定义在函数内部的，可以访问在函数内部变量的函数。

当访问一个变量时，代码解释器会首先在当前的作用域查找，如果没找到，就去父级作用域去查找，直到找到该变量或者不存在父级作用域中，这样的链路就是作用域链。

**闭包产生的本质就是：当前环境中存在指向父级作用域的引用。**

可以借用setTimeout的第三个参数传值到第一个参数函数里头
```javascript
for(var i=1;i<=5;i++){

  setTimeout(function(j) {

    console.log(j)

  }, 0, i)

}

```

## 数组原理

1. 伪数组转数组的几个方式
```javascript
Array.prototype.slice.call(arguments);

args = [].slice.call(arguments);

Array.prototype.concat.apply([], arguments);

args = Array.from(arguments);

args = [...arguments];

```

## 数组排序

时间复杂度由小到大：`O(1) => O(log n) => O(n) => O(n log n) => O(n^2) => O(2^n) => O(n!)`，尽量不要超过n^2

![排序算法](https://s0.lgstatic.com/i/image/M00/94/A8/CgqCHmAZALyAd98RAAE5AoAl_us191.png)

### 冒泡排序
效率低
冒泡排序中i 计算是第几趟，还是前后坐标中的一个
```javascript
// 我这里算的就是第几趟，还需要再研究下课程里的代码
let a = [9,2,46,23,99]
let bubbleSort = (arr) => {
  // 优化
  const len = arr.length
  if (len < 2) return
  for(let i = 0; i < len; i++) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        let temp = a[j]
        arr[j] = arr[j+1] 
        arr[j+1] = temp
      }
    }
  }
  return arr
}
console.log(bubbleSort(a))
```

### 快速排序
```javascript
// 我觉得比较容易理解的
// 要有递归思想，reclusive
let a = [92,12,34,83,2,922]

let quickSort = (arr) => {
  if (arr.length <= 1) return arr
  let pivot = Math.floor(arr.length / 2)
  let pivotVal = arr.splice(pivot, 1)[0]
  let left = [], right = []
  arr.forEach(e => {
    if (e < pivotVal) {
      left.push(e)
    } else {
      right.push(e)
    }
  })
  return quickSort(left).concat(pivotVal).concat(quickSort(right))
}

console.log(quickSort(a))
```

```javascript
// 错误代码示范
// 问题出在取pivot值的时候，直接取了值，没有splice，这样留下中值就会在后面比较的时候遇到问题
// 以如下代码为例，在进行到第三轮的时候，pivot为3131，此时没有任何值大于3131，包括他自身，这样会陷入quickSort(right)的死循环
// 如果添加等于大于等于处理，仍然会遇到问题，在进行到第二轮的时候，21为left的中指，而由于等于号，也会进入left的死循环
let a2 = [2,29,292,38,21,3131,44,1]

let quickSort = (arr) => {
  if (arr.length < 2) return arr
  let pivot = arr[Math.floor(arr.length / 2)]
  console.log(pivot,222)
  let left = [], right = []
  arr.forEach(e => {
    if (e > pivot) {
      left.push(e)
    } else {
      right.push(e)
    }
  })
  console.log(left, right)
  return quickSort(left).concat(quickSort(right))
}
console.log(quickSort(a2))
```

### 选择排序
找出最小的值，和第一项交换
除开第一项，再找出最小的值，和第一项交换

```javascript
let a = [92, 12, 34, 83, 2, 922]

let selectSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    // 结构赋值，快速交换
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}

console.log(selectSort(a))
```

## JS异步编程
- 回调函数
- 事件监听
- promise
- Generator
- async/await

## JS垃圾回收
栈内存中的基本类型，可以通过操作系统直接处理而堆内存中的引用类型，正是由于可以经常变化，大小不固定，因此需要JavaScript的引擎通过垃圾回收机制来处理。

chrome的v8引擎将堆内存分为两类，新生代的回收机制和老生代的回收机制。
新生代：
- from to
- scavenge算法处理内存碎片

老生代：
- 只要是经历过一次scavenge算法回收的，就可以晋升为老生代内存对象
- 老生代内存中的垃圾回收，采用mark-sweep(标记清除)和mark-compact(标记整理)的策略

内存泄露：

- 含义：
    在JavaScript中，已经分配堆内存地址的对象由于长时间未释放或者无法释放，造成了长期占用内存，使内存浪费，最终导致运行的应用响应速度变慢以及最终崩溃的情况。
- 场景： 
    - 过多的缓存未释放
    - 闭包太多未释放
    - 定时器或者回调太多未释放
    - 太多无效的DOM未释放
    - 全局变量太多未被发现

- 解决方案：
    - 减少不必要的全局变量，使用严格模式避免意外创建全局变量
    - 使用完数据后，及时解除引用（闭包中的变量，DOM引用，定时器清除）
    - 优化代码逻辑
    
## 事件轮询：如何理解浏览器中EventLoop
- 事件轮询是JS引擎做的事

- JS引擎背后在同时运转的东西
    
    - 调用堆栈 call stack 负责跟踪所有要执行的代码，调用堆栈存储要被执行的函数
    - 事件队列 event queue 负责将新的function发送到调用堆栈中处理
    - 每当调用事件队列 event queue 中的异步函数时，都会将其发送到浏览器API
        - 比如 settimeout，API会一直等到指定的时间后再将此操作（我理解为函数）送会事件队列处理
            - 在这里来说，我的理解是JS引擎不管计时的问题，他只管函数的执行，计时的事交给浏览器去做。
            - 而浏览器计时不准的原因也出现在这里，当“此操作被送回事件队列时”，事件队列如果还有还有别的事件待处理，耗时或多或少都会导致计时器的不准，所以不是计时器算的不准，是在执行的时候被迫不准
    - JS语言本身是单线程的，而浏览器API充当单独的线程
        - 事件循环促进了这一过程
        - 它会不断检查调用堆栈是否为空，如果为空，则从事件队列中添加新的函数进入调用堆栈 call stack；
        - 如果不为空，则处理当前函数的调用？疑惑，主语问题，主语是call stack 还是线程？
        现在的疑惑，什么控制了从队列添加到调用栈，因为他说有的话就不加，但是我们又会遇到调用栈有很多个函数的情况
        那是不是call stack也不一定被退路，也有主动拉入的情况，比如在函数里面调用了另一个函数
        
        事件队列 任务队列 两种叫法没大差别，意思一样，重点在队列
    
    ![事件循环EventLoop逻辑](https://s0.lgstatic.com/i/image6/M00/17/43/CioPOWBHaz-AIvXzAAMjXUqLjBw024.png)    
    e.g
    ```javascript
    function fn() {
      setTimeout(() => {
        console.log('sam')
      }, 1000)
    }
    ```
    以如上代码理解调用堆栈和事件队列以及浏览器API的运转，首先函数fn出现在事件队列event queue 中，

    - Evenloop 内部通过两个队列来实现Event Queue放进来的异步任务。
        - 以settimeout为代表的任务被称为宏任务，放到宏任务队列 macrotask queue，又还包括 script（整体代码）、settInterval、setImmediate、I/O，UI rendering， event listener
        - 以promise为代表的的微任务被称为微任务，放到微任务队列 microtask queue，又还包括 process.nextTick，Object.observe，MutationObserver
    
    - 一次EventLoop会处理一个宏任务和所有这次循环中产生的微任务

```javascript
// 一段没有理解的代码
async function a() {
    console.log('a')
    await b()
    console.log('a end')
}

async function b() {
    console.log('b')
}

a()

setTimeout(function () {
    console.log('setTimeout')
}, 0)

new Promise(function (resolve, reject) {
    console.log('promise')
    resolve()
}).then(function () {
    console.log('then')
})

console.log('main end')
```

## 引擎进阶（上）：探究宏任务 & 微任务
- 微任务就是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。
- 咋