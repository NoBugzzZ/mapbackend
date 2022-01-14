## 环境
node v16.13.2  
npm 8.1.2

## 环境配置
|  操作系统   | 环境配置  |
|  -  | -  |
| mac  | 点击[官网安装器链接](https://nodejs.org/dist/v16.13.2/node-v16.13.2.pkg)下载安装即可 |
| 其他操作系统  | 参照[教程](https://www.runoob.com/nodejs/nodejs-install-setup.html)配置即可 |

## 安装依赖
```
npm install
```

## 运行
运行时需要指定mongodb的地址，需要将下列的命令中的${url}修改为你需要的地址
```
DB_URL=${url} npm start
```
例如一条完整命令如下
```
DB_URL=mongodb://localhost:27017/ npm start
```

## 端口
express框架默认使用的端口为3000，若想要自定义端口，一个完整例子如下
```
DB_URL=mongodb://localhost:27017/ PORT=3000 npm start
```
修改3000为你想要的端口即可。