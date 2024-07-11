// pages/Diary/Diary.js
var util =require('../../utils/util')

Page({
  data: {
    time:"",
    Mood:"开心",
    Img:"/image/img/心情日记/开心.png"
  },
  
  onLoad(){
    var TIME = util.formatTime(new Date());
    console.log(TIME)
    this.setData({
      time:TIME
    })
  },

  back:function(){
    wx.navigateBack(
      {
        delta:1
      }
    )
  },

  formSubmit:function(){
    wx.navigateTo({
      url: '../Mood_Calendar/Mood_Calendar',  
    })
  }
  
})