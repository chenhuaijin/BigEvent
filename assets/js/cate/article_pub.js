$(function () {
  const layer = layui.layer
  const form = layui.form
  // 1. 初始化图片裁剪器
 const $image = $('#image')

  initCate()
  function initCate() {
    $.ajax({
      method: "GET",
      url: 'http://big-event-vue-api-t.itheima.net/my/cate/list',
      headers: {
        Authorization: localStorage.getItem('big_news_token')
      },
      success(res) {
        // console.log(res);
        if (res.code !== 0) return layer.msg('失败')
        layer.msg('成功')
        const html = template('tpl_cate', res)
        $('[name=cate_id]').html(html)
        // render 渲染的意思
        form.render()
      }
    })
  }

  // 初始化富文本编辑器
  initEditor()



  // 2. 裁剪选项
  let options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)


  // 打开系统文件筐
  $('#btnPub').on('click',function(){
    // 打开inputfile
    btnFIle.click()
   
  })


  // 监听btnFIle的cheange事件获取文件
  $('#btnFIle').on('change',function(e){
    // console.log(e)
    const file = e.target.files
    if(file.length === 0) return layer.msg('请选择文件')
    // console.log(file.length);
    // 根据选择的文件，创建一个对应的 URL 地址：
    const newImgURL = URL.createObjectURL(file[0])
    console.log(newImgURL);
    // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

   layer.msg('上传成功')

  })

  let state = "已发布"
  // 发布
 
  // 草稿
  $('#btnSeve2').on('click',function(){
    state = "草稿"


  })

  //from表单提交事件
  $('#from-pub').on('submit',function(e){
    e.preventDefault()
    //FromData() 把数据收集到一起 转成真实的DOM元素把表单
    let fd = new FormData($(this)[0])
    // 把获取到元素里面的state状态添加一下
    fd.append('state',state)
  //  fd.forEach((item,key)=>{
  //   console.log(item,key);
  //  })
  $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    // 把文件添加进表单
    fd.append('cover_img',blob)

    $.ajax({
      method: 'POST',
      url: 'http://big-event-vue-api-t.itheima.net/my/article/add',
      data: fd,
      headers: {
        Authorization: localStorage.getItem('big_news_token')
      },
      // 固定的写法
      processData: false,
      contentType: false,
      success(res) {
        if (res.code !== 0) return layer.msg('发布文章失败了')
        layer.msg('发布文章成功了')
        location.href = '/cate/article_list.html'
      }
    })
  })

  })

})