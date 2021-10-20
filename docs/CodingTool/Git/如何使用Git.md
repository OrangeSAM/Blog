---
title: Git的使用
---
1. 操作流程
```shell script
Git add 文件名  / * /.
Git commit -m "some notes"
Git pull
Git push
```

出现vim的时候如何退出
如果是输出状态，首先按Esc键退出输入状态，然后按Shift+“;”，再输入q!或wq!（不保存改动，wq!是保存文件的写入修改）退出。

2. 错误的commit回退
![](https://i.loli.net/2020/04/03/L9f53ha4gV7JeUx.png)

3. 本地已有仓库推送到github
首先关联远程仓库git remote add origin，进行代码合并  git pull --rebase origin master，这个时候如果本地有同名的readme.md文件会冲突。
	
推送到远程：`git push -u origin master`
	
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


4. 分支切换与合并
git checkout -b hot-fix-sam 切换到新分支

如右图，先切换新分支，git checkout -b
完事把feature分支合并到新分支，git merge feature ---
处理完冲突，可push，然后在远端处理合并

5. 代码回滚：Reset、Checkout、Revert 的选择 · geeeeeeeeek/git-recipes Wiki
https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-%E4%BB%A3%E7%A0%81%E5%9B%9E%E6%BB%9A%EF%BC%9AReset%E3%80%81Checkout%E3%80%81Revert-%E7%9A%84%E9%80%89%E6%8B%A9

6. 如何与fork的项目保持同步
   https://www.cnblogs.com/haore147/p/4218611.html
   http://blog.csdn.net/binglumeng/article/details/59534975
