var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
    data: {
    hospitallist:''
    },
    searchnearby(){
        // 调用接口
      
    },
    onLoad: function () {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'KXUBZ-N24KG-Z3QQ7-IDD7K-LSVL6-KMBVH'
        });
        
    },
    onShow: function () {
      var that = this;
      qqmapsdk.search({
          
          keyword: '核酸检测',
          
          success: function (res) {
               var mks = []
              for (var i = 0; i < res.data.length; i++) {
                  mks.push({ // 获取返回结果，放到mks数组中
                      address: res.data[i].address,
                      telephone: res.data[i].tel,
                      title: res.data[i].title,
                      id: res.data[i].id,
                      latitude: res.data[i].location.lat,
                      longitude: res.data[i].location.lng,
                      distance: res.data[i].location._distance,
                    })  
                               
              }  
              that.setData({hospitallist:mks})  
          },
          fail: function (res) {
          },
      complete: function (res) {
          
          
      },
     
   });
  },

})
