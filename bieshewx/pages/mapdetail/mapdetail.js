var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'KXUBZ-N24KG-Z3QQ7-IDD7K-LSVL6-KMBVH' // 必填
});
Page({
  data: {
    name:'',
    address:'',
    telephone:'',
    id:'',
    latitude:'',
    longitude:'',
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      name:options.name,
      address:options.address,
      telephone:options.telephone,
      id:options.id,
      latitude:options.latitude,
      longitude:options.longitude
    })
  },
// 事件触发，调用接口
onShow:function(){
   var _this = this;
   let lat=_this.data.latitude
    let lng=_this.data.longitude
    let name=this.data.name
   // 调用接口
   qqmapsdk.search({
      keyword: name,  //搜索关键词
      // location: '39.980014,116.313972',  //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: lat,
            longitude: lng,
            iconPath: "/images/marker.png", //图标路径
            width: 30,
            height: 30
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks
        })
      },
      fail: function (res) {
      },
      complete: function (res){
      }
  });
},
onClickLeft() {
  wx.navigateBack({
    delta: 1,
  })
},
onClickRight() {
  wx.switchTab({
    url: '/pages/index/index',
  })
},
})
