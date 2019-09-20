前些天公司有个需求需要用到 Node 实现，完成之后觉得自己调自己接口的感觉有点意思。此外，JD 中也总说能够熟练使用 Node 是加分项，现在以一个 ToDo 小应用作为学习 Node 开发的开始。

#### 需要的实现的需求

在命令行输入形如`node todo add/delete/list/done/edit`等命令完成对待办事项的增删改查。需求很简单，目的是通过对增删基本 API 的使用增进对 Node 的了解。

#### 分析如何实现

首先，我们的命令是直接输入在命令行中的，没有图形化界面。那就需要知道 Node 是如何获取命令行中参数的。

对于如何获取参数，谷歌一下，我就知道。
![](https://i.loli.net/2019/09/20/MKwkXzW8iRtZY7x.png)
以下是翻译搜索结果中第二条官方文档的解释

> 获取命令行中的参数，使用 process.argv。通过命令行传递参数是一个非常基本的编程任务，对于任何一个想要尝试编写命令行接口的人来说都是必要的。在 Node.js 以及和 C 相似的环境中，所有被 shell 接收的命令行参数都被传递到了一个叫 argv（即参数值的意思）的数组中。Node.js 以 process.argv 的形式把每一个运行中程序的该数组暴露出来。需要说明的是，参数数组中前两项`Node`命令所在的文件路径和当前执行脚本所在路径。

获取用户要进行的操作和内容之后，由于 JS 并不具备文件操作的能力，所以需要知道 Node 是如何操纵文件，这其中包含创建并写入甚至删除。这也是持久化存储的能力，需要在关闭进程后仍然能够获取之前的操作内容。

通过搜索`Node.js write and read file`就可以获得相关的解决方案了。但其实更可行的方式是直接在官方文档中直接搜索`write/read`这样的关键字。

#### 编码实现

通过我们之前的分析，我们可以编写如下代码：

```
// 获取命令行中除前面两项路径外的参数
let argus = process.argv.slice(2);

// 获取命令行输入的动作和内容
const action = argus[0];
const content = argus[1];
const content1 = argus[2];
```

获取到要执行的动作和参数后，就可以进一步操作了，增加删除或者编辑。这里很直接的想到可以用 switch 语句，不过 if 语句也行。可编写代码如下：

```
// 使用数组来保存这些操作后的内容
let tasklist = []
if (action === "add") {
    taskList.push([content, false]);
}
if (action === "list") {
    console.log(taskList);
}
if (action === "delete") {
    taskList.splice(content - 1, 1);
}
if (action === "done") {
    taskList[content - 1][1] = true;
}
if (action === "edit") {
    taskList[content - 1][0] = content1;
}
// 对于`edit` 和`done`的动作，这里简单处理为：完成即把该项的状态标志为true，编辑则把输入的第五个参数覆盖原来的任务内容。
```

写到这里，我们可以发现的问题是，任务列表的内容
