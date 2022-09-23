'use strict';
const Service = require('egg').Service;

class DictionaryService extends Service {
    async start() {
        const { ctx } = this;
        await this.dictDriver();
        await this.stopDriver();
    }

    // 定时执行获取分词新词的任务
    async dictDriver() {
        const scrapyd_server_url = this.app.config.FlyServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "dict_words/";
        const result = await this.ctx.curl(
            url, {
                method: 'GET'
            }
        );
        const dict_list = JSON.parse(result.data.toString())
        console.log(dict_list)
        for(const dic of dict_list){
            const dict_list_obj = {'data': dic.word}
            await this.updateDict(dict_list_obj)
        }
    }

    // 定时执行获取停止词新词的任务
    async stopDriver() {
        const scrapyd_server_url = this.app.config.FlyServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "stop_words/";
        const result = await this.ctx.curl(
            url, {
                method: 'GET'
            }
        );
        const dict_list = JSON.parse(result.data.toString())
        console.log("====================stop words============================")
        console.log(dict_list)
        for(const dic of dict_list){
            const dict_list_obj = {'data': dic.word}
            await this.updateStop(dict_list_obj)
        }

    }

    // 通知ai_parse更新词库
    async updateDict(data) {
        const scrapyd_server_url = this.app.config.AiServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "ai/keywords/dict";
        const result = await this.ctx.curl(
            url, {
                method: 'POST',
                data: data
            }
        );
        console.log(result)
    }

    // 通知ai_parse更新停止词词库
    async updateStop(data) {
        const scrapyd_server_url = this.app.config.AiServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "ai/keywords/stop";
        const result = await this.ctx.curl(
            url, {
                method: 'POST',
                data: data
            }
        );
        console.log(result)
    }

}
module.exports = DictionaryService;