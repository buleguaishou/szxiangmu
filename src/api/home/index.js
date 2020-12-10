import {post, get, del, put} from '@/utils/service';
import url from './url';

class AccountService {
    info(params) {
		return get(url.info, params);
	}
    commissionList(params) {
		return get(url.commissionList, params);
	}
	staList(params) {
		return get(url.staList, params);
	}
	menuList(params) {
		return get(url.menuList, params);
	}
}

export default new AccountService();
