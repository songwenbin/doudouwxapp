// pages/leftvideo/leftvideo.js
Page({
  data:{
    left_uri: null
  },
  onLoad:function(options){
    var that = this
    that.setData({
      left_uri: encodeURI(options.lefturi)
    })
    //console.log(options.left_uri)
    //console.log(data.left_uri)
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})