---
title: 一笔日历
---
### 实现登录功能的逻辑
1. 根据userId / openId 判断当前用户是否登录
2. 调用wx.login获取到code
3. 调用服务端根据code获取openId
4. 根据用户授权获取用户信息，存入到数据库中

wx.login, 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。
wx.getSetting
wx.getUserInfo