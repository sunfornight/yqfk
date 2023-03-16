// pages/churutest/churutest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    approval:1,
    record:'',
    flag:0
  },

  test(){
    var that=this
    that.setData({
      flag:1
    })
  },

  redirect(){
    wx.redirectTo({
      url: '/pages/churushenqing/churushenqing',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var that=this
    wx.request({
      url: getApp().globalData.url+'wxalldaka',
      method:"GET",
      data: {
        name: "罗洁"
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
        if(res.data[maxnum].rate>3){
          that.setData({
            approval: 0
          })
        }
        that.setData({
          record: res.data[maxnum]
        })
      }
    })
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