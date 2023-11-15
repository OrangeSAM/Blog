(window.webpackJsonp=window.webpackJsonp||[]).push([[152],{356:function(s,n,e){"use strict";e.r(n);var a=e(3),t=Object(a.a)({},(function(){var s=this,n=s.$createElement,e=s._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h3",{attrs:{id:"题目内容"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#题目内容"}},[s._v("#")]),s._v(" 题目内容")]),s._v(" "),e("p",[s._v("给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。\n比如，给定数组"),e("code",[s._v("[1,2,3,4,5]")]),s._v("和k为3，应该返回的数组为"),e("code",[s._v("[3,4,5,1,2]")]),s._v("。")]),s._v(" "),e("p",[s._v("解完此题的最大意义不是让我熟悉和掌握了旋转数组的各种方法，而是让我学到了一个新的词"),e("code",[s._v("原地算法")]),s._v("。为什么要提及这个词，在尝试下面所说的第二种解法时，陷入了一个浏览器能返回答案，但是LeetCode就是不给过的问题中。")]),s._v(" "),e("p",[s._v("我跟代码交流的原则一直是：如果有问题，先重试一遍，如果仍然出现，必须乖乖认错。但是这情况就傻眼了，浏览器和LeetCode竟然没有返回一致的答案。有点三体中基础物理失效的感觉。")]),s._v(" "),e("p",[s._v("当时没有细看题目的说明，补充如下。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("1. 尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。\n2. 要求使用空间复杂度为 O(1) 的原地算法。\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("两条都是非常常规而普通的要求，以至于被我瞥一眼忽略了。在第二条中，有一个词是"),e("code",[s._v("原地算法")]),s._v("。当时不以为意，管你什么算法，能抓到老鼠就是好猫。没想到抓了只蝙蝠。")]),s._v(" "),e("p",[s._v("题目要求至少三种不同解法，虽然题目看着简单。但老实说一开始我并没有想出三种，两种分别是：")]),s._v(" "),e("ul",[e("li",[s._v("pop方法和unshift方法结合，用队列的思想，出队一个就再让它进队。")]),s._v(" "),e("li",[s._v("数组的splice方法和concat方法，剪切需要翻转的部分并拼接。")])]),s._v(" "),e("hr"),s._v(" "),e("h3",{attrs:{id:"解法一-pop跟unshift结合"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#解法一-pop跟unshift结合"}},[s._v("#")]),s._v(" 解法一，pop跟unshift结合")]),s._v(" "),e("p",[s._v("这个思路应该很容易想到，代码逻辑和实现上都比较简单。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("var rotate = function(nums, k) {\n    let len = nums.length\n    let convert = function (arr) {\n        let temp = arr.pop()\n        arr.unshift(temp)\n    \tk -=1\n        return arr\n    }\n    while (k > 0) {\n        convert(nums)\n    }\n};\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br")])]),e("p",[s._v("不过在题解区看到了这个思路更简化的写法，判断了边界条件让一些测试用例可以更快通过；此外，优化掉了我用到的那个"),e("code",[s._v("temp")]),s._v("临时变量。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("  let len = nums.length\n  if (len < 2) {\n    return\n  }\n  if (k < 0) {\n    return\n  }\n\n  while (k--) {\n    nums.unshift(nums.pop())  \n  }\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br")])]),e("hr"),s._v(" "),e("h3",{attrs:{id:"方法二-splice-和-concat"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方法二-splice-和-concat"}},[s._v("#")]),s._v(" 方法二，splice 和 concat")]),s._v(" "),e("p",[s._v("这个方法也不难，大思路还是跟方法一一样，都是把后面的元素挪到前面，只是在实现细节上不一样。")]),s._v(" "),e("p",[s._v("先看无论如何LeetCode也不会让我过的代码。具体实现上，先根据传入的"),e("code",[s._v("k")]),s._v("确定需要取出的数组部分。车就翻在第二个语句。")]),s._v(" "),e("p",[s._v("在分析问题为什么会出现之前，先来了解什么叫“原地算法”。")]),s._v(" "),e("blockquote",[e("p",[s._v("在计算机科学中，一个原地算法（in-place algorithm）基本上不需要额外辅助的数据结构,然而,允许少量额外的辅助变量来转换数据的算法。当算法运行时，输入的数据通常会被要输出的部分覆盖掉。不是原地算法有时候称为非原地（not-in-place）或不得其所（out-of-place）。 --- 维基百科")])]),s._v(" "),e("p",[s._v("简单来说，我的理解就是要完成的操作都是对于当前数组而不需要借助别的数组，即改变原数组自己。")]),s._v(" "),e("p",[s._v("回到下面的代码中，第二个语句使用了"),e("code",[s._v("concat")]),s._v("方法，而"),e("code",[s._v("concat")]),s._v("并不会改变原数组，而是返回一个拼接过的新数组。这也回应了写代码LeetCode自动生成的注释。")]),s._v(" "),e("blockquote",[e("p",[s._v("Do not return anything, modify nums in-place instead.")])]),s._v(" "),e("p",[s._v("所以在第二句中，即便我把"),e("code",[s._v("concat")]),s._v("方法返回的数组赋值给了nums。但此时，虽然结果看着是一样的，但"),e("code",[s._v("nums")]),s._v("数组原有引用地址已经变了。又传入的"),e("code",[s._v("nums")]),s._v("地址变为"),e("code",[s._v("concat")]),s._v("返回的那个地址。所以，不管代码中最后return的是啥，LeetCode测试结果只会追踪最开始传入"),e("code",[s._v("nums")]),s._v("引用地址的元素变动情况。")]),s._v(" "),e("p",[s._v("这也是我提交这代码后，提交结果显示我的答案是"),e("code",[s._v("nums")]),s._v("数组被剪切后剩下的部分的原因。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("var rotate = function(nums, k) {\n    let arr = nums.splice(nums.length - k, nums.length)\n    nums = arr.concat(nums)\n}\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("p",[s._v("由此，如果一定要用"),e("code",[s._v("splice")]),s._v("的话，就只能用"),e("code",[s._v("unshift")]),s._v("将其挨个推入原数组前面。不过这就没那么优雅了。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("var rotate = function(nums, k) {\n    let arr = nums.splice(nums.length - k, nums.length)\n    while (arr.length > 0) {\n        nums.unshift(arr[arr.length - 1])\n        arr.length -= 1\n    }\n    return nums\n};\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br")])]),e("hr"),s._v(" "),e("h3",{attrs:{id:"方法三-巧用splice"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#方法三-巧用splice"}},[s._v("#")]),s._v(" 方法三，巧用splice")]),s._v(" "),e("p",[s._v("对于"),e("code",[s._v("splice")]),s._v("，我们更熟悉的应该是他的删除能力，但其实"),e("code",[s._v("splice")]),s._v("也可以实现对数组在指定位置的元素添加操作。但因为里面的splice剪切出来的仍然是一个数组，所以需要用到"),e("code",[s._v("...")]),s._v("拓展操作符将其转为可直接放进数组中的元素。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("var rotate = function(nums, k) {\n    nums.splice(0, 0, ...nums.splice(nums.length - k, nums.length))\n};\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("blockquote",[e("p",[s._v("展开语法(Spread syntax), 可以在函数调用/数组构造时, 将数组表达式或者string在语法层面展开；还可以在构造字面量对象时, 将对象表达式按key-value的方式展开。")])])])}),[],!1,null,null,null);n.default=t.exports}}]);