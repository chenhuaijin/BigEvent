// 每次发起真正的请求之后，都会经过的地方

$.ajaxPrefilter(function(config){



//  console.log(rarget);

  // 在此处基准地址拼接一下
  config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
  // 统一设置请求头
  config.contentType= 'application/json'

  //统一设置求的参数 -post 请求

  
})