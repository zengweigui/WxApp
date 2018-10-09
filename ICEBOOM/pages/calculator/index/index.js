//获取应用实例
let rpn = require('../../../utils/rpn.js')
let app = getApp()
Page({
  data: {
    idback: "back",
    idclear: "clear",
    idadd: "+",
    id9: "9",
    id8: "8",
    id7: "7",
    idj: "-",
    id6: "6",
    id5: "5",
    id4: "4",
    idx: "×",
    id3: "3",
    id2: "2",
    id1: "1",
    iddiv: "÷",
    id0: "0",
    idd: ".",
    idequal: "=",
    screenData: "0",
    screenPrevData: "",
    screenPrevDataFontSize: "50",
    screenDataFontSize: "140",
    operaSymbo: {
      "+": "+",
      "-": "-",
      "×": "×",
      "÷": "÷",
      ".": "."
    },
    lastIsOperaSymbo: false,
    logs: [],
    screenDataLeft: 0,
    screenPrevDataLeft: 0,
    windowScale: 0,
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // app.setWatcher(this);
  },
  // 监听属性变化
  // watch: {
  //   screenData: function(newVal, oldVal) {
  //     console.log(newVal, oldVal)
  //   }
  // },
  // screenData变化时执行
  screenScroll: function () {
    //创建节点选择器
    let query = wx.createSelectorQuery();
    //选择id
    let self = this;
    query.select('.screen-data').boundingClientRect(function (rect) {
      if (rect.width > 670 * self.data.windowScale) {
        let screenDataLeft = rect.width - 670 * self.data.windowScale
        let start = new Date().getTime()
        self.setData({
          screenDataLeft: screenDataLeft
        })
        let end = new Date().getTime();
        console.log("执行时间：" + (end - start));
      }
    }).exec();
  },
  // screenPrevData变化时执行
  screenPrevScroll: function () {
    //创建节点选择器
    let query = wx.createSelectorQuery();
    //选择id
    let self = this;
    query.select('.screen-prev-data').boundingClientRect(function (rect) {
      if (rect.width > 670 * self.data.windowScale) {
        self.setData({
          screenPrevDataLeft: rect.width - 670 * self.data.windowScale
        })
      }
    }).exec();
  },
  onReady: function() {
    // 页面渲染完成
    let self = this;
    wx.getSystemInfo({
      success: function(res) {
        let windowWidth = (res.windowWidth * (750 / res.windowHeight)); //将高度乘以换算后的该设备的rpx与px的比例
        self.setData({
          windowScale: res.windowWidth / 750
        })
      }
    })
  },
  onShow: function() {
    // 页面显示 
  },
  onHide: function() {
    // 页面隐藏 
  },
  onUnload: function() {
    // 页面关闭 
  },
  clickBtn: function(event) {
    //获取触发点击事件的标签的id 
    let id = event.target.id
    if (id == this.data.idback) {
      //退格← 
      let data = this.data.screenData;
      if (data == 0) {
        return;
      }
      // substring(start, stop) 方法用于提取字符串中介于两个指定下标之间的字符。
      // start必需。一个非负的整数，规定要提取的子串的第一个字符在 stringObject 中的位置。
      // stop 可选。一个非负的整数，比要提取的子串的最后一个字符在 stringObject 中的位置多 1。如果省略该参数，那么返回的子串会一直到字符串的结尾。
      data = data.substring(0, data.length - 1);
      //屏幕上不会显示东西了
      if (data == "" || data == "-") {
        //只剩下一个负号？不合理对吧
        data = 0;
      }
      this.setData({
        'screenData': data
      }, () => {
        this.screenScroll()
      });
    } else if (id == this.data.idclear) {
      //清屏 
      this.setData({
        'screenData': '0',
        'screenPrevData': ''
      }, () => {
        this.screenScroll()
      });
    } else if (id == this.data.idequal) {
      //等于= 
      let data = this.data.screenData;
      if (data == "0") {
        return;
      }
      //eval是js中window的一个方法，而微信页面的脚本逻辑在是在JsCore中运行，JsCore是一个没有窗口对象的环境，所以不能再脚本中使用window，也无法在脚本中操作组件
      //let result = eval(newData); 
      //eval方法不能用，只能我们自己来写了
      //不过我们可以调用rpn.js这个库，他已经为我们做好了
      //判断最后一位如果是操作符，则不运算 
      //isNaN() 函数用于检查其参数是否是非数字值。 isNaN(123)返回false isNaN(wqwq)返回true 
      let lastWord = data.charAt(data.length - 1);
      if (isNaN(lastWord)) {
        return;
      }
      let log = this.data.screenData;
      //获取rpn库运算结果
      let calData = rpn.calCommonExp(log);

      // 本地存储
      this.data.logs.push(log + "=" + calData);
      let allLogs = wx.getStorageSync('calclogs') || [];
      allLogs.unshift(log + "=" + calData);
      wx.setStorageSync('calclogs', allLogs);

      this.setData({
        'screenData': calData + "",
        'screenPrevData': log + "="
      }, () => {
        this.screenScroll()
        this.screenPrevScroll()
      });
    } else {
      // 运算符和数字的问题  还有“.”
      if (this.data.operaSymbo[id]) {
        // 如果是符号+-×÷
        if (this.data.lastIsOperaSymbo) {
          // 如果是最后一位是符号，就不能在收入符号
          return;
        }
      }
      let sd = this.data.screenData;
      let data;
      //这个if else逻辑很简单 
      if (sd == 0) {
        if (id == this.data.operaSymbo[id]) {
          if (id == "-") {
            data = id;
          } else {
            return;
          }
        } else {
          data = id;
        }
      } else {
        data = sd + id;
      }
      this.setData({
        'screenData': data
      }, () => {
        this.screenScroll()
      });
      ///置一下最后一位是否为运算符的标志位 
      if (this.data.operaSymbo[id]) {
        this.setData({
          "lastIsOperaSymbo": true
        });
      } else {
        this.setData({
          "lastIsOperaSymbo": false
        });
      }
    }
  },
  history: function() {
    wx.navigateTo({
      url: '../history/index'
    })
  }
})