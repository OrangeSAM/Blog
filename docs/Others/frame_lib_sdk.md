---
title: 类库和框架
---
1. 类库：封装好的代码，通过调用开放出来的API获取相应的功能
2. 框架：也是封装好的代码，不过会功能更加多样，一个框架会包含多个类库，并且框架面向的顶层的开发，而类库更多的是面向底层的开发。
3. SDK：Software Development Kit， 软件开发工具包，指辅助开发某一类软件的相关文档、范例和工具的集合。其中也包括开发框架和类库。

来自 <https://zhidao.baidu.com/question/2012032196870217308.html> 



your code calls a library but a framework calls your code.
什么意思？也就是，
• 当你在调用library的时候， 你按照自己的意愿来control他（比如jQuery）。
• 而，对于framework， 那么control就是倒转过来了，是他在调用你（比如bootstrap), 就像是Hollywood的一个principle: Don't call Us, We'll call You

来自 <https://segmentfault.com/q/1010000000752015> 


框架其实是对底层的封装，将一些相同的，不会变化的东西封装一下，让它自动化的完成，可以提高开发效率，减轻工作量。根据封装功能的不同，就有了很多不同的框架了。框架是建立在基础的api之上的。

来自 <http://blog.csdn.net/u012960536/article/details/46688901> 



Inversion of control 
控制反转
把创建对象的权力交给框架，是框架的重要特征

I always thought of a library as a set of objects and functions that is focused around solving a particular problem or around a specific area of application development (i.e. database access); a framework on the other hand is a collection of libraries centered around a particular methodology (i.e. MVC) and covers all areas of application development.

来自 <https://stackoverflow.com/questions/148747/what-is-the-difference-between-a-framework-and-a-library> 



我们所说的前端框架与库的区别？ - CSDN博客
http://blog.csdn.net/c14210220635c/article/details/72933930







