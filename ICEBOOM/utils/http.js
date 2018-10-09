import {config} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: '1005错误',
  3000: '3000错误',
  70000: '路径或参数错误'
}

class HTTP {
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    if (!params.data) {
      params.data = {}
    }
    wx.request({
      url: config.api_base_url + params.url,
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      method: params.method,
      data: params.data,
      dataType: 'json',
      success: (res) => {
        switch(params.source) {
          case 'tuchong':
            if (res.data.result == 'SUCCESS') {
              params.success(res.data);
            } else {
              this._show_error(res.data.code)
            }
            break;
          default: break;
        }
      },
      fail: (err) => {
        this._show_error(err.code)
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export {HTTP}