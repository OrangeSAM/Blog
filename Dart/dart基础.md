学习新技术, 不能陷入在语言的语法细节中, 先鸟瞰其全貌.

JavaScript 实际上是两类编程语言风格的混合产物, 简化的函数式编程风格, 与简化的面向对象编程风格.

- Dart 同时支持 just in time & ahead of time 的语言

**内存分配和垃圾回收**

**单线程模型**

> 这时，Dart 是单线程模型的优势就体现出来了，因为它天然不存在资源竞争和状态同步的问题。这就意味着，一旦某个函数开始执行，就将执行到这个函数结束，而不会被其他 Dart 代码打断。
> 所以，Dart 中并没有线程，只有 Isolate（隔离区）。Isolates 之间不会共享内存，就像几个运行在不同进程中的 worker，通过事件循环（Event Looper）在事件队列（Event Queue）上传递消息通信。

**无需单独的声明式布局语言**

### Dart 的变量与类型

可以用 var 或者具体的类型来声明一个变量, 当使用 var 定义变量时, 表示类型是由编译器推断决定的.
也可以使用静态类型去定义变量(理解写 JavaScript 和 typescript 之差)

在默认情况下, 未初始化的变量的值都是 null

Dart 是类型安全的语言，并且所有类型都是对象类型，都继承自顶层类型 Object，因此一切变量的值都是类的实例（即对象），甚至数字、布尔值、函数和 null 也都是继承自 Object 的对象。
(这就和 Js 有点不像了, JS 的基本类型并不继承自 object 类型)

#### **num bool String**

num 　包括　 int 和 double, 除了基本的运算符, 还可以使用继承自 num 类型的 abs() round()等方法

bool
dart 中不能像 JS 中这样来判断真假值,if (1)

String
实现字符串内嵌表达式在 dart 中并不用反引号, **"""** 这是 dart 的多行字符串

#### **List Map**

可以粗略地理解为数组和对象类型
这两个容器里的元素也需要由类型, 后续再对容器操作也需要按照一开始的类型
let arr1 = [1, 2, 3]// List<int>
let map1 = {"name": "sam", "age": "18"} // Map<string, string>

### 常量

const 变量在编译时就能确定的值
final 可以在运行时确定的值, 确定后不能更改

编程语言千差万别, 但归根结底, 其中的设计思想无非是想回答两个问题.
\*\*

1. 如何表达信息
2. 如何处理信息
   \*\*

作为一门真正面向对象的编程语言，Dart 将处理信息的过程抽象为了对象，
以结构化的方式将功能分解，而函数、类与运算符就是抽象中最重要的手段。

### 函数

函数是一段用来独立地完成某个功能的代码。我在上一篇文章中和你提到，在 Dart 中，所有类型都是对象类型，函数也是对象，
它的类型叫作 Function。这意味着函数也可以被定义为变量，甚至可以被定义为参数传递给另一个函数。(这倒跟 JS 很像)

### 类

类是特定类型的数据和方法的集合, 也是创建对象的模板.
dart 是面向对象的语言, 每个对象都是一个类的实例, 都继承自顶层类型 Object.
在类中声明变量和方法时, 在前面加上\* 即为私有方法和变量

- 的限制范围并不是类访问级别的, 而是库访问级别的. 这句话没懂.

```
class Point {
  num x, y;
  static num factor = 0;
  // 语法糖，等同于在函数体内：this.x = x;this.y = y;
  Point(this.x, this.y);
  void printInfo() => print('($x, $y)');// 这里加static和没加的区别是?
  static void printZValue() => print('$factor');
}

void main() {
  var p = Point(100, 200); // new 关键字可以省略
  p.printInfo(); // 输出 (100, 200);
  Point.printZValue(); // 输出 10
  Point.factor = 10;
  Point.printZValue(); // 输出 10
}
```

```
class Point {
  num x, y, z;
  Point(this.x, this.y) : z = 0; // 初始化变量 z 上下两句没看懂
  Point.bottom(num x) : this(x, 0); // 重定向构造函数
  void printInfo() => print('($x,$y,$z)');
}

void main() {
  var p = Point.bottom(100);
  p.printInfo(); // 输出 (100,0,0)
}

```

**复用**
在 dart 中, 可以对同一个父类进行继承或者接口实现:

1. 继承父类意味着，子类由父类派生，会自动获取父类的成员变量和方法实现，子类可以根据需要覆写构造函数及父类方法；
2. 接口实现则意味着，子类获取到的仅仅是接口的成员变量符号和方法符号，需要重新实现成员变量，以及方法的声明和初始化，否则编译器会报错。 没有很明白

```
class Point {
  num x = 0, y = 0;
  void printInfo() => print('($x,$y)');
}

//Vector 继承自 Point
class Vector extends Point {
  num z = 0;
  @override
  void printInfo() => print('($x,$y,$z)'); // 覆写了 printInfo 实现
}

//Coordinate 是对 Point 的接口实现, 这跟重新写一个类有差别吗
// class Coordinate implements Point {
//   num x = 0, y = 0; // 成员变量需要重新声明
//   void printInfo() => print('($x,$y)'); // 成员函数需要重新声明实现
// }

class Coordinate with Point {
}

void main() {
  var xxx = Vector();
  xxx
    ..x = 1
    ..y = 2
    ..z = 3; // 级联运算符，等同于 xxx.x=1; xxx.y=2;xxx.z=3;
  xxx.printInfo(); // 输出 (1,2,3)

  var yyy = Coordinate();
  yyy
    ..x = 1
    ..y = 2; // 级联运算符，等同于 yyy.x=1; yyy.y=2;
  yyy.printInfo(); // 输出 (1,2)
  print(yyy is Point); //true
  print(yyy is Coordinate); //true
}
```
