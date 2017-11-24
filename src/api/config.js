export default (process.env.NODE_ENV === 'development'
  ? {
      // 开发环境
      pcHost: 'http://mao.test.umss.cn:8051', // pc
      // pcHost: 'http://10.0.51.36:8051', // pc
      videoHost: 'http://video-service.test.umss.cn',
      // pcHost: 'http://10.0.51.9:8080', // pc
      appHost: 'http://10.0.51.88:8052', // app毛文杰
      // appHost: 'http://10.0.51.36:8081', // app陈文超
      appCommentHost: 'http://10.0.0.128:8085' // 王应建
    }
  : {
      // 发布环境
      pcHost: `${location.origin}`, // pc
      appHost: `${location.origin}`, // app
      appCommentHost: 'http://10.0.0.128:8085',
      videoHost: 'http://video-service.test.umss.cn'
    });
