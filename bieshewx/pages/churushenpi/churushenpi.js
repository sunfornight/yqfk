// page/component/details/details.js
Page({
  data:{
   
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    mks1:[],
    mks2:[],
    mks3:[]
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
  onShow: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url+'wxallchuru',
      method:"GET",
      data: {
        name: "罗洁"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res){
        var mks1 = []
        var mks2 = []
        var mks3 = []
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].approve==1){
            mks1.push({
              name:res.data[i].name,
              note:res.data[i].note,
              id:res.data[i].id
            })}else if(res.data[i].approve==2){
              mks2.push({
                name:res.data[i].name,
                note:res.data[i].note,
                id:res.data[i].id
              })}else{
                mks3.push({
                  name:res.data[i].name,
                  note:res.data[i].note,
                  id:res.data[i].id
                })
              }
            }
            that.setData({
              mks1:mks1,
              mks2:mks2,
              mks3:mks3
            })
          }
    })
  },
 
})