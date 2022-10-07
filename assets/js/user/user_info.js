$(function(){
  // const m1 = require('../index')
  const form = layui.form
  const layer = layui.layer

  // 定义规则
  form.verify({
    nickname:function(value){
      if(value.length>6){
        return '请输入1~6位的非空字符'
      }
      
    }
  })


  // 获取用户的相关信息
  const initInfo = ()=>{
    // 发起请求
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success(res){
        if(res.code!==0)return layer.msg('用户获取信息失败')
        // console.log(res);
        // 进行赋值和取值
        // 赋值给相应的键值对名字
        form.val('formUserInfo',res.data)
      }
    })
  }
  initInfo()

  // 给重置按钮添加点击事件
  $('#btnReset').on('click',function(e){
    e.preventDefault()
    // 获取用户的相关信息
    initInfo()
  })

  // 监听表单提交事件
  $('.layui-form').submit(function(e){
    // debugger
    e.preventDefault()

    // 打印表单的数据
    // 有值取值
  // console.log(form.val('formUserInfo'))

  // 发post请求修改服务器数据
  $.ajax({
    method:'PUT',
    url:"/my/userinfo",
    // 携带想往服务器添加的的参数
    // data:form.val('formUserInfo'),
    data:JSON.stringify(form.val('formUserInfo')),
    
    // data:$(this).serialize(),
    
    // data: URLDecoder.decode(form.val('formUserInfo')),
    success(res){
      console.log(res)
     
      if(res.code !== 0) {
        return layer.msg('更新用户信息失败')
      } 
      layer.msg('更新用户信息成功')
      // 调用父级页面里面的js方法
      window.parent.getUserInfo()
      // m1.say()
    }
  })
  })

})