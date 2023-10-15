import {
  postList
} from "../../data/data.js"
const app = getApp()
// console.log(app.globalData.test)
// console.log(app.globalData.global)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    isPlaying: false,  //控制音频播放
    collected: false,  //收藏状态
    _pid: null, //作为数据传输的中转站
    //todo 此处有 bug 
    _postCollected: {},
    _mgr: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const postData = postList[options.pid]
    this.data._pid = options.pid // 当前的文章id
    const postCollected = wx.getStorageSync('postCollected') //在页面加载时就从 存储 中取出收藏状态
    this.data._postCollected = postCollected
    let collected = postCollected[this.data._pid] //根据文章 id 取出对应的收藏状态
    if (collected === undefined) {
      collected = false
    }
    this.setData({
      isPlaying: this.currentMusicIsPlaying(),
      postData,
      collected,
    })
    // console.log(this.data)
    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    mgr.onPlay(this.playAudio)
    mgr.onPause(this.stopAudio)
  },
  currentMusicIsPlaying() {
    if (app.globalData.gIsPlayingMusic && app.globalData.gIsPlayingPostId === this.data._pid) {
      return true
    }
    return false
  },
  /**
   * 点击收藏按钮
   */
  async onCollect(e) {
    const postCollected = this.data._postCollected // 读取缓存里面的数据
    postCollected[this.data._pid] = !this.data.collected
    this.setData({
      collected: !this.data.collected
    })
    wx.setStorageSync('post_collected', postCollected)
    wx.showToast({
      title: this.data.collected ? '收藏成功' : '取消收藏',
      duration: 1000
    }) 
  },
  /**
   * 点击分享 
   */
  async onShare(e) {
    wx.showActionSheet({
      itemList: ['分享到微信好友', '分享到QQ'],
    })
  },
  /**
   * 点击播放音乐
   */
  playAudio(e) {
    const mgr = this.data._mgr
    const music = postList[this.data._pid].music
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg
    mgr.src = music.url
    app.globalData.gIsPlayingMusic = true
    app.globalData.gIsPlayingPostId = this.data._pid
    this.setData({
      isPlaying: true
    })
  },
  /**
   * 点击暂停音乐
   */
  stopAudio(e) {
    const mgr = this.data._mgr
    mgr.pause()
    app.globalData.gIsPlayingMusic = false
    app.globalData.gIsPlayingPostId = -1
    this.setData({
      isPlaying: false
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