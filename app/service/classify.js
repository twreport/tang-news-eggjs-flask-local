'use strict';
const Service = require('egg').Service;

class ClassifyService extends Service {
    async start() {
        const { ctx } = this;
        await this.weixinClassifyDriver();
    }

    // 定时执行scrapy任务
    async weixinClassifyDriver() {
        const scrapyd_server_url = this.app.config.ParseServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "api/classify/";
        const result = await this.ctx.curl(
            url, {
                method: 'GET'
            }
        );
        console.log(result)
    }
}
module.exports = ClassifyService;