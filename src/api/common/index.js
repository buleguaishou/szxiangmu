import {post, get, del, put} from '@/utils/service';
import url from './url';

class AccountService {
  upfile(type,params) {
		return post(url.upfile(type), params, {
        headers: {
            "Content-Type": "multipart/form-data"
          }
    });
  }
  upZip(params, callback) {
    return post(url.upZip, params, {
      timeout: 60000,
      headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress(progressEvent){
          let val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0);
          callback && callback(parseInt(val))
        },
    });
  }
  base64(type,params) {
    return post(url.base64(type),params)
  }
  // downlodeZip(sldh){
  //   return get(url.downlodeZip(sldh))
  // }
  download(sldh) {
    return post(url.download(sldh))
  }
  passimg(type, param) {
    return get(url.passimg(type, param))
  }
}

export default new AccountService();