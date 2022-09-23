'use strict';
const Service = require('egg').Service;

class AvgService extends Service {
    async start() {
        const { ctx } = this;
        await this.weixinAvgDriver();
    }

    // 定时执行scrapy任务
    async weixinAvgDriver() {
        const scrapyd_server_url = this.app.config.ParseServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "api/parse/avg";
        const result = await this.ctx.curl(
            url, {
                method: 'GET'
            }
        );
        console.log(result)
    }
}
module.exports = AvgService;