const Subscription = require('egg').Subscription;

class ScanDriver extends Subscription {
    // 将mongo数据库中符合条件的公众号文章push到mysql
    // 每小时的10分钟左右开始,便于让分析种类和地理信息的程序完成
    static get schedule() {
        return {
            cron: '0 7/10 * * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("scan weixin_local OK")
        await this.ctx.service.scan.start();
    }
}

module.exports = ScanDriver;