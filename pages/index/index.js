// index.js
var util =require('../../utils/util')

Page({
  data: {
    name:"张三",
    time:"",
  },
  
  onLoad(){
    var TIME = util.formatTime(new Date());
    console.log(TIME)
    this.setData({
      time:TIME
    })
  },
  
  mood:function(){
    wx.navigateTo({
      url: '../Mood/Mood',  
    })
  },

  Calendar:function(){
    wx.navigateTo({
      url: '../Mood_Calendar/Mood_Calendar',  
    })
  },

  diary:function(){
    wx.navigateTo({
      url: '../Diary_Overview/Diary_Overview',  
    })
  },

})
