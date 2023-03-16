const app = getApp();
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
                required: "请填入您的地址",
                maxlength:"地址最大内容不能多于50字",
                minLength:"地址最大内容不能少于3字"
            },
            telephone:{
              required: "请填入您的号码",
              tel: "号码格式错误(12位)",
            },
        })
  },


  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: ['无异常', '其它身体疾病', '确诊病例','疑似病例','密切接触者','发热留观人员','无症状感染者'],
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2022-01-01',
    region: ['广西壮族自治区', '南宁市', '兴宁区'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: '',
    formvalue:'',
    pledge: false
  },
  onLoad:function(options){
    this.initValidate();
  },
  pledgeChange(e){
    var that = this
    if(e.detail.value!=''){
      that.setData({
        pledge:true
      })
    }else{
      that.setData({
        pledge:false
      })
    }
  },
  formReset(e) {
  },
  formSubmit(e) {
    var that = this
    let formvalue=e.detail.value
    let region = e.detail.value.region.toString()
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
    if(e.detail.value.isalert!=''&&e.detail.value.iscontact!=''&&e.detail.value.isfever!=''&&e.detail.value.isoutside!=''&&e.detail.value.healthstate!=''){
      wx.request({
        url: getApp().globalData.url+'adddaka',
        method:"POST",
        header: {
          "Content-Type": "application/json;"
        },
        data:{
          name:e.detail.value.name,
          address:e.detail.value.address,
          date:e.detail.value.date,
          healthstate:e.detail.value.healthstate,
          isalert:e.detail.value.isalert, 
          iscontact:e.detail.value.iscontact,
          isfever:e.detail.value.isfever,
          isoutside:e.detail.value.isoutside,
          region:region,
          sex:e.detail.value.sex,
          telephone:e.detail.value.telephone,
          temp:e.detail.value.temp
        },
        success(res){
          wx.showToast({
            title: '打卡成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
      wx.redirectTo({
        url: '/pages/dakarecord/dakarecord',
      })
    }else{
      wx.showToast({
        title: '请保证每个单选框与下拉框都勾选上',
        icon: 'none'
    })
    }
    }
      
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
})