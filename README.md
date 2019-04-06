# RN项目示例

## 环境配置

参考[这里](https://reactnative.cn/docs/getting-started/)，“搭建开发环境”、“安装依赖”。

## 安装组件库

- 执行以下命令：
```
//安装依赖npm库
npm install
//链接原生手势操作
react-native link react-native-gesture-handler
//链接原生webview组件
react-native link react-native-webview
```
## 运行

安装完成之后，启动模拟器
```
react-native run-ios
```

执行以下命令启动项目：
```
npm start
```

如果修改文件后，刷新app没有更新最新内容，有可能是编译信息被缓存了，可执行以下命令使用重置缓存方式启动项目：
```
npm start --reset-cache
```