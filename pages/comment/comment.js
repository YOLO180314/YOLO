// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Name: '',
    email: '',
    comment: ''
  },

  goBack() {
    wx.switchTab({
      url: '../me/me',
    })
  },

  submitUp() {
    const Name = this.data.Name;
    const email = this.data.email;
    const comment = this.data.comment;
    
    if(!Name || !comment) {
      wx.showToast({
        title: '必填项尚未填完',
        icon:'none'
      })
    }
    else{
      wx.switchTab({
        url: '../me/me',
        success:(res) => {
          wx.showToast({
            title: '提交成功，感谢您的反馈！',
            icon:'none'
          })
        }
      })
    }
  },

  getName(e) {
    const { value } = e.detail;
    this.setData({
      Name: value
    })
    console.log(this.data.Name)
  },

  getEmail(e) {
    const { value } = e.detail;
    this.setData({
      email : value
    })
    console.log(this.data.email)
  },

  getComment(e) {
    const { value } = e.detail;
    this.setData({
      comment : value
    })
    console.log(this.data.comment)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})