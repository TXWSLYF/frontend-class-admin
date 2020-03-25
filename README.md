# 前端小课后台

## 运行项目

### 安装依赖
```
yarn install
```

### 本地开发
```
yarn serve
```

### 打包
```
yarn build
```

### 代码格式检查
```
yarn lint
```

## 开发规范

### 分支命名规范
1. 主干分支：`master`		所有提供给用户使用的正式版本，都在这个主分支上发布
2. 开发分支：`dev` 		永远是功能最新最全的分支
3. 功能分支：`feature-*`	某个功能点正在开发阶段
4. 发布版本：`release-*`	发布定期要上线的功能
5. 修复分支：`fix-*`		修复线上代码的 bug

### git commit message 规范
1. `build`：主要目的是修改项目构建系统(例如glup，webpack，rollup的配置等)的提交
2. `ci`：主要目的是修改项目继续完成集成流程(例如Travis，Jenkins，GitLab CI,Circle)的提交
3. `doc`：对应的文档更新
3. `feat`：项目中的新增功能(feature)
4. `fix`：bug修复
5. `pref`：性能优化
6. `refactor`：重构代码(既没有新功能，也没有修复bug)
7. `style`：不影响程序逻辑的代码修改(更加规范，加入空白符，补全分号)
8. `test`：新增测试用例或是更新现有测试
9. `revert`：回滚某个更早之前的提交
10. `chore`：不属于以上类型的其他类型

