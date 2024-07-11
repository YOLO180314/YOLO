// pages/chatPage/chatPage.js
var util =require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "",
    isSend: false,
    message: [
      {
        role: "user",
        content: "你好",
        time:"9:45:00"
      },
      {
        role: "assistant",
        content: "你好~",
        time:"9:45:00"
      },
      {
        role: "user",
        content: "我今天很开心",
        time:"9:45:00"
      },
      {
        role: "assistant",
        content: "太好啦~可以和我分享一下今天令你开心的事儿吗~",
        time:"9:45:00"
      },
      {
        role: "user",
        content: "当然可以",
        time:"9:45:00"
      },
      {
        role: "assistant",
        content: "我真是太荣幸啦",
        time:"9:45:00"
      },
    ]
  },

  goBack() {
    wx.switchTab({
      url: '../AIchat/AIchat',
    })
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