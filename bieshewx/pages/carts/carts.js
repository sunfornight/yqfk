// page/component/new-pages/cart/cart.js
const app = getApp() 
Page({
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:true,    // 全选状态，默认全选
    obj:{
        name:"hello"
    },
    cartList:[],
  },
  onShow:function(option) {
    this.getTotalPrice();
    var that = this;
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
  common: function(){
    var that=this;
    let carList=that.data.cartList;
    that.setData({
      cartList:carList
    })
  },
  onLoad:function(option){
    
    },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let cartList = this.data.cartList;
    const selected = cartList[index].selected;
    cartList[index].selected = !selected;
    this.setData({
      cartList: cartList
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let cartList = this.data.cartList;
    cartList.splice(index,1);
    wx.setStorageSync('cart', cartList)
    this.setData({
      cartList: cartList
    });
    
    if(!cartList.length){
      this.setData({
        hasList: false
      });
    }else{
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let cartList = this.data.cartList;

    for (let i = 0; i < cartList.length; i++) {
      cartList[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      cartList: cartList
    });
    wx.setStorageSync('cart', cartList)
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let cartList = this.data.cartList;
    let amount = cartList[index].amount;
    amount = amount + 1;
    cartList[index].amount = amount;
    this.setData({
      cartList: cartList
    });
    wx.setStorageSync('cart', cartList)
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let cartList = this.data.cartList;
    let amount = cartList[index].amount;
    if(amount <= 1){
      return false;
    }
    amount = amount - 1;
    cartList[index].amount = amount;
    this.setData({
      cartList: cartList
    });
    wx.setStorageSync('cart', cartList)
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let cartList = this.data.cartList;                  // 获取购物车列表
    let total = 0;
    for(let i = 0; i<cartList.length; i++) {         // 循环列表得到每个数据
      if(cartList[i].selected) {                     // 判断选中才会计算价格
        total += cartList[i].amount * cartList[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      cartList: cartList,
      totalPrice: total.toFixed(2)
    });
  }

})