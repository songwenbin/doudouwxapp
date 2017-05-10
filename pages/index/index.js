var usermap = require('../../utils/usermap.js')
var loginuser = null
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    battle: null,
    token: null,
    current_battle_id: null,
    left_uri: null,
    right_uri: null,
    username: null,
    progress: 0
  },

  playLeftVideo: function() {
    var that = this
    wx.navigateTo({
      url: "../leftvideo/leftvideo?lefturi=" + that.data.battle.leftVideo
    })
  },

  playRightVideo: function() {
    var that = this
    wx.navigateTo({
      url: "../rightvideo/rightvideo?righturi=" + that.data.battle.rightVideo
    })
  },
  
  leftVote: function() {
    var that = this
    console.log(that.data.token)
    that.followVideo(that.data.current_battle_id, that.data.token, 'left') 
  },

  rightVote: function() {
    var that = this
    console.log(that.data.token)
    that.followVideo(that.data.current_battle_id, that.data.token, 'right')
  },

  getToken: function(username, password) {
    var that = this
    wx.request({ 
      url: 'https://dd.doudouapp.com/users/sign_in.json',
      method: 'POST',
      data: { 
        appid : 'app123', 
        appsecret : '333', 
        email : username, 
        password : password
      }, 
      header: { 
        'Content-Type': 'application/json' 
      }, 
      success: function(res) { 
        console.log(res.data)
        console.log(res.data.authentication_token)
        that.setData({
          token: res.data.authentication_token
        })
        that.getBattle(username, res.data.authentication_token)
      }
    })
  }, 
  getBattle: function(username, token) {
    var that = this
    wx.request({ 
      url: 'https://dd.doudouapp.com/api/v1/battles.json',
      method: 'GET',
      data: { 
        appid: 'app123', 
        appsecret: '333', 
        user_email: username, 
        user_token: token
      }, 
      header: { 
        'Content-Type': 'application/json' 
      }, 
      success: function(res) { 
        console.log(res.data)
        console.log(res.data.id)
        
        that.setData({
          battle: res.data,
          current_battle_id: res.data.id,
          left_uri: encodeURI(res.data.leftVideo),
          right_uri: encodeURI(res.data.rightVideo),
          progress: (res.data.leftCount / (res.data.leftCount + res.data.rightCount)*100) 
        })
      }
    })
  },

  followVideo: function(id, token, side) {
    var that = this
    wx.request({ 
      url: 'https://dd.doudouapp.com/api/v1/battles/' + id + '/follow_' + side + '_video.json',
      method: 'POST',
      data: { 
        appid: 'app123', 
        appsecret: '333', 
        user_email: that.data.username, 
        user_token: token
      }, 
      header: { 
        'Content-Type': 'application/json' 
      }, 
      success: function(res) { 
        console.log(res.data)
        if (res.data.status == 400) {
          wx.showToast({
            icon: "success",
            title: "已投票",
            duration: 2000
          })
        } else if(res.data.status == 204) {
          wx.showToast({
            icon: "success",
            title: "已投票",
            duration: 2000
          })
        } else if(res.data.status == 200) {
          wx.showToast({
            icon: "success",
            title: "投票成功",
            duration: 2000
          })
        }
        that.onLoad()
        wx.navigateTo({
          url: "../index/index"
        })
      }
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    app.getUserInfo(function(userInfo){
      console.log(userInfo)
      //更新数据
      var loginuser = usermap.SearchUser(userInfo.nickName)
      console.log(that.data.userInfo)
      that.setData({
        userInfo:userInfo,
        username: loginuser.username
      })
      that.getToken(loginuser.username, loginuser.password)
    })
  }
})
