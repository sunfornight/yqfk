// pages/churushenqing/churushenqing.js
import WxValidate from '../../utils/WxValidate.js'
var Validate = ""
Page({

 // 初始化表单校验
 initValidate(){
  // 创建实例对象
  this.validate = new WxValidate({
      name: {
          required: true,
          minlength: 2,
          maxlength:20
      },
      address: {
          required: true,
          maxlength:50,
          minlength:3
      },
      destination: {
        required: true,
        maxlength:50,
        minlength:3
    },
      telephone:{
        required: true,
        tel: true,
      },

  }, {
          name: {
              required: '请输入姓名',
              minlength: '名称不得少于2字!',
              maxlength: '名称不得超过20字!'
          },
          address: {
              required: "请填入您目前所在位置",
              maxlength:"地址最大内容不能多于50字",
              minLength:"地址最大内容不能少于3字"
          },
          destination: {
            required: "请填入您要前往的目的地",
            maxlength:"地址最大内容不能多于50字",
            minLength:"地址最大内容不能少于3字"
        },
          telephone:{
            required: "请填入您的号码",
            tel: "号码格式错误(12位)",
          },
      })
},

  /**
   * 页面的初始数据
   */
  data: {
    timestart: '8:00',
    timeend:'22:00'
  },

  onLoad: function (options) {
    this.initValidate()
  },

  formSubmit(e) {
    var that = this
    let formvalue=e.detail.value
    that.setData({
      formvalue:formvalue
    })
    if (!this.validate.checkForm(e.detail.value)){
      const error = this.validate.errorList[0];
      wx.showToast({
          title: `${error.msg} `,
          icon: 'none'
      })
      return false
  }else{
    if(e.detail.value.isleave!='')
        wx.request({
          url: getApp().globalData.url+'addchuru',
          method:"POST",
          header: {
            "Content-Type": "application/json;"
          },
          data:{
            name:e.detail.value.name,
            address:e.detail.value.address,
            destination:e.detail.value.destination,
            timestart:e.detail.value.timestart,
            timeend:e.detail.value.timeend,
            temp:e.detail.value.temp,
            isleave:e.detail.value.isleave, 
            telephone:e.detail.value.telephone,
            note:e.detail.value.note
          },
          success(res){
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
            wx.redirectTo({
              url: '/pages/churushenpi/churushenpi',
            }) 
          }
        })
        else{
          wx.showToast({
            title: '请保证单选框已经勾选上',
            icon: 'none'
        })
        }
      }
  },

  TimeStartChange(e) {
    this.setData({
      timestart: e.detail.value
    })
  },
  TimeEndChange(e) {
    this.setData({
      timeend: e.detail.value
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