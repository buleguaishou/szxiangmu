import {post, get, del, put} from '@/utils/service';
import url from '../url';

class AccountService {
    borrowList(params) {
		return get(url.borrowList, params);
	}
	borrowAdd(params) {
		return post(url.borrowAdd, params);
	}
	getzl(params) {
		return get(url.getzl, params);
	}
	detailsList(id) {
		return get(url.detailsList(id));
	}
	borrowDel(id) {
		return del(url.borrowDel(id));
	}
	query(params) {
		return get(url.query, params);
	}
}

export default new AccountService();