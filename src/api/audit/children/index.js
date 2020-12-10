import {post, get, del, put} from '@/utils/service';
import url from '../url';

class AccountService {
    auditList(params) {
		return get(url.auditList, params);
	}
}

export default new AccountService();