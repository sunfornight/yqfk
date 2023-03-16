// pages/test/test.js
var qrcode = require('../../weapp.qrcode')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    record:'',
    color:'',
    rate:'',
    color:''
  },
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var color;
    var rate;
    var that = this;
    let id = this.options.id
    that.setData({
      id:this.options.id
    })
    wx.request({
      url: getApp().globalData.url+'wxiddaka',
      method:"GET",
      data: {
        id:id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res){
        let text = getApp().globalData.url+'wxiddaka/?id='+id
        that.setData({
          record:res.data
        })
        if(res.data.rate==1){
          rate = '未审核'
          qrcode({
            width:400,
            height:400,
            canvasId:'myQrcode',
            text: text,
            background: '#f5f3f2',
            image: {
              imageResource: '/images/jiayou.png',
              dx: 150,
              dy: 150,
              dWidth: 100,
              dHeight: 100
            }
          })
        }else if(res.data.rate==2){
          rate = '没有风险'
          qrcode({
            width:400,
            height:400,
            canvasId:'myQrcode',
            text: text,
            background: '#84a729',
            image: {
              imageResource: '/images/jiayou.png',
              dx: 150,
              dy: 150,
              dWidth: 100,
              dHeight: 100
            }
          })
        }else if(res.data.rate==3){
          rate = '低风险'
          qrcode({
            width:400,
            height:400,
            canvasId:'myQrcode',
            text: text,
            background: '#fedc5e',
            image: {
              imageResource: '/images/jiayou.png',
              dx: 150,
              dy: 150,
              dWidth: 100,
              dHeight: 100
            }
          })
        }else if(res.data.rate==4){
          rate = '中风险'
          qrcode({
            width:400,
            height:400,
            canvasId:'myQrcode',
            text: text,
            background: '#3271ae',
            image: {
              imageResource: '/images/jiayou.png',
              dx: 150,
              dy: 150,
              dWidth: 100,
              dHeight: 100
            }
          })
        }else if(res.data.rate==5){
          rate = '高风险'
          qrcode({
            width:400,
            height:400,
            canvasId:'myQrcode',
            text: text,
            background: '#c8161d',
            image: {
              imageResource: '/images/jiayou.png',
              dx: 150,
              dy: 150,
              dWidth: 100,
              dHeight: 100
            }
          })
      }
      that.setData({
        rate:rate,
      })
    }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})