'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/testp', controller.home.testp);
  router.get('/test_weibo', controller.home.test_weibo);
  router.get('/test_weixin', controller.home.test_weixin);
  router.get('/test_top', controller.home.test_top);
  router.get('/test_keywords', controller.home.test_keywords);
  router.get('/test_flykeywords', controller.home.test_flykeywords);
  router.get('/test_dict', controller.home.test_dict);
  router.get('/test_flytopic', controller.home.test_flytopic);
};
