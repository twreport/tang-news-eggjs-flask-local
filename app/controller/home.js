'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'Service "eggjs_parse" is OK!';
  }
  async testp() {
    const { ctx } = this;
    await ctx.service.fly.start()
  }
  async test_weibo() {
    const { ctx } = this;
    await ctx.service.weibo.start()
  }
  async test_weixin() {
    const { ctx } = this;
    await ctx.service.weixin.start()
  }
  async test_top() {
    const { ctx } = this;
    await ctx.service.top.start()
  }
  async test_keywords() {
    const { ctx } = this;
    await ctx.service.keywords.start()
  }
  async test_flykeywords() {
    const { ctx } = this;
    await ctx.service.flykeywords.start()
  }
  async test_dict() {
    const { ctx } = this;
    await ctx.service.dictionary.start()
  }
  async test_flytopic() {
    const { ctx } = this;
    await ctx.service.fly.start();
  }
}

module.exports = HomeController;
