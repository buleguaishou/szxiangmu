import {post, get, del, put} from '@/utils/service';
import url from './url';

class AccountService {
    staList(params) {
		return get(url.staList, params);
    }
    userLsit(params) {
		return get(url.userLsit, params);
    }
    leadout(params) {
      return get(url.leadout, params);
      }
}

export default new AccountService();
