---
title: 极客时间Git课程
---
Git switch 和 checkout的区别

ancillary

1. 使用Git之前需要做的最小配置
    a. 配置user信息
        i. Name
        ii. Email
    b. 配置的范围
        i. Local
        ii. Global
        iii. System
2. 创建第一个仓库并配置local用户信息
    a. Git config --local  user.name sam
    b. Git config --local user.email a@qq.com
    
    c. 清除设置
        i. Git config --unset --local user.name
        ii. Git config --unset --local user.email
3. 通过几次commit来认识工作区和暂存区
4. 给文件重名的简便方法
    a. Git mv readme readme.md
    b. 而不是直接使用mv命令
5. 通过git log查看版本演变历史
    a. Git log --oneline
        i. 以一行的方式查看提交记录仪
    b. Git log -n4 --oneline
        i. 限定查看的数量
    c. Git log -all --graph
        i. 图形化方式呈现
6. Gitk: 通过图形化界面工具来查看版本历史
    a. Patch & tree
    b. Git reset --hard 清楚暂存区文件
7. 探秘.git 目录
    a. Git branch -av?
    b. Cat 命令主要用来查看文件内容，创建文件，文件合并，追加文件内容等功能
    c. cat HEAD 查看HEAD文件的内容
    git cat-file 命令 显示版本库对象的内容、类型及大小信息。
    git cat-file -t 显示版本库对象的类型
    git cat-file -s 显示版本库对象的大小
    git cat-file -p 显示版本库对象的内容
    d. HEAD：指向当前的工作路径
    config：存放本地仓库（local）相关的配置信息。
    refs/heads:存放分支
    refs/tags:存放tag，又叫里程牌 （当这次commit是具有里程碑意义的 比如项目1.0的时候 就可以打tag）
    objects：存放对象 .git/objects/ 文件夹中的子文件夹都是以哈希值的前两位字符命名 每个object由40位字符组成，前两位字符用来当文件夹，后38位做文件
8. commit、tree和blob三个对象之间的关系
9. 小练习，数一数tree的个数
10. 分离头指针情况下的注意事项
11. 进一步理解Head和branch
		
	
	
	
