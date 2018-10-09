// components/ul-li/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lis: {
      type: Array
    }
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
    onLi: function(e) {
      this.triggerEvent('handleTypeToParent', e.currentTarget.dataset.category)
    }
  }
})
