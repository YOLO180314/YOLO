Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        time: "2023-07-28 21:46:35",
        type: "text",
        con: "今天和朋友们去了海边，阳光明媚，海风拂面，感觉无比的放松。我们在沙滩上打沙滩排球，大家都很开心。中午一起吃了海鲜烧烤，美味极了。傍晚看着夕阳西下，心情格外平静。"
      },
      {
        time: "2023-09-02 10:15:08",
        type: "video",
        con: "http://ssbylw.scnu.edu.cn/ice.mp4",
        thumbnail: "/image/img/心情日记/R-C.jpg"
      },
      {
        time: "2023-12-02 09:18:42",
        type: "mp3",
        con: "/image/img/心情日记/music.mp3",
        duration: ""
      },
      {
        time: "2023-12-07 20:12:26",
        type: "text",
        con: "去了市中心的游乐园，玩了很多刺激的项目。过山车、摩天轮和激流勇进都让我尖叫连连，但也特别兴奋。晚上在游乐园的灯光秀中度过，整个夜晚都充满了欢笑。"
      },
      {
        time: "2024-02-02 10:30:30",
        type: "text",
        con: "和家人一起去了森林公园，空气清新，景色宜人。我们沿着小路徒步，听着鸟鸣和溪水的声音，感觉特别宁静。中途在一个湖边野餐，大家都很享受这段宁静的时光。"
      },
      {
        time: "2024-05-22 8:24:14",
        type: "text",
        con: "今天去了一个古镇旅游，古色古香的建筑让我仿佛穿越到了过去。我们在小巷中漫步，品尝了当地的美食，拍了很多照片。古镇的夜景特别美，灯火辉煌，让人流连忘返。"
      },
      {
        time: "2024-07-12 18:30:30",
        type: "text",
        con: "去了一个博物馆，了解了很多历史和文化知识。看到许多珍贵的文物，感受到了历史的厚重。虽然只是简单的参观，但收获了很多，心情也很满足。"
      }
    ],
    showModal: false,
    currentItem: {}
  },

  onLoad(options) {
    this.data.list.forEach((item, index) => {
      if (item.type === 'mp3') {
        this.getAudioDuration(item.con, index);
      }
    });
  },

  getAudioDuration(src, index) {
    const audio = wx.createInnerAudioContext();
    audio.src = src;
    audio.onCanplay(() => {
      audio.duration; 
      setTimeout(() => {
        this.setData({
          [`list[${index}].duration`]: this.formatDuration(audio.duration)
        });
        audio.destroy();
      }, 100);
    });
  },

  formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  },

  closed: function () {
    this.setData({ showModal: false });
  },

  open: function (event) {
    const index = event.currentTarget.dataset.index;
    this.setData({
      showModal: true,
      currentItem: this.data.list[index]
    });
  },
  back:function(){
    wx.navigateBack(
      {
        delta:1
      }
    )
  },
  
});
