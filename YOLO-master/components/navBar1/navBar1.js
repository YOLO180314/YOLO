
// 获取应用实例
const App = getApp();
Component({
  properties: {
    title: {
      type: String,
      value: '情绪创作' //正确的！
    }
  },
  data:{
    capsuleTop: '', //胶囊距离屏幕顶部的距离
    capsuleHeight: '', //胶囊高度
    navbarHeight: '' //导航栏高度
    //title:'情绪创作' 错误的！
  },
  lifetimes: {
    attached: function () {
      this.setData({
        capsuleTop: App.globalData.capsule.top, 
        capsuleHeight: App.globalData.capsule.height, 
        navbarHeight: (App.globalData.capsule.top - App.globalData.system.statusBarHeight) * 2 + App.globalData.capsule.height + App.globalData.system.statusBarHeight, 
      })
     }
  },
  methods: {
    handleGoToBack(){
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
