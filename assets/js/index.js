$(function(){

  const layer = layui.layer

getUserInfo()
  // 实现退出操作
  $('#btn-logout').on('click',function(){
    // // console.log('object');
    // const result = confirm('您确定需要退出吗？')
    // if(result){
    
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
     
    }
    })
  
} 

  // 调用 getUserInfo 获取用户基本形象
  function renderAvatar(user){
    let name = user.data.nickname || user.data.username
    // 设置欢迎文本
    $('.text').html('欢迎&nbsp;&nbsp'+name)
    // 按需渲染用户的头像
    if(user.data.user_pic !== null){
      // 渲染图片头向
      $('.layui-nav-img').attr('src',user.data.user_pic).show()
      $('.text-head').hide()
    }else{
      // 渲染文本头像
      $('.layui-nav-img').hide()
     
      let first = name[0].toUpperCase()
      // console.log(first);
      $('.text-head').html(first).show()
  }

  
}

  // exports.say = getUserInfo()