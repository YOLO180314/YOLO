// pages/login/login.js
const defaultAvatarurl = "https://pic.imgdb.cn/item/6685742fd9c307b7e9ea1d66.png"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarurl,
    nickName: "",
    userInfo:{},
    login: false
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;

    this.setData({
      avatarUrl
    })
  },

  onNickName(e) {
    const { detail:{ value } } = e;

    this.setData({
      nickName : value
    })
  },

  LoginSubmit() {
    const { avatarUrl,nickName } = this.data;

    if(!avatarUrl) {
      wx.showToast({
        title: '请选择头像',
        icon: 'none'
      })

      return;
    }

    if(!nickName) {
      wx.showToast({
        icon: 'none',
        title: '请填写昵称'
      })

      return;
    }

    const userInfo = {
      avatarUrl,
      nickName
    }

    const login = true;

    wx.setStorageSync('userInfo', userInfo);
    wx.setStorageSync('login', login);

    wx.switchTab({
      url: '../me/me',
      success: (res) => {
        wx.showToast({
          title: '登录成功',
          icon:'none'
        })
      }
    })
  },

  goBack() {
    wx.switchTab({
      url: '../me/me',
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