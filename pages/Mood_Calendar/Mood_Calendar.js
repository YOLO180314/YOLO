// pages/Mood_Calendar/Mood_Calendar.js
Page({
  data: {
    year: 2024,
    month: ['一月', '二月', '三月', '四月',
      '五月', '六月', '七月', '八月',
      '九月', '十月', '十一月', '十二月',],
    minDate: new Date(2024, 0, 1).getTime(),
    maxDate: new Date(2030, 11, 31).getTime(),
    moodData: {
      '2024-07-01': '/image/img/心情日记/平静.png',
      '2024-07-02': '/image/img/心情日记/开心.png',
      '2024-07-03': '/image/img/心情日记/恐惧.png',
      '2024-07-04': '/image/img/心情日记/愤怒.png',
      '2024-07-05': '/image/img/心情日记/难过.png',
      '2024-07-06': '/image/img/心情日记/开心.png',
      '2024-07-07': '/image/img/心情日记/恐惧.png',
      '2024-07-08': '/image/img/心情日记/平静.png',
      '2024-07-09': '/image/img/心情日记/开心.png',
      '2024-07-10': '/image/img/心情日记/恐惧.png',
    },
    showPopup: false,
    selectedDate: '',
    selectedMoodImage: '',
  },
  onLoad(options) {

  },
  back: function () {
    wx.navigateBack(
      {
        delta: 1
      }
    )
  },

  formatter(day) {
    const date = `${day.year}-${day.month < 10 ? '0' + day.month : day.month}-${day.day < 10 ? '0' + day.day : day.day}`;
    const moodImage = this.data.moodData[date];
    if (moodImage) {
      day.moodImage = moodImage;
    }
    return day;
  },

  onDayClick(event) {
    console.log("Event object:", event); 
    const selectedDate = event.detail; 
    let date, moodImage;
  
    if (selectedDate instanceof Date) {
      date = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
      moodImage = this.data.moodData && this.data.moodData[date];
  
      this.setData({
        selectedDate: date,
        selectedMoodImage: moodImage || '',
        showPopup: true
      });
  
      console.log("selectedDate:", this.data.selectedDate);
      console.log("selectedMoodImage:", this.data.selectedMoodImage);
      console.log("showPopup:", this.data.showPopup);
    } else {
      console.error("selectedDate is not a Date object:", selectedDate);
    }
  },


  onClose() {
    this.setData({
      showPopup: false
    });
  },
  onMonthTap(event) {
    const monthIndex = event.currentTarget.dataset.index;
    const calendar = this.selectComponent('#calendar');
    if (calendar) {
      calendar.setData({
        currentDate: new Date(this.data.year, monthIndex, 1).getTime()
      });
    } else {
      console.error("Calendar component not found");
    }
  },

  onPrevYear() {
    this.setData({
      year: this.data.year - 1
    });
  },

  onNextYear() {
    this.setData({
      year: this.data.year + 1
    });
  },

})