// page/component/orders/orders.js
Page({
  data:{
    cartList:[],
    address:{},
    hasAddress: false,
    total:0,
  },
  common: function(){
    var that=this;
    let carList=that.data.cartList;
    that.setData({
      cartList:carList
    })
  },
  onLoad:function(option){
    var that = this;
    that.setData({
      total:this.options.totalPrice
    })
    let cartList = wx.getStorageSync('cart')
    cartList = cartList?cartList:[]
    var temp=that.data.hasList;
    if(cartList.length!=0){
      temp=true;
    }else{
      temp=false;
    }
    that.setData({hasList: temp})
    that.data.cartList = cartList
    that.common();
    },
  
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    wx.showModal({
      title: '提示',
      content: '本系统只做演示，支付系统已屏蔽',
      text:'center',
      complete() {
        wx.switchTab({
          url: '/page/component/user/user'
        })
      }
    })
  }
})