---
title: JS | 异步
---
单线程模型
单线程模型指的是，JavaScript只在一个线程上运行，即JavaScript只能同时执行一个任务，其他任务都必须在后面排队等待。
理解为单向单车道。

注意，JavaScript 只在一个线程上运行，不代表 JavaScript 引擎只有一个线程。事实上，JavaScript 引擎有多个线程，单个脚本只能在一个线程上运行（称为主线程），其他线程都是在后台配合。
我是不是可以理解为一个脚本一个线程

单线程让整个JavaScript世界变得简单，但也由此造成只要有一个任务耗时很长，后面的任务都必须排队等着，以至于影响整个程序的运行。

不管 IO 操作，挂起处于等待中的任务，先运行排在后面的任务。等到 IO 操作返回了结果，再回过头，把挂起的任务继续执行下去。这种机制就是 JavaScript 内部采用的“事件循环”机制（Event Loop）。

web worker 标准 允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM

线程与进程  是不是浏览器的一个页面就是一个进程，在这个页面中 JavaScript引擎占用其中的一个线程  明天重新开机后 做个试验  到资源监视器 观察浏览器进程 和线程


同步任务和异步任务
程序里面的所有任务，可以分为同步任务和异步任务
同步任务是那些没有被引擎挂起 在主线程上排队执行的任务，只有前一个执行完，后一个才会被执行。
是不是就和JavaScript里的任务栈关联起来了， settimeout这些就是异步任务
异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。
只有引擎任务某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有”堵塞“效应。


任务队列和事件循环
JavaScript 运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。（实际上，根据异步任务的类型，存在多个任务队列。为了方便理解，这里假设只存在一个队列。）

首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。
在这个过程中 异步任务会讲究顺序吗， 是哪个先满足条件就先去主线程执行吧？
噢答案是 事件循环
引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）。


异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。如果一个异步任务没有回调函数，就不会进入任务队列，也就是说，不会重新进入主线程，因为没有用回调函数指定下一步的操作。
找个例子？

异步操作的模式
	1. 回调函数
	回调函数的优点是简单、容易理解和实现，缺点是不利于代码的阅读和维护，各个部分之间高度耦合（coupling），使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况），而且每个任务只能指定一个回调函数。
	function f1(callback) {
	  // ...
	  callback();
	}
	function f2() {
	  // ...
	}
	f1(f2);
	2. 事件监听
	这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以”去耦合“（decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。阅读代码的时候，很难看出主流程。
	function f1() {
	  setTimeout(function () {
	    // ...
	    f1.trigger('done');
	  }, 1000);
	}
	f1.on('done', f2);
	3. 发布 订阅
	事件完全可以理解成”信号“，如果存在一个”信号中心“，某个任务执行完成，就向信号中心”发布“（publish）一个信号，其他任务可以向信号中心”订阅“（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做”发布/订阅模式”（publish-subscribe pattern），又称“观察者模式”（observer pattern）。pubsub.js
	function f1() {
	  setTimeout(function () {
	    // ...
	    jQuery.publish('done');
	  }, 1000);
	}
	jQuery.subscribe('done', f2);
	
	4. 异步操作的流程控制
	async(1, function (value) {
	  async(2, function (value) {
	    async(3, function (value) {
	      async(4, function (value) {
	        async(5, function (value) {
	          async(6, final);
	        });
	      });
	    });
	  });
	});
	回调地狱
	5. 串行执行
	6. 并行执行
	7. 并行与串行的结合

定时器
setInterval指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的时间。因此实际上，两次执行之间的间隔会小于指定的时间。比如，setInterval指定每 100ms 执行一次，每次执行需要 5ms，那么第一次执行结束后95毫秒，第二次执行就会开始。如果某次执行耗时特别长，比如需要105毫秒，那么它结束后，下一次执行就会立即开始。

setTimeout和setInterval的运行机制，是将指定的代码移出本轮事件循环，等到下一轮事件循环，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就继续等待。

settimeout（fn,0） 会让fn排在下一轮事件循环的开头

promise
promise对象是JavaScript的异步操作解决方案，为异步操作提供统一接口。
他起到代理的作用，充当异步操作和回调函数之间的中介，使得异步操作具备同步操作的接口。

总的来说，传统的回调函数写法使得代码混成一团，变得横向发展而不是向下发展。
promise就是解决这个问题的，使得异步流程可以写成同步流程。

因此 promise的最终结果只有两种
	异步操作成功，promise实例传回一个值value，状态变为fulfilled
	异步操作失败，promise实例抛出一个错误error，状态变为rejected
	
promise.prototype.then()
promise实例的then方法，用来添加回调函数
then方法可以接受两个回调函数，第一个是异步操作成功时的回调函数，第二个是异步操作失败时的回调函数，一旦状态改变，就调用相应的回调函数。

promise的报错具有传递性。

但是，Promise 的回调函数不是正常的异步任务，而是微任务（microtask）。它们的区别在于，正常任务追加到下一轮事件循环，微任务追加到本轮事件循环。这意味着，微任务的执行时间一定早于正常任务。

Promise执行顺序的例子
```javascript
function testSometing() {
    console.log("testSomething");
    return "return testSomething";
}

async function testAsync() {
    console.log("testAsync");
    return Promise.resolve("hello async");
}

async function test() {
    console.log("test start...");

    const testFn1 = await testSometing();
    console.log(testFn1);

    const testFn2 = await testAsync();
    console.log(testFn2);

    console.log('test end...');
}

test();

var promiseFn = new Promise((resolve)=> { 
                    console.log("promise START...");
                    resolve("promise RESOLVE");
                });
promiseFn.then((val)=> console.log(val));

console.log("===END===")
```
