const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: [],
    top250: [],
    searchResult: false,
    searchData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
        url: app.globalData.gBaseUrl + 'in_theaters',
        method: 'GET',
        data: {
          start: 0,
          count: 3
        },
        success: (res) => {
          console.log(res)
          this.setData({
            inTheaters: res.data.subjects
          })
        }
      }),
      wx.request({
        url: app.globalData.gBaseUrl + 'coming_soon?start=0&count=3',
        success: (res) => {
          console.log(res)
          this.setData({
            comingSoon: res.data.subjects
          })
        }
      }),
      wx.request({
        url: app.globalData.gBaseUrl + 'top250?start=0&count=3',
        success: (res) => {
          console.log(res)
          this.setData({
            top250: res.data.subjects
          })
        }
      })
  },
  onGotoMore(e) {
    console.log(e)
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type=' + type,
    })
  },
  /**
   * 搜索栏输入监听事件 
   */
  onConfirm(e) {
    // console.log(e)
    this.setData({
      searchResult: true
    })
    wx.request({
      url: app.globalData.gBaseUrl + 'search',
      data: {
        q: e.detail.value
      },
      success: (res) => {
        console.res
        this.setData({
          searchData: res.data.subjects
        })
      }
    })
  },
  /**
   * 点击取消返回 
   */
  onSearchCancel(e) {
    this.setData({
      searchResult: false
    })
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