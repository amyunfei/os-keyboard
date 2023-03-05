module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'feat', // （feature）新特性、新功能
        'fix', // 修复bug
        'perf', // 优化相关，比如提升性能、体验
        'chore', // 其他修改, 比如改变构建流程、或者增加依赖库、工具等
        'docs', // 修改文档
        'refactor', // 代码重构，理论上不影响功能逻辑
        'revert', // 版本回退
        'style', // 修改代码格式，不影响代码逻辑
        'test', // 修改测试用例
        'ci', // 持续集成修改
        'merge' // 分支代码合并
      ]
    ]
  }
}