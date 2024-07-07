// pages/myInf/myInf.js
// const db = wx.cloud.database();
const defaultAvatarurl = "https://pic.imgdb.cn/item/6685742fd9c307b7e9ea1d66.png"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _nickName: '',
    nickName: '未登录的用户',
    edit: false,
    edit1: false,
    // 缓存中的
    _phonenum: '',
    // 输入框中的
    phonenum: '',
    openid:'',
    avatarUrl: defaultAvatarurl,
    defaultNickName:'',
  },

  goBack() {
    wx.switchTab({
      url: '../me/me',
    })
  },

  onChooseAvatar: function (e) {
    let userInfo = wx.getStorageSync('userInfo');
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
    })
    userInfo = {
      ...userInfo,
      avatarUrl: this.data.avatarUrl
    };
    wx.setStorageSync('userInfo', userInfo);
  },

  saveChange() {
    // const { openid } = wx.getStorageSync('openid');
    let userInfo = wx.getStorageSync('userInfo');
    userInfo = {
      ...userInfo,
      nickName: this.data.nickName,
      phonenum: this.data.phonenum
    };
    wx.setStorageSync('userInfo', userInfo);
    this.setData({
      edit1: false,
      edit: false,
      _phonenum: this.data.phonenum,
      _nickName: this.data.nickName
    })
    // db.collection('info').where({
    //   _openid: openid
    // }).update({
    //   data: {
    //     avatarUrl: this.data.avatarUrl,
    //     nickName: this.data.nickName,
    //     phonenum: this.data.phonenum
    //   }
    // }).then(res => {
    //   console.log('保存成功：', res);
    //   wx.showToast({
    //     title: '保存成功',
    //     icon: 'success',
    //     duration: 2000
    //   });
    // }).catch(err => {
    //   console.error('保存失败：', err);
    //   wx.showToast({
    //     title: '保存失败，请重试',
    //     icon: 'none',
    //     duration: 2000
    //   });
    // });
  },

  deletenickName() {
    this.setData({
      nickName: ''
    })
  },

  deletePhonenum() {
    this.setData({
      phonenum: ''
    })
  },

  getPhonenum(e) {
    const { value } = e.detail;
    this.setData({
      phonenum: value
    })
  },

  getnickName(e) {
    const { value } = e.detail;
    this.setData({
      nickName: value
    })
    console.log(this.data.nickName)
  },

  toEdit() {
    this.setData({
      edit: !this.data.edit,
      phonenum: this.data._phonenum
    })
  },

  toEdit1() {
    this.setData({
      edit1: !this.data.edit1,
      nickName: this.data._nickName
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl
    })

    // 加后端
    // const openid = wx.getStorageSync('openid');
    // this.setData({
    //   openid,
    // })
    // const phonenum = "";
    // db.collection('info').where({
    //   _openid: openid
    // }).get().then(res => {
    //   if (res.data.length > 0) {
    //     console.log(res);
    //     const userInfo = res.data[0];
    //     const avatarUrl = userInfo.avatarUrl;
    //     const nickName = userInfo.nickName;
    //     const phonenum = userInfo.phonenum;
    //     // 将获取到的头像和名称赋值给页面中的变量，以在页面中显示
    //     this.setData({
    //       avatarUrl,
    //       nickName,
    //       _phonenum: phonenum,
    //       phonenum
    //     });
    //   } else {
    //     db.collection('info').add({
    //       data: {
    //         avatarUrl,
    //         nickName,
    //         phonenum
    //       }
    //     })
    //   }
    // })
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
    this.onLoad();
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