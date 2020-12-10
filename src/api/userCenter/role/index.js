import {post, get, del, put} from '@/utils/service';
import url from '../url';

class AccountService {
	roleList(params) {
		return get(url.roleList, params);
	}
	roleAdd(params) {
		return post(url.roleAdd, params);
	}
	rolePermissions(params) {
		return get(url.rolePermissions, params);
	}
	roleEdit(id) {
		return get(url.roleEdit(id));
	}
	roleDelete(id) {
		return del(url.roleEdit(id));
	}
	userList(params) {
		return get(url.userList, params);
	}
	userAdd(params) {
		return post(url.userAdd, params);
	}
	userEdit(id) {
		return get(url.userEdit(id))
	}
	userFrost(id,code) {
		return put(url.userFrost(id,code))
	}
	userSearch(name) {
		return post(url.userSearch, name)
	}
	
}

export default new AccountService();