// app.js
App({
  onLaunch() {

    // 云开发环境初始化
    wx.cloud.init({
      env:"cloud1-3gasbwtca11d6c3c"
    })
    // 获取用户openid
    var that = this;
    wx.cloud.callFunction({
      name:'login_get_openid',
      success(res){
        that.globalData.openid = res.result.openid
      // 查找数据表中是否有这个用户记录
        wx.cloud.database().collection('login_users').where({
          _openid: res.result.openid
        }).get({
          success(result){
            console.log(result)
            that.globalData.userInfo = result.data[0]
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:null,
    url:'http://192.168.31.184:9000/'
  }
})
