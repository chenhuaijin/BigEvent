$(function () {
  const layer = layui.layer
  const form = layui.form
  const laypage = layui.laypage
  template.defaults.imports.dataFormat = function (date) {
    let dt = new Date(date)

    let y = dt.getFullYear()
    let mon = (dt.getMonth() + 1 + '').padStart(2, '0')
    let day = (dt.getDate() + '').padStart(2, '0')
    let h = (dt.getHours() + '').padStart(2, '0')
    let min = (dt.getMinutes() + '').padStart(2, '0')
    let ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${mon}-${day} ${h}:${min}:${ss}`
  }

  let q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: '',
  }
  loadArticleList()


  function loadArticleList() {

    $.ajax({

      method: "GET",

      url: `/my/article/list?pagenum=${q.pagenum}&pagesize=${q.pagesize}&cate_id=${q.cate_id}&state=${q.state}`,
      success(res) {
        // console.log(res)

        if (res.code !== 0) return layer.msg('获取失败')
        layer.msg('获取成功')
        let str = template('tpl_List', res)

        $("tbody").empty().html(str)

        loadPage(res.total)
      }

    })
  }


  initCate()
  // 初始化文章分类的方法
  function initCate() {
    $.ajax({
      method: "GET",
      url: '/my/cate/list',
      success(res) {
        // console.log(res);
        if (res.code !== 0) return layer.msg('失败')
        layer.msg('成功')
        const html = template('tpl_cate', res)
        $('[name=cate_id]').empty().html(html)
        form.render()
      }
    })
  }


  // 点击按钮事件
  $('#from_shai').on('submit', function
    (e) {
    e.preventDefault()
    // 只需要处理一下参数，在直接调用获取列表的方法
    const cate_id = $('[name=cate_id]').val()
    q.cate_id = cate_id
    const state = $('[name=state]').val()
    q.state = state

    loadArticleList()

  })

  // 分页渲染
  function loadPage(total
  ) {
    laypage.render({
      elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
      , count: total //数据总数，从服务端得到
      , limit: q.pagesize
      , curr: q.pagenum //当前是第几页
      // count（总条目输区域）、prev（上一页区域）、page（分页区域）、next（下一页区域）、limit（条目选项区域）、refresh（页面刷新区域。注意：layui 2.3.0 新增） 、skip（快捷跳页区域）  ['prev', 'page', 'next']

      , layout: ['count', 'limit', 'prev', 'page', 'skip']
      , limits: [2, 3, 5, 6, 10]
      //点击跳转到第几页
      , jump: function (obj, first) {
        // console.log(obj.curr);
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        //首次不执行
        if (!first) {
          loadArticleList()
        }

      }
    })


  }


  //点击删除
  $('tbody').on('click', '.btnDel', function () {
    //获取按钮的个数长度
    let el = $('.btnDel').length

    // console.log('123');
    // console.log($(this).attr('data-id'))
    let id = $(this).attr('data-id')
    // 弹出警告框
    layer.confirm('确定要删除吗？', { icon: 3, title: '提示' }, function (index) {

      console.log(id);
      $.ajax({
        method: "DELETE",
        url: `/my/article/info?id=${id}`,
        success(res) {
          // console.log(res);
          if (res.code !== 0) return layer.msg('删除失败')
          layer.msg('删除成功')
          if (el === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          loadArticleList()
        }
      })

      layer.close(index);
    });

  })

 //收集打开弹窗层的索引
 let index = null
  // 编辑按钮
  $('tbody').on('click','#btnRedact',function(){
   index = layer.open({
       type: 1, 
      title: '分类编辑',
      area: ['500px', '300px']
      ,content: $('#tpl-add').html()
    });     
      
  })

})
