'use strict';
const moment = require('moment');
const Service = require('egg').Service;

class ParseService extends Service {
    async start() {
        const { ctx } = this;
        await this.weixinDriver();
    }

    // 定时执行scrapy任务
    async weixinDriver() {
        const scrapyd_server_url = this.app.config.ParseServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "api/parse/";
            const result = await this.ctx.curl(
                url, {
                    method: 'GET'
                }
            );
            console.log(result)
    }
}
module.exports = ParseService;