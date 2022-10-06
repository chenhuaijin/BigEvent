$(function(){
  const form = layui.form
  const layer= layui.layer
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    // value给谁用谁就
    // 如果和原密码相同return出去
    samePwd:function(value){
      if(value === $('[name=old_pwd]').val()){
        return '新旧密码不能相同'
      }
    },
    // 确认密码 两次不一致return不一致
    rePwd:function(value){
      if(value !== $('[name=re_pwd]').val()){
        return '两次密码不一致，请重新输入'
      }
    }
  })


  
  // 监听表单提交事件
  $('.layui-form').submit(function(e){
    e.preventDefault()

    $.ajax({
      method:'PATCH',
      url:'/my/updatepwd',
      data:form.val('formPass'),
      success(res){
        if(res.code !== 0) return layer.msg('修改密码失败')
        layer.msg('修改密码成功')

          // $('#btnReset').click()//调用 reset 按钮  

        // 表单元素名转成dom元素使用reset()方法
        $('.layui-form')[0].reset()
      }
    })
  })

})