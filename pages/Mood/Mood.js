var util =require('../../utils/util')

Page({
  data: {
    time:"",
    moodList:[
      {
        name:"开心",
        img:"/image/img/心情日记/开心.png"
      },
      {
        name:"难过",
        img:"/image/img/心情日记/难过.png"
      },
      {
        name:"平静",
        img:"/image/img/心情日记/平静.png"
      },
      {
        name:"恐惧",
        img:"/image/img/心情日记/恐惧.png"
      },{
        name:"愤怒",
        img:"/image/img/心情日记/愤怒.png"
      },
    ],
    index:0,
  },
  onLoad: function (options) {
    var TIME = util.formatTime(new Date());
    console.log(TIME)
    this.setData({
      time:TIME
    })
  },

  onSwiperChange: function (e) {
    this.setData({
      index: e.detail.current
    });
  },

  back:function(){
    wx.navigateBack(
      {
        delta:1
      }
    )
  },

  diary:function(){
    wx.navigateTo({
      url: '../Diary/Diary',  
    })
  }

})