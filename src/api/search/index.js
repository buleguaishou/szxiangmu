import {post, get, del, put} from '@/utils/service';
import url from './url';

class AccountService {
    getList(params) {
		return get(url.getList, params);
	}
	message(sldh, params) {
		return get(url.message(sldh), params);
	}
	afterList(params) {
		return get(url.afterList, params);
	}
}

export default new AccountService();
