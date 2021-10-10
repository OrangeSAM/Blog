---
title: Node读取目录生成VuePress配置
---

1. 文件名不能带有`:`
2. 目前猜测，如果是最后一个，那么文件就不会被读取，而有些目录所有文件都能被读取，是因为刚好有readme在兜着
3. `e.title === (dirSplitArr[3] ? dirSplitArr[3] : dirSplitArr[2]) `不加括号会先执行`===`判断
