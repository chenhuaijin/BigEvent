$(function () {
  const layer = layui.layer
  const form = layui.form

  // 加载分类列表
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url: "/my/cate/list",
      success(res) {
        // console.log(res);
        if (res.code !== 0) return layer.msg('请求数据失败')
        let htmlTable = template('tpl-cate', res)
        $('tbody').empty().append(htmlTable)

      }
    })
  }


  //调用 加载分类列表
  loadCateList()

  //收集打开弹窗层的索引
  let index = null
  // 点击按钮添加类别
  $('#btnAdd').on('click', function () {
    // 弹出添加框 并把弹窗层的索引赋值
    index = layer.open({
      type: 1
      , title: '在线调试'
      , area: ['500px', '300px']
      , content: $("#tpl-add").html()
    });
  })

  // name=zs&age=18改造通道
  const format2Json = (source) => {
    let target = {}
    source.split('&').forEach((item) => {
      // console.log(item);
      let kv = item.split('=')
      // console.log(kv);
      // let kv =item.replace('=',':')
      target[kv[0]] = kv[1]
      // console.log(JSON.stringify(kv));
      // return JSON.stringify(kv)

      // console.log(target[kv[0]]=kv[1]);
    })
    return JSON.stringify(target)
    //  console.log(target);
  }
 // 加一个开关阀 用来记录当前是什么状态
  let isEdit = false
  // 利用事件委托进行弹出层表单的  submit事件 
  $('body').on('submit', '#addForm', function (e) {
    e.preventDefault()

    if (isEdit) {
      $.ajax({
        method: 'PUT',
        url: '/my/cate/info',
        data: format2Json($(this).serialize()),
        success(res) {
          if (res.code !== 0) return layer.msg('修改分类失败')
          layer.msg('修改分类成功')
          // 2、列表需要刷新
          loadCateList()
        }
      })
    } else {
      $.ajax({
        method: 'POST',
        url: '/my/cate/add',
        data: format2Json($(this).serialize()),
        // data: form.val('addFormFilter'),
        success(res) {
          if (res.code !== 0) return layer.msg('添加分类失败')
          layer.msg('添加分类成功')
          // 2、列表需要刷新
          loadCateList()
        }
      })
    }
    // 要记得把状态置为 默认值 false
    isEdit = false
    // 1、关闭弹框
    layer.close(index)


  })

  // 通过代理添加编辑事件因为编辑属于动态
  $('tbody').on('click', '.btnEdit', function () {
    // 点击编辑按钮吧开关变成开
    isEdit = true

    // 获取到动态添加的id
    // console.log('修改了' , $(this).attr('data-id'));
    //点击出现弹出层
    index = layer.open({
      type: 1
      , title: '在线调试'
      , area: ['500px', '300px']
      , content: $("#tpl-add").html()
    })

    const id = $(this).attr('data-id')
    // 获取-文章分类详情

    $.ajax({
      method: "GET",
      url: `/my/cate/info?id=${id}`,
      success(res) {
       
        if (res.code !== 0) return layer.msg('获取详情失败')
        layer.msg('获取详情成功')
        // 快速为表单进行赋值
        // console.log(res.data);
        form.val('addFormFilter', res.data)

      }
    })

  })

  // 通过代理点击删除按钮
  $('tbody').on('click', '.btnDel', function () {
    // 危险的操作需要弹出警告框
    const result = confirm('你确定要删除该条文章吗？')
    const id = $(this).attr('data-id')
    if (result) {
      $.ajax({
        method: 'DELETE',
        url: `/my/cate/del?id=${id}`,
        success(res) {
          if (res.code !== 0) return layer.msg('删除分类详情失败')
          layer.msg('删除分类详情成功')
          // 重新加载列表
          loadCateList()
        }
      })

    }
  })



})





