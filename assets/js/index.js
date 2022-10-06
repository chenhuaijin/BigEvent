$(function(){

  const layer = layui.layer

function getUserInfo(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    // headers:{
    //   Authorization: localStorage.getItem('big_news_token')||''
    // },
    success(res){
      // console.log(res);
      if(res.code !== 0) return layer.msg(res.message)
  
      renderAvatar(res)
      // getUserInfo(res)
      // 按需渲染头像
      // if(res.data.user_pic){
      //   $('.text-head').hide()
      //   $('.userinfo img').css('src',res.user_pic)
      // }else{
      //   $('.layui-nav-img').hide()
      //   // 显示文字头像，取username属性的第一个字母
      //   const char= res.data.username.charAt(0).toUpperCase()
      //   console.log(char);
      //   $('.text-head').html(char)
      // }
      // $('.text').html(`欢迎&nbsp;$nbsp;${res.data.username}`)
    },
    //  error(cpe){
    //   console.log(cpe);
    //     if(cpe.responseJSON?.code == 1 && cpe.responseJSON?.message =="身份认证失败！"){
         
    //       localStorage.clear()
    //       location.href = '/home/login.html'
    //     }
    //   }
    })
  
} 
getUserInfo()
  // 实现退出操作
  $('#btn-logout').on('click',function(){
    // // console.log('object');
    // const result = confirm('您确定需要退出吗？')
    // if(result){
    //     // 1.移出存储
    //     localStorage.removeItem('big_news_token')
    //     // localStorage.clear()
    //     location.href = '/home/login.html'
    // }

    layer.confirm('确定退出吗？', {icon: 3, title:'提示'}, function(index){
      //do something
      localStorage.removeItem('big_news_token')

      // 页面跳到登陆也、
      location.href = '/home/login.html'
      layer.close(index);
    });
  })

}

)
  // 调用 getUserInfo 获取用户基本形象
  function renderAvatar(user){
    // 设置用户的昵称 
    // console.log(user);
    let name = user.data.nickname || user.data.username
    // console.log(name);
      // 设置欢迎文本
    $('.text').html('欢迎&nbsp;&nbsp'+name)
    // 按需渲染用户的头像
    if(user.data.user_pic !== null){
      // 渲染图片头向
      $('.layui-nav-img').attr('src',user_pic).show()
      $('.text-head').hide()
    }else{
      // 渲染文本头像
      $('.layui-nav-img').hide()
      let first = name[0].toUpperCase()
      // console.log(first);
      $('.text-head').html(first).show()
  }}

  // exports.say = getUserInfo()