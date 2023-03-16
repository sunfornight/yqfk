// pages/wode/wode.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    hasUserInfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let user = wx.getStorageSync('user')
    // this.setData({
    //   userInfo:user
    // })
    // this.setData({
    //   userInfo: app.globalData.userInfo
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this

    wx.cloud.database().collection('login_users').get({
      success(res){
        // console.log(res,"res")
        if(res.data[0]){
          that.setData({
            userInfo:res.data[0]
          })
        }else{
          that.setData({
            userInfo:null
          })
          // wx.getUserProfile({
          //   desc: '用于信息完善',
          //   success(res){
          //     var user = res.userInfo
          //     wx.cloud.database().collection('login_user').add({
          //       data:{
          //         avatarUrl :user.avatarUrl,
          //         nickName: user.nickName
          //       },
          //         success(res){
          //           console.log(res)
          //           wx.showToast({
          //             title: '登陆成功',
          //           })
          //         }
          //     })
          //   }
          // })
          // that.setData({
          //   userInfo:user
          // })
        } 
      }
    })
},
  welcome(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  login(){
    var that=this
    wx.getUserProfile({
            desc: '用于信息完善',
            success(res){
              var user = res.userInfo
              wx.cloud.database().collection('login_users').add({
                data:{
                  avatarUrl :user.avatarUrl,
                  nickName: user.nickName
                },
                  success(res){
                    wx.showToast({
                      title: '登陆成功',
                    })
                    that.setData({
                      userInfo:user
                    })
                  }
              })
            }
          })
  },
})





  