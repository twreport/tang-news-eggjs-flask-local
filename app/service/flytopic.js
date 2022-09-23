'use strict';
const Service = require('egg').Service;

class FlytopicService extends Service {
    async start() {
        const {ctx} = this;
        const result_topic = await this.topicFlyDriver();
        ctx.body = "FLY OK";
    }

    async topicFlyDriver() {
        const fly_server_url = this.app.config.FlyServerUrl;
        const data = await this.get_1_topic();
        // const data = await this.get_1_article_test();
        if (data !== false) {
            const data_json = JSON.parse(JSON.stringify(data));
            console.log(data_json);
            // 拼接curl地址
            const url = fly_server_url + "receive_topic";
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
        console.log('No Topic Need To Fly!');
        return null;
    }

    async get_1_topic() {
        const time_13 = new Date().getTime();
        const time_limit = Math.floor(time_13 / 1000) - this.app.config.TimeLimit;
        const my_query = "SELECT * FROM push_topic where is_cloud = 0 and add_time > " + time_limit + " order by id desc limit 0,1;";
        console.log(my_query);
        const rows = await this.app.mysql.query(my_query);
        console.log(rows);
        if (rows.length > 0) {
            let row = rows[0];
            console.log(row);
            // 将是否以同步上云改为1-已同步
            const new_row = {
                id: row.id,
                is_cloud: 1
            }
            const result = await this.app.mysql.update('push_topic', new_row);
            const updateSuccess = result.affectedRows === 1;
            console.log('updateSuccess:', updateSuccess);
            if (updateSuccess) {
                return row;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
module.exports = FlytopicService;