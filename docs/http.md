This is docs for http

## CORS

> 跨域请求

## 127.0.0.1 vs 0.0.0.0

> localhost ， 0.0.0.0 (本机IP) 的区别

1. 127.0.0.1是回送地址，指本地机，一般用来测试使用。回送地址是本机回送地址（Loopback Address），即主机IP堆栈内部的IP地址，主要用于网络软件测试以及本地机进程间通信，无论什么程序，一旦使用回送地址发送数据，协议软件立即返回，不进行任何网络传输。
2. localhost是本地DNS解析的127.0.0.1的域名，这个你打开本机的hosts文件就可以看到，一般位于c:\windows\system32\driver\etc下，一般在最后有这么一行：
127.0.0.1        localhost
而这个localhost你可以随意更改，如果改成百度，新浪之类的www.baidu.com重启你再试一下，就会发现很有意思了。
3. 本机IP则指你连到网络上的IP地址，可以是内网地址，当然也可能是公网IP，这个就是你实际利用TCP/IP协议与网上计算机通信时使用的IP了。


## 参考

1. [vue 为什么会发两次请求](https://www.cnblogs.com/Tohold/p/9173137.html)