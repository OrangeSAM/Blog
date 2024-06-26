---
title: 从输入URL到展示页面发生的事
---
https://www.cnblogs.com/xianyulaodi/p/6547807.html#_labelTop

DNS解析
    递归查询
        浏览器缓存 => 本级host => 家里的路由器 => 城市的路由器 => 继续向上层查找 => 顶级域名
    迭代查询
        自己挨个问
    缓存
        找到后会缓存，除Host外
        浏览器缓存，路由器缓存，IPS服务器缓存，根域名服务器缓存，顶级域名服务器缓存
    DNS 负载均衡
        将用户导向不同的IP，以用不同的服务器来响应

发起TCP链接
    三次握手，有点像去拜访别人家，先敲门看有没人在（syn_send状态），有人答应后（syn_recv状态），就准备进门（established状态）
    必须三次是为了保证有序，两次无法得到服务端的状态

发起HTTP请求

服务器处理
？

浏览器解析渲染
    HTML标记
    style/link 标记
    script 标记
    DOM 树和 CSSOM树合并成一个渲染树
    根据渲染树来计算布局，计算每个节点的几何信息
    将每个节点绘制到页面上
连接结束
    四次挥手
    

---

自己的思考

1. 浏览器获取到url
2. 对url进行处理
    - 是否是url
    - DNS寻址
3. 获取到目标IP地址发出请求
4. 接受服务器的响应
5. 对响应的内容进行处理
---

**来自拉勾前端进击**

大逻辑分为两部分：
1. 页面导航：用户输入 URL，浏览器进程进行请求和准备处理。
    - 浏览器进程
        - UI线程
            - URI，发起网络请求
            - 搜索词，进入搜索引擎
        - 网络线程
            - 发起请求， 接受响应，响应是HTML文件，数据传递到渲染器进程
                - 实际上是，网络线程通知UI线程，UI线程寻找渲染器进程进行渲染
                - 当数据和渲染器进程都准备完毕，HTML数据通过IPC从浏览器进程传递到渲染器进程
                - 线程和进程间有从属关系吗，比如这里说到的UI线程和渲染器进程
            - 响应是其他文件，数据传递到下载管理器
    - 渲染器进程
        - 接受HTML数据后，加载资源并渲染页面
        - 完成渲染后，通过IPC通知浏览器进程页面加载完成
        
2. 页面渲染：获取到相关资源后，渲染器进程负责选项卡内部的渲染处理。
    - 渲染器进程
        - 解析 parse
            - 解析HTML CSS JavaScript代码
            - 分别产生DOM节点树、CSS规则树，二者在布局阶段一并构造渲染树(render tree)
        - 布局 layout
            - 定位坐标和大小、是否换行、各种position、overflow、z-index等属性的计算
            - 渲染树的创建过程
        - 绘制 paint
            - 判断元素渲染层级顺序
            - 渲染器主线程会创建绘制记录
            - 如果渲染树发生了改变，渲染器会触发重绘(repaint，比如颜色改变)和重排(reflow，几何尺寸变化，重新计算，耗性能)
            - 重排又分为全局布局和增量布局
        - 光栅化 raster
            - 将计算后的信息转换为屏幕上的像素
            - 光栅化可以被GPU加速，光栅化后的位图被存储在GPU内存中




https://juejin.cn/post/6844903784229896199

https://juejin.cn/post/6935232082482298911