Component({
  properties: {
    title: {
      type: String,
      value: '情绪创作'
    }
  },

  data: {
    statusBarHeight: wx.getStorageSync('statusBarHeight'),
    navigationBarHeight: wx.getStorageSync('navigationBarHeight'),
    menuButtonHeight: wx.getStorageSync('menuButtonHeight'),
    navigationBarAndStatusBarHeight: wx.getStorageSync('statusBarHeight') + wx.getStorageSync('navigationBarHeight'),
  },

  methods: {
    back(){
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
