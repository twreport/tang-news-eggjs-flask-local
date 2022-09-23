/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '10.168.1.100',
        // 端口号
        port: '3306',
        // 用户名
        user: 'nodejs',
        // 密码
        password: 'tw7311',
        // 数据库名
        database: 'news',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1655880986046_237';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    // python分析地址
    ParseServerUrl: 'http://10.168.1.99:5000/',
    //ai分析服务器地址
    AiServerUrl: 'http://10.168.1.99:5001/',
    // tangwei.cc云端数据接收地址
    FlyServerUrl: 'https://tangwei.cc/api/',
    // 只分析两天之内的公众号文章
    TimeLimit: 2 * 24 * 60 * 60
  };

  return {
    ...config,
    ...userConfig,
  };
};
