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
  
})
