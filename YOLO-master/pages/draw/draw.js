Page({
  data: {
    items: [
     { src: '../../image/img/情绪创作/book.png', time: '2024-07-01 12:00' },
      { src: '../../image/img/情绪创作/book.png', time: '2024-07-01 12:00' }
    ],
    statusBarHeight: wx.getStorageSync('statusBarHeight'),
    navigationBarAndStatusBarHeight: wx.getStorageSync('statusBarHeight') + wx.getStorageSync('navigationBarHeight'),
  },

  handleBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  handleSubmit() {
    // 你的提交处理逻辑
  }
});
