$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)


  // 打开文件选择框
  $('#btnChoose').on('click', function () {
    file.click()
    console.log();
  })
  // 更换裁剪的图片
  // 监听文件上传的change事件
  $('#file').on('change', function (e) {
    // console.log(e);
    // 获取到图片
    const file = e.target.files[0]
    // console.log(file);
    // 判断数组长度是否等于<0
    if(e.target.files<=0)return layer.msg('请上传图片')
    // 根据选择的文件，创建一个对应的 URL 地址：
    const newImgURL = URL.createObjectURL(file)

    // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：

    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })
})