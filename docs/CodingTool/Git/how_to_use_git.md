---
title: Git的使用
---
操作流程
Git add 文件名  / * /.
Git commit -m "some notes"
Git pull
Git push

出现vim的时候如何退出
如果是输出状态，首先按Esc键退出输入状态，然后按Shift+“;”，再输入q!或wq!（不保存改动，wq!是保存文件的写入修改）退出。

查看

![](https://i.loli.net/2020/04/03/nf6sZIq98uD5l1x.png)

### 错误的commit回退
![](https://i.loli.net/2020/04/03/L9f53ha4gV7JeUx.png)

git log  查看commit 记录
git head ^  回退

【狀況題】剛才的 Commit 後悔了，想要拆掉重做… - 為你自己學 Git | 高見龍
https://gitbook.tw/chapters/using-git/reset-commit.html

5.2 代码回滚：Reset、Checkout、Revert 的选择 · geeeeeeeeek/git-recipes Wiki
https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-%E4%BB%A3%E7%A0%81%E5%9B%9E%E6%BB%9A%EF%BC%9AReset%E3%80%81Checkout%E3%80%81Revert-%E7%9A%84%E9%80%89%E6%8B%A9

### 本地已有仓库推送到github
首先关联远程仓库git remote add origin
进行代码合并  git pull --rebase origin master
	这个时候如果本地有同名的readme.md文件会冲突
	
推送到远程
	git push -u origin master
	
"
由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

来自 <https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013752340242354807e192f02a44359908df8a5643103a000> 

"

Github使用系列（二）：创建本地仓库并推送到远程仓库 - 知乎
https://zhuanlan.zhihu.com/p/32509976

### 关联本地仓库和git仓库
将本地项目、代码添加到github上 - 掘金
https://juejin.im/post/5dad6204f265da5b707ea903#heading-4

执行git pull 的时候还是会遇到refusing to merge unrelated histories 
这时同意下就好了
Git pull origin master --allow-unrelated-histories


https://blog.csdn.net/wd2014610/article/details/80854807

https://github.community/t5/How-to-use-Git-and-GitHub/How-to-deal-with-quot-refusing-to-merge-unrelated-histories-quot/td-p/12619
