const path = require('path');

const mocks = () => {};

// 配置公共请求路径
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));
  },
  devServer: {
    // 本地开发用mock
    before: mocks,
    proxy: {
      '/api': {
        target: 'http://test.admin.xhxly.cn:7002/',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
