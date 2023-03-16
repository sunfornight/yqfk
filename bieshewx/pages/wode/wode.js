// page/component/new-pages/user/user.js
Page({
  data:{
    orders:[],
    hasAddress:false,
    address:{},
    userInfo:'',
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
  
  logout(){
    var that=this
    var _id=that.data.userInfo._id
    that.setData({
      hasAddress: false,
      userInfo:null
    })
    wx.cloud.database().collection('login_users').doc(_id).remove({
      success(res){
        wx.showToast({
          title: '退出成功',
        })
      }
    })
    wx.clearStorageSync()
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  onLoad(){

  },
  onShow(){
    var that = this;
    wx.cloud.database().collection('login_users').get({
      success(res){
        let userInfo = res.data[0]
        that.setData({
          userInfo:userInfo
        })
        
      }
    })
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  }
})