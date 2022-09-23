const Subscription = require('egg').Subscription;

class LocationDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 0/10 * * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("parse weixin_local OK")
        await this.ctx.service.location.start();
    }
}

module.exports = LocationDriver;