---
title: MVC、MVP和MVVM
---

## `MVC ``
view: 视图，传送指令到`Controller`
Controller: 业务逻辑，完成业务逻辑后，要求`Model`改变状态
Model: 数据保存，将新的数据发送到`View`，用户得到反馈

## `MVP`
1. 各部分之间的通信，都是双向的。
2. `View`和`Model`不发生联系，都通过`Presenter`传递
3. `View`非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，
而 `Presenter`非常厚，所有逻辑都部署在那里。

## `MVVM`
`MVVM`模式将MVP模式中的`presenter`改名为`ViewModel`，基本上与MVP模式完全一致。
唯一的区别是，`MVVM`采用**双向绑定**，View的变动，自动反应在`ViewModel`