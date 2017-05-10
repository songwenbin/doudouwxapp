// pages/rightvideo/rightvideo.js
Page({
  data:{
    right_uri: null
  },
  onLoad:function(options){
    var that = this
    that.setData({
      right_uri: encodeURI(options.righturi)
    })
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