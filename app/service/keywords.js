'use strict';
const Service = require('egg').Service;

class KeywordsService extends Service {
    async start() {
        const { ctx } = this;
        await this.keywordsDriver();
    }

    // 定时执行分析关键词的任务
    async keywordsDriver() {
        const scrapyd_server_url = this.app.config.AiServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "ai/keywords/parse";
        const result = await this.ctx.curl(
            url, {
            method: 'GET'
        }
        );
        console.log(result)
    }

    // 将关键词推送至云端，并修改本地数据库
    async flyKeywordsDriver() {
        const my_query = "SELECT * FROM push_keywords where is_cloud = 0";
        console.log(my_query);
        const rows = await this.app.mysql.query(my_query);
        const fly_server_url = this.app.config.FlyServerUrl;
        // 拼接curl地址
        const url = fly_server_url + "/keywords/";
        for(const word of rows){
            const data = {
                'word': word['word'],
                'hot_num': word['hot_num'],
                'add_time': word['add_time'],
                'is_cloud': 1,
                'status': 1
            }
            const result = await this.ctx.curl(
                url, {
                    method: 'POST',
                    data: data
                }
            );
            if(result){
                // 修改数据，将会根据主键 ID 查找，并更新
                const row = {
                    'id': word['id'],
                    'is_cloud': 0
                };
                const result_update = await this.app.mysql.update('posts', row); // 更新 posts 表中的记录
            }
        }
    }
}
module.exports = KeywordsService;