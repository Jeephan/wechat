// components/post/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    res:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e){
      // // console.log(e)
      // const pid = e.currentTarget.dataset.pid  这是原先的从自定义属性中取值，现在因为是组件，每次的页面id都是不同的，所有不需要先把数据传到wxml再传回来了
      // // console.log(pid)
      // wx.navigateTo({
      //   url: '/pages/post-detail/post-detail?pid='+pid,
      // })
      // console.log(this.data.res.postId)
      const pid = this.data.res.postId
      //自定义方法  里面没写具体的业务逻辑，所以保证了自定义组件的独立性
      this.triggerEvent('posttap',{
        pid:pid,
      })
    },
    // onMaxImage(){
    //   console.log("查看大图")
    // }
  }
})
