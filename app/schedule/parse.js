const Subscription = require('egg').Subscription;

class ParseWeixinDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 5/10 * * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("parse weixin_local OK")
        await this.ctx.service.parse.start();
    }
}

module.exports = ParseWeixinDriver;