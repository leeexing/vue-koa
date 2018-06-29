This is docs of Nginx

特点：
内核的设计非常微小和简洁，完成的工作也非常简单，仅仅通过配置文件将客户端请求映射到一个 location block（location 是 Nginx配置中的一个指令，用于 URL 匹配），而在这个 location 中所配置的每个指令将会启动不同的模块去完成相应的工作。

Nginx 相对于 Apache 优点：
1) 高并发响应性能非常好，官方 Nginx 处理静态文件并发 5w/s
2) 反向代理性能非常强。（可用于负载均衡）
3) 内存和 cpu 占用率低。（为 Apache 的 1/5-1/10）
4) 对后端服务有健康检查功能。
5) 支持 PHP cgi 方式和 fastcgi 方式。
6) 配置代码简洁且容易上手。 

## 基本使用

> 主要就是配置文件搞懂

1. 启动

解压至c:\nginx | 假设ngnix文件的安装目录就在c盘

`运行nginx.exe(即nginx -c conf\nginx.conf)，默认使用80端口`

2. 使用

`http://localhost`

3. 关闭

`nginx -s stop 强制关闭 ` or `taskkill /F /IM nginx.exe > nul`
`nginx -s quit 安全关闭 `

4. 重启

`nginx -s reload 改变配置文件的时候，重启nginx工作进程，来时配置文件生效 `

5. 查看日志

`nginx -s reopen 打开日志文件`

6. 查看nginx进程

`tasklist /fi "imagename eq nginx.exe"`

E:\Leeing\vue\vue-koa\docs\nginx.conf

### 具体配置

> 可以查看下面的 `配置文件范本`

1. 接下来就是重点的

```js
// Http 模块的核心组件和变量

三个作用域： http、server、location

server
语法：server {...}
作用域：http
含义：配置一台虚拟机

location
语法：location [=|~|~*|^~] /uri/ { ... }
作用域：server
含义：配置访问路径的处理方法

listen
语法：listen address:port [ default [ backlog=num | rcvbuf=size | sndbuf=size | accept_filter=filter | deferred | bind | ssl ]
默认值：listen 80
作用域：server
含义：指定当前虚拟机的监听端口

alias
语法：alias file-path|directory-path; 
作用域：location
含义：该指令设置指定location使用的路径，注意，他跟 root 相似，但是不改变文件的根路径，仅仅是使用文件系统路径

root
语法：root path
默认值：root html
作用域：http，server，location
含义：alias指定的目录是准确的，root是指定目录的上级目录，并且该上级目录要含有location指定名称的同名目录
区别：
  location /abc/ {
    alias /home/html/abc/;
  }
  在这段配置下，`http://test/abc/a.html` 就指定的是 `/home/html/abc/a.html`

  这段也可以这么写
  location /abc/ {
    root /home/html/;
  }
  这样，nginx就会去找 '/home/html/' 目录下的abc目录了，得到的结果是相同的
```

2. 常用场景配置

```js
http {
    include             mime.types;
    default_type        application/octet-stream;
    sendfile            on;
    keepalive_timeout   65;
    upstream allserver {
        #ip_hash;
        server 127.0.0.1:8083 down;
        server 127.0.0.1:8084 weight=3;
        server 127.0.0.1:8001;
        server 127.0.0.1:8002 backup;
    }
    server {
        listen       8012;
        server_name  localhost;
        location / {
            proxy_pass http://allserver;
        }
    }
}
```

*. ip_hash; nginx中的ip_hash技术能够将某个ip的请求定向到同一台后端，这样一来这个ip下的某个客户端和某个后端就能建立起稳固的session

## 配置文件范本

```conf

# -------------------------------基本模块

# 使用的用户和组
#user  nobody;

# 开启进程数 <=CPU数  
worker_processes  1;

# 错误日志保存位置 
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

# 进程号保存文件；可以使用 kill -HUP cat /var/log/nginx.pid/ 对Nginx进行配置文件重新加载。
pid        logs/nginx.pid;

# -------------------------------事件模块

#等待事件
events {
    # 每个进程最大连接数（最大连接=连接数x进程数）
    worker_connections  1024;
}

# -------------------------------http模块。三个作用域：http, server, location  

http {
    # 文件扩展名与文件类型映射表 
    include       mime.types;
    # 默认文件类型
    default_type  application/octet-stream;

    # 日志文件输出格式 这个位置相当于全局设置 
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    # 请求日志保存位置
    #access_log  logs/access.log  main;

    #开启调用 `Linux` 的sendfile(), 提高文件传输效率
    sendfile        on;
    # 是否允许使用socket的TCP_NOPUSH或TCP_CORK选项
    #tcp_nopush     on;

    # 指定客户端连接保持活动的超时时间，在这个时间后，服务器会关掉连接
    keepalive_timeout  65;

    # 打开gzip压缩
    #gzip  on;

    # 设定负载均衡的服务器列表。为后端服务器提供简单的负载均衡
    # upstream myproject {
        # weigth参数表示权值，权值越高被分配到的几率越大
        # max_fails 当有#max_fails个请求失败，就表示后端的服务器不可用，默认为1，将其设置为0可以关闭检查
        # fail_timeout 在以后的#fail_timeout时间内nginx不会再把请求发往已检查出标记为不可用的服务器
        # 这里指定多个源服务器，ip:端口,80端口的话可写可不写

        # server 192.168.1.78:8080 weight=5 max_fails=2 fail_timeout=600s;
        # server 192.168.1.222:8080 weight=3 max_fails=2 fail_timeout=600s;
    # }

    # -------------------------------server具体配置

    # 🎈配置一台虚拟主机 
    server {

        listen       7018;      #监听IP端口
        server_name  localhost; #主机名

        #charset koi8-r;        #设置字符集

        #access_log  logs/host.access.log  main;    #本虚拟server的访问日志 相当于局部变量

        # 对本server"/"启用负载均衡
        # 配置访问路径的处理方法
        location / {
            root   E:/Leeing/vue/work/anjianba_pc/dist; #定义服务器的默认网站根目录位置
            index  index.html index.htm;                #定义首页索引文件的名称

            #以下是一些反向代理的配置可删除.  
            # proxy_redirect off;   
            # proxy_set_header Host $host;   
            # proxy_set_header X-Real-IP $remote_addr;   
            # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;   
            # client_max_body_size 10m; #允许客户端请求的最大单文件字节数   
            # client_body_buffer_size 128k; #缓冲区代理缓冲用户端请求的最大字节数，   
            # proxy_connect_timeout 90; #nginx跟后端服务器连接超时时间(代理连接超时)   
            # proxy_send_timeout 90; #后端服务器数据回传时间(代理发送超时)   
            # proxy_read_timeout 90; #连接成功后，后端服务器响应时间(代理接收超时)   
            # proxy_buffer_size 4k; #设置代理服务器（nginx）保存用户头信息的缓冲区大小   
            # proxy_buffers 4 32k; #proxy_buffers缓冲区，网页平均在32k以下的话，这样设置   
            # proxy_busy_buffers_size 64k; #高负荷下缓冲大小（proxy_buffers*2）   
            # proxy_temp_file_write_size 64k; #设定缓存文件夹大小，大于这个值，将从upstream服务器传 
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        error_page   500 502 503 504  /50x.html;    # 定义错误提示页面
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    # server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    # }
    server {
       listen       8700;
       server_name  localhost;

       location / {
           root   E:/Leeing/node/besame/css3;
           index  grid/index.html;
       }
    }


    server {
       listen       5000;
       server_name  localhost;

       location /upload/ {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';
            proxy_pass  http://localhost:8001/upload/;
       }

       location /getimg/ {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';
            proxy_pass  http://localhost:8001/getimg/;
       }
    }


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```

## 参考

1. [Nginx 入门教程](https://blog.csdn.net/u013474746/article/details/53733556)