// page/component/details/details.js
Page({
  data:{
    goodsid:"",
    goodsname:"",
    goodschandi:"",
    shengyubaozhiqi:"",
    goodsprice:"",
    goodsusage:"",
    goodsstate:"",
    goodsunit:"",
    goodsimage:"",
    goodsamount:"",

    goods:{},
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },

  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)
    let chooseList={id:"",name:"",amount:"",pic:"",price:"",selected:"true"}
    chooseList.id=this.data.goodsid
    chooseList.name=this.data.goodsname
    chooseList.amount=this.data.num
    chooseList.pic=this.data.goodsimage
    chooseList.price=this.data.goodsprice
    let cartList = wx.getStorageSync('cart')
    cartList = cartList?cartList:[ ];
    let orignCartListItem;
    for(let i=0;i<cartList.length;i++){
      let cartItem = cartList[i];
      if(cartItem['id']==chooseList['id']){
        orignCartListItem = cartItem;
        break;
      }
    }
    if(orignCartListItem){
      orignCartListItem['amount']+=1;
    }else{
      orignCartListItem = chooseList;
      cartList.push(orignCartListItem);
    }
    wx.setStorageSync('cart',cartList);
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      goodsid: options.goodsid,
      goodsname: options.goodsname,
      goodschandi: options.goodschandi,
      shengyubaozhiqi: options.shengyubaozhiqi,
      goodsprice: options.goodsprice,
      goodsusage: options.goodsusage,
      goodsstate: options.goodsstate,
      goodsunit: options.goodsunit,
      goodsimage: options.goodsimage,
      goodsamount: options.goodsamount,
    })
  },
 
})