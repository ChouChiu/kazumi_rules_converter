# Kazumi 规则转换工具

将 `kazumi://` 协议链接中的 Base64 编码内容与 JSON 格式互相转换的在线工具，用于向 [Kazumi 规则仓库](https://github.com/Predidit/KazumiRules) 提交规则。

## 功能特性

- 双向转换 — 支持 `kazumi://` → JSON 解码和 JSON → `kazumi://` 编码
- 语法高亮 — JSON 输出支持高亮显示，便于阅读和校验
- 一键复制 — 转换结果直接复制到剪贴板
- 纯客户端 — 所有转换在浏览器内完成，无服务端、无数据上传
- MD3 设计 — 基于 Material Design 3 的暗色界面，主题色取自 [Kazumi](https://github.com/Predidit/Kazumi) 项目的[默认绿色](https://github.com/Predidit/Kazumi/blob/main/lib/app_widget.dart#L132)，即 $`\color{#4CAF50}\blacksquare`$ #4CAF50


## 使用方法

### 解码（kazumi:// → JSON）

1. 选择 `kazumi:// → JSON` 模式
2. 粘贴以 `kazumi://` 开头的编码字符串
3. 点击「转换」，查看格式化后的 JSON 输出

### 编码（JSON → kazumi://）

1. 选择 `JSON → 编码` 模式
2. 输入或粘贴 JSON 内容
3. 点击「转换」，获取可提交的 `kazumi://` 链接

## 开发

包管理器使用 **Bun**。安装依赖并启动开发服务器：

```sh
bun install
bun dev
```

其他常用命令：

```sh
bun build        # 生产构建
bun lint         # Biome 静态检查
bun check        # Biome 自动修复
```

## 转换原理

解码流程：

1. 去除 `kazumi://` 前缀，提取 Base64 字符串
2. `atob()` 解码为二进制字符串
3. `TextDecoder("utf-8")` 转换为 UTF-8 文本
4. `JSON.parse()` 解析并格式化输出

编码流程：

1. `JSON.parse()` 验证并压缩 JSON
2. `TextEncoder()` 转换为 UTF-8 字节
3. `btoa()` 编码为 Base64
4. 拼接 `kazumi://` 前缀输出

## 许可证

[MIT License](LICENSE)
