// 每次发起真正的请求之后，都会经过的地方

$.ajaxPrefilter(function(config){

  // // 封装一个把key=value 转成json格式的字符串
  // const format2Json = (source) => {
  //   let rarget ={}
  //   source.split('&').forEach((item)=>{
  //     let kv = item.split('=')
  //     // let kv =item.replace('=',':')
  //     rarget[kv[0]]=kv[1]
  //     // console.log(JSON.stringify(kv));
  //     // return JSON.stringify(kv)
   
  //     // console.log(rarget[kv[0]]=kv[1]);
  //   })
  //   return JSON.stringify(rarget)
  // //  console.log(rarget);
  // }

//  console.log(rarget);

  // 在此处基准地址拼接一下
  config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
  // 统一设置请求头
  config.contentType= 'application/json'

  //统一设置求的参数 -post 请求
  // config.data =config.data && format2Json(config.data1)

// 请求路径中/my这样的字符串的需要添加
// indexOf startsWith endsWith includes 包含包括的意思。，
  // 统一设置请求头(有条件的添加)
  // config.headers['Authorization'] = localStorage.getItem('big_news_token') || ''  
 if(config.url.includes('/my/')!== -1){
  config.headers ={
    Authorization:localStorage.getItem('big_news_token') || '' 
  }
 }
 

//  统一添加错误回调
config.error=function(cpe){
  // console.log(cpe);
    if(cpe.responseJSON?.code == 1 && cpe.responseJSON?.message =="身份认证失败！"){
     
      localStorage.clear()
      location.href = '/home/login.html'
    }
  }

})