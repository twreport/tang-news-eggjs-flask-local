'use strict';
const Service = require('egg').Service;

class ScanService extends Service {
    async start() {
        const { ctx } = this;
        await this.pushWeixinDriver();
    }

    // 定时执行scrapy任务
    async pushWeixinDriver() {
        const scrapyd_server_url = this.app.config.ParseServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "api/parse/scan";
        const result = await this.ctx.curl(
            url, {
                method: 'GET'
            }
        );
        console.log(result)
    }
}
module.exports = ScanService;