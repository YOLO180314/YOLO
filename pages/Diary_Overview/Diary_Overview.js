Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        time: "2021-02-02 10:30:30",
        type: "text",
        con: "1这是主要内容部分"
      },
      {
        time: "2021-02-02 10:30:30",
        type: "video",
        con: "http://ssbylw.scnu.edu.cn/ice.mp4",
        thumbnail: "/image/background.png"
      },
      {
        time: "2021-02-02 10:30:30",
        type: "mp3",
        con: "/image/img/心情日记/music.mp3",
        duration: ""
      },
      {
        time: "2021-02-02 10:30:30",
        type: "text",
        con: "2这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分"
      },
      {
        time: "2021-02-02 10:30:30",
        type: "text",
        con: "3这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分"
      },
      {
        time: "2021-02-02 10:30:30",
        type: "text",
        con: "4这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分"
      },
      {
        time: "2021-02-02 10:30:30",
        type: "text",
        con: "5这是主要内容部分这是主要内容部分这是主要内容部分这是主要内容部分"
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
