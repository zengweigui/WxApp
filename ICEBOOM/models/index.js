import {HTTP} from '../utils/http.js'
class IndexModel extends HTTP {
  getBanner(sCallback) {
    this.request({
      url: 'https://api.tuchong.com/feed-app', // https://github.com/jokermonn/-Api/blob/master/Tuchong.md
      source: 'tuchong',
      success: (res) => {
        sCallback(res);
      }
    })
  }
}
export {IndexModel}
