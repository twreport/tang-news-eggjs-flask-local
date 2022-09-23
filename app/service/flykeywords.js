'use strict';
const Service = require('egg').Service;

class FlykeywordsService extends Service {
    async start() {
        const { ctx } = this;
        await this.flyKeywordsDriver();
    }

    // 将关键词推送至云端，并修改本地数据库
    async flyKeywordsDriver() {
        const my_query = "SELECT * FROM push_keywords where is_cloud = 0";
        console.log(my_query);
        const rows = await this.app.mysql.query(my_query);
        console.log(rows);
        const fly_server_url = this.app.config.FlyServerUrl;
        // 拼接curl地址
        const url = fly_server_url + "/recieve_keywords/";
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
                    'is_cloud': 1
                };
                const result_update = await this.app.mysql.update('push_keywords', row); // 更新 posts 表中的记录
            }
        }
    }
}
module.exports = FlykeywordsService;