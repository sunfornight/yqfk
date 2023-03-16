Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    lunbotuList:'',
    tuisongList:'',
    alltuisongList:'',
    goodsList:'',
    allgoodsList:'',
    dialog1: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    wrap: false,
    wrap1: false,
  },
  onShow() {
    const promise1 = new Promise((resolve, reject) => {
      wx.createSelectorQuery().select('#js_btn1_1')
        .boundingClientRect((rect) => {
          resolve(rect.height);
        })
        .exec();
    });
    const promise2 = new Promise((resolve, reject) => {
      wx.createSelectorQuery().select('#js_btn1_2')
        .boundingClientRect((rect) => {
          resolve(rect.height);
        })
        .exec();
    });
    Promise.all([promise1, promise2]).then((values) => {
      if (values[0] != values[1]) {
        this.setData({ wrap: true });
      }
    });
    const promise3 = new Promise((resolve, reject) => {
      wx.createSelectorQuery().select('#js_btn2_1')
        .boundingClientRect((rect) => {
          resolve(rect.height);
        })
        .exec();
    });
    const promise4 = new Promise((resolve, reject) => {
      wx.createSelectorQuery().select('#js_btn2_2')
        .boundingClientRect((rect) => {
          resolve(rect.height);
        })
        .exec();
    });
    Promise.all([promise3, promise4]).then((values) => {
      if (values[0] != values[1]) {
        this.setData({ wrap1: true });
      }
    });
  },
  close() {
    this.setData({
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
    });
  },
  open1() {
    this.setData({
      dialog1: true,
    });
  },

  switchtab(){
    wx.switchTab({
      url: '/pages/daka/daka',
    })
  },
  
 
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.url+'wxlunbotu',
      success: function (res){
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
              picbase64: res.data[i].picbase64,
              picdescribe: res.data[i].picdescribe,
            })     
        }  
        that.setData({lunbotuList:mks}) 
      }
    }),
    wx.request({
      url: getApp().globalData.url+'wxgoods',
      success: function (res){
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            goodsid: res.data[i].id,
            goodsname: res.data[i].goodsname,
            chandi: res.data[i].chandi,
            shengyubaozhiqi: res.data[i].shengyubaozhiqi,
            price: res.data[i].price,
            goodsusage: res.data[i].goodsusage,
            state: res.data[i].state,
            unit: res.data[i].unit,
            picbase64: res.data[i].picbase64,
            amount: res.data[i].amount
            })     
        }  
        that.setData({goodsList:mks}) 
      }
    }),
    wx.request({
      url: getApp().globalData.url+'wxallgoods',
      success: function (res){
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            goodsid: res.data[i].id,
            goodsname: res.data[i].goodsname,
            chandi: res.data[i].chandi,
            shengyubaozhiqi: res.data[i].shengyubaozhiqi,
            price: res.data[i].price,
            goodsusage: res.data[i].goodsusage,
            state: res.data[i].state,
            unit: res.data[i].unit,
            picbase64: res.data[i].picbase64,
            })     
        }  
        that.setData({allgoodsList:mks}) 
      }
    }),
    wx.request({
      url: getApp().globalData.url+'wxtuisong',
      success: function (res){
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
              tuisongtitle: res.data[i].tuisongtitle,
              tuisongauthor: res.data[i].tuisongauthor,
              tuisongdate: res.data[i].tuisongdate,
              tuisongintroduction: res.data[i].tuisongintroduction,
              tuisongarticle: res.data[i].tuisongarticle,
              picbase64: res.data[i].picbase64,
            })     
        }  
        that.setData({tuisongList:mks}) 
      }
    }),
    wx.request({
      url: getApp().globalData.url+'wxalltuisong',
      success: function (res){
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
              tuisongtitle: res.data[i].tuisongtitle,
              tuisongauthor: res.data[i].tuisongauthor,
              tuisongdate: res.data[i].tuisongdate,
              tuisongintroduction: res.data[i].tuisongintroduction,
              tuisongarticle: res.data[i].tuisongarticle,
              picbase64: res.data[i].picbase64,
            })     
        }  
        that.setData({alltuisongList:mks}) 
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