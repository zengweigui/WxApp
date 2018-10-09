// components/douban-movie-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movies: {
      type: Array,
      value: [{}]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imgerror(e) {
      console.log(this.data.movies)

      let index = e.target.dataset.index;
      let movies = this.data.movies;
      movies[index].images.large = '/images/not-img.png'
      this.setData({
        movies: movies
      })
    },
    seeDetail: function (e) {
      this.triggerEvent('handleDetailToParent', e.currentTarget.dataset.movie)
    }
  }
})
