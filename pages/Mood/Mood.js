var util =require('../../utils/util')

Page({
  data: {
    time:"",
    moodList:[
      {
        name:"开心",
        img:"/image/img/心情日记/开心.png",
        msg:"今天心情怎么样？"
      },
      {
        name:"难过",
        img:"/image/img/心情日记/难过.png",
        msg:"今天有好好吃饭吗?"
      },
      {
        name:"平静",
        img:"/image/img/心情日记/平静.png",
        msg:"今天外出活动了吗?"
      },
      {
        name:"恐惧",
        img:"/image/img/心情日记/恐惧.png",
        msg:"今天发生了什么事情？"
      },{
        name:"愤怒",
        img:"/image/img/心情日记/愤怒.png",
        msg:"今天有好好吃饭吗?"
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