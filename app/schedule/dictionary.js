const Subscription = require('egg').Subscription;

class DictionaryDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 0/5 * * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("dict OK")
        await this.ctx.service.dictionary.start();
    }
}

module.exports = DictionaryDriver;
