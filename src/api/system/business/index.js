import {post, get, del, put} from '@/utils/service';
import url from '../url';

class AccountService {
    busList(params) {
		return get(url.busList, params);
    }
    busAdd(params) {
		return post(url.busAdd, params);
	}
	busDel(id) {
		return del(url.busDel(id));
	}
	busState(id, status) {
		return put(url.busState(id, status));
	}
	busEdit(id,params) {
		return put(url.busEdit(id),params);
	}
	sourceList(params) {
		return get(url.sourceList, params);
	}
	sourceState(id, status) {
		return put(url.sourceState(id, status));
	}
	fileList(params) {
		return get(url.fileList, params);
	}
	
	depList(params) {
		return get(url.depList, params);
	}
	deployList(params) {
		return get(url.deployList, params);
	}
	surList(params) {
		return get(url.surList, params);
	}
	surAdd(params) {
		return post(url.surAdd, params);
	}
}

export default new AccountService();