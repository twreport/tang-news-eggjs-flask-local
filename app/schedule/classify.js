const Subscription = require('egg').Subscription;

class ClassifyDriver extends Subscription {
    // 将本地mysql数据库中分析好的push_weixin_articles发送到tangwei.cc云端
    // 每分钟同步一条
    static get schedule() {
        return {
            cron: '0 2/10 * * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("fly weixin_local OK")
        await this.ctx.service.classify.start();
    }
}

module.exports = ClassifyDriver;