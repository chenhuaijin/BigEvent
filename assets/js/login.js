$(function(){
  const url1 = 'http://big-event-vue-api-t.itheima.net'
  // 点击去注册
  $('#go2Reg').on('click',function(){
    $('.login-wrap').hide()
    // $('.reg-wrap').stop().fadeIn()
    $('.reg-wrap').stop().slideDown()
  })

  // 点击去登入
  $('#goLogin').on('click',function(){
   
    // $('.login-wrap').stop().fadeIn()
    $('.login-wrap').stop().slideDown()
    $('.reg-wrap').hide()
  
  })


  // 封装一个把key=value 转成json格式的字符串
const format2Json = (source) => {
  let rarget ={}
  source.split('&').forEach((item)=>{
    let kv = item.split('=')
    // let kv =item.replace('=',':')
    rarget[kv[0]]=kv[1]
    // console.log(JSON.stringify(kv));
    // return JSON.stringify(kv)
 
    // console.log(rarget[kv[0]]=kv[1]);
  })
  return JSON.stringify(rarget)
//  console.log(rarget);
}

    // 自定义表单从layui取出form
    const  form= layui.form
    const  layer =layui.layer

      form.verify({
        pass: [/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
      // 校验密码
      repwd:function(value){
        // 判断密码框的值，和再次密码做比较
        // 获取密码框的值 和 确认密码框的值比较
        if($('#password').val()!== value){
          return `两次密码不一致，请重新输入！`
        }
      }
      })



  // const format2Json = (source) => {
  //   let target = {}
  //   source.split('&').forEach((el) => {
  //     let kv = el.split('=')
  //     target[kv[0]] = kv[1]
  //   })
  //   return JSON.stringify(target)
  // }



// 新的请求地址：http://big-event-vue-api-t.itheima.net
//给注册表单添提交事件（会刷新浏览器）
$('#formReg').on('submit',function(e){
  // 阻止跳转
  e.preventDefault()

  //发起了 ajax 
  // 经过分析：1.修改Content-Type:'applicaltion/json'
$.ajax({
  method:'POST',
  url:`/api/reg`,
  // 后端需要的是json格式
  contentType:'application/json',
  // contentType: 'application/json',
//   data: JSON.stringify({
//     username: $('#formReg [name=username]').val(),
//     password: $('#formReg [name=password]').val(),
//     repassword:$('#formReg [name=repassword]').val()
// }),
    // data:format2Json($(this).serialize()),
    data: format2Json($(this).serialize()),
success(res){
  //  console.log(res);
  if(res.code !== 0) return layer.msg(res.message)

  $('#goLogin').click()
  layer.msg('注册成功')
},

})

})



// 监听登陆

    $('#formLogin').on('submit',function(e){
      e.preventDefault()
      // console.log('登录成功')
      $.ajax({
        method:'POST',
        url:`/api/login`,
        contentType:'application/json',
        data: format2Json($(this).serialize()),
        success(res){
          if(res.code !== 0) return layer.msg(res.message)
          // location.href = '/home.html'

          // 纯数据
          // token 意思是令牌的意思（下一次请求）
          localStorage.setItem('big_news_token',res.token)
          // 固定写法：Bearer token字符串、Bearer 为持票人拿着token去请求
          location.href = '/home/home.html'
          layer.msg('登录成功')
        }
      })
    })


    })




