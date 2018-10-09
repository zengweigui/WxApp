// components/swiper/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: {
      type: Array
    },
    indicatorDots: {
      type: Boolean
    },
    autoplay: {
      type: Boolean
    },
    interval: {
      type: Number
    },
    duration: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //所有图片的高度  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndicatorDots: function (e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay: function (e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange: function (e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange: function (e) {
      this.setData({
        duration: e.detail.value
      })
    },
    imageLoad: function (e) {//获取图片真实宽度  
      let imgwidth = e.detail.width,
        imgheight = e.detail.height,
        //宽高比  
        ratio = imgwidth / imgheight;
      //计算的高度值  
      let viewHeight = 750 / ratio;
      imgheight = viewHeight;
      let imgheights = this.data.imgheights;
      //把每一张图片的对应的高度记录到数组里  
      imgheights[e.target.dataset.id] = imgheight;
      this.setData({
        imgheights: imgheights
      })
    },
    bindchange: function (e) {
      this.setData({ current: e.detail.current })
    },
    preview: function(e) {
      let src = e.currentTarget.dataset.src;//获取data-src
      let imgList = e.currentTarget.dataset.list;//获取data-list
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
    }
  }
})
