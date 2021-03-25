### 修改root密码：

update mysql.user set authentication_string=PASSWORD('123456'),plugin='mysql_native_password' where user='root';flush privileges;


### 以root登录

`mysql -u root -p密码`


### 配置root远程登录

##### 1.增加外网访问权限
```
 GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root用户密码';
FLUSH PRIVILEGES;
```

##### 2.开放3306端口的访问，编辑配置文件
`sudo vim /etc/mysql/mariadb.conf.d/50-server.cnf`
修改 bind-address为0.0.0.0

设置服务器防火墙，允许指定ip例如：192.168.31.181访问

`iptables -A INPUT -p tcp -s 192.168.31.181 --dport 3306 -j ACCEPT`

