'use strict';
const Service = require('egg').Service;

class FlyService extends Service {
    async start() {
        const { ctx } = this;
        const result_weixin = await this.weixinFlyDriver();
        ctx.body = "FLY OK";
    }

    // 定时执行scrapy任务
    async weixinFlyDriver() {
        const fly_server_url = this.app.config.FlyServerUrl;
        const data = await this.get_1_article();
        // const data = await this.get_1_article_test();
        if(data !== false){
            const data_json = JSON.parse(JSON.stringify(data));
            console.log(data_json);
            // 拼接curl地址
            const url = fly_server_url + "receive_article";
            console.log(url);
            const result = await this.ctx.curl(
                url, {
                    method: 'POST',
                    data: data_json
                }
            );
            console.log(result)
            return result;
        }
        console.log('No Weixin Need To Fly!');
        return null;
    }

    async get_1_article() {
        // const rows = await this.app.mysql.select('push_weixin_articles_pool', {
        //     orders: [['push_time', 'asc']],
        //     where: {
        //         'status': 1,
        //         'article_value': 2
        //     }
        // });
        const time_13 = new Date().getTime();
        const time_limit = Math.floor(time_13 / 1000) - this.app.config.TimeLimit;
        const my_query = "SELECT * FROM push_weixin_articles_pool where is_cloud = 0 and sort != 0 and sort != 1 and sort != 2 and sort != 8 and is_local = 1 and push_time > " + time_limit + " order by id desc limit 0,1;";
        console.log(my_query);
        const rows = await this.app.mysql.query(my_query);
        console.log(rows);
        if(rows.length > 0){
            let row = rows[0];
            row.issue_date = Math.floor(time_13 / 1000);
            console.log(row);
            // 将是否以同步上云改为1-已同步
            const new_row = {
                id: row.id,
                is_cloud: 1
            }
            const result = await this.app.mysql.update('push_weixin_articles_pool', new_row);
            const updateSuccess = result.affectedRows === 1;
            console.log('updateSuccess:',updateSuccess);
            if(updateSuccess){
                return row;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }


    // 单元测试函数
    async get_1_article_test() {
        const time_13 = new Date().getTime();
        const time_limit = Math.floor(time_13 / 1000) - this.app.config.TimeLimit;
        const my_query = "SELECT * FROM push_weixin_articles_pool where status = 10 and push_time > " + time_limit + " order by id desc limit 0,1;";
        const rows = await this.app.mysql.query(my_query);
        console.log(rows);
        if(rows.length > 0){
            let row = rows[0];
            row.issue_date = Math.floor(time_13 / 1000);
            console.log(row);
            return row;
        }else{
            return false;
        }
    }
}
module.exports = FlyService;