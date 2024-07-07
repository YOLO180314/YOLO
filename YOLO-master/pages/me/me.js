const defaultAvatarurl = "https://pic.imgdb.cn/item/6685742fd9c307b7e9ea1d66.png"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarpic: defaultAvatarurl,
    userInfo: null,
    login: false,
    cellList: [
      {
          url: "../../image/me/MyDiary.png",
          text: '我的日记',
          page: ''
      },
      {
        url: '../../image/Me/create.png',
        text: '我的创作',
        page: ''
      },
      {
        url: '../../image/Me/leaveWord.png',
        text: '我的留言',
        page: '../myCollection/myCollection'
      },
      {
          url: '../../image/Me/collection.png',
          text: '我的收藏',
          page: ''
      },
      {
          url: '../../image/Me/myInf.png',
          text: '我的信息',
          page: '../myInf/myInf'
      },
      {
        url: '../../image/Me/comment.png',
        text: '意见反馈',
        page: '../comment/comment'
    },
      {
          url: '../../image/Me/signout.png',
          text: '退出登录'
      }
    ]
  },

  toGetinf() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  toDetail(e) {
    const { page } = e.currentTarget.dataset;
    if (page) {
        wx.navigateTo({
            url: page,
        })
    } else {
        wx.showModal({
            title: '提示',
            content: '确定退出吗？',
            success: (res) => {
                const { confirm } = res;
                if (confirm) {
                    wx.removeStorageSync('login');
                    wx.removeStorageSync('userInfo');
                    // wx.removeStorageSync('openid');
                    this.onLoad()
                }
            }
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const login = wx.getStorageSync('login');
    const userInfo = wx.getStorageSync('userInfo')
    if(login) {
      this.setData({
        login,
        userInfo
      })
    }
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
    this.onLoad()
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