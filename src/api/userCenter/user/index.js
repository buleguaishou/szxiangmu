import {post, get} from '@/utils/service';
import url from '../url';
class AccountService {
	login(params) {
		return post(url.login, params);
	}
	info(params) {
		return get(url.info, params);
	}
	change(params) {
		return post(url.change, params);
	}
}

export default new AccountService();