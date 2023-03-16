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
    color:'',
    date:'',
  },
  back(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var color;
    var rate;
    var that = this;
    wx.request({
      url: getApp().globalData.url+'wxalldaka',
      method:"GET",
      data: {
        name:"罗洁"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res){
        var maxid;
        var maxnum;
        var temp=Date.parse(res.data[0].date)
        for(var i=1;i<res.data.length;i++){
          if(Date.parse(res.data[i].date)>temp){
            temp = Date.parse(res.data[i].date);
            maxid = res.data[i].id;
            maxnum = i;
          }
        }
        that.setData({
          date:res.data[maxnum].date
        })
        let text = getApp().globalData.url+'wxiddaka/?id='+maxid
        var rate = res.data[maxnum].rate
        if(rate==1){
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
        }else if(rate==2){
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
          }
        else if(rate==3){
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
        }else if(rate==4){
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
        }else if(rate==5){
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