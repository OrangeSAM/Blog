---
title: eventHub的实现
---
1. https://github.com/krasimir/EventBus
2. https://github.com/tbreuss/eventbus

```javascript
window.eventHub = {
    events: {
        //'新周刊':[fn],
    },
    emit(eventName, data) { //发布
        //循环事件中心的所有事件，查找和传入的事件相符的那个
        //存下所有订阅该事件的用户，
        for (let key in this.events) {
            if (key === eventName) {
                let fnList = this.events[key];
                fnList.map((fn) => {
                    fn.call(undefined, data)
                })
            }
        }
    },
    //要订阅的事件名，以及要执行的函数(回调)
    on(eventName, fn) { //订阅
        if (this.events[eventName] === undefined) {
            this.events[eventName] = [];
            //事件中心是否有人订阅这个事件，不存在则初始化
        }
        this.events[eventName].push(fn)
    }
}
```
