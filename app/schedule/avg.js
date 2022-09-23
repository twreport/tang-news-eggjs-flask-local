const Subscription = require('egg').Subscription;

class AvgDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 0 0/12 * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("parse weixin_local OK")
        await this.ctx.service.avg.start();
    }
}

module.exports = AvgDriver;