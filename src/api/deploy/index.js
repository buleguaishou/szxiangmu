import {post, get, del, put} from '@/utils/service';
import url from './url';

class AccountService {
    chartList(params) {
		return get(url.chartList, params);
	}
	chartDetails(id){
		return get(url.chartDetails(id));
	}
	changchart(id, value) {
		return put(url.changchart(id, value));
	}
	applicationInfo(params) {
		return get(url.applicationInfo, params);
	}
	registerInfo(params) {
		return get(url.registerInfo, params);
	}
	reviewInfo(params) {
		return get(url.reviewInfo, params);
	}
	changApply(key, value) {
		return put(url.changapply(key, value));
	}
	changReview(key, value) {
		return put(url.changreview(key, value));
	}
	changRegister(key, value) {
		return put(url.changregister(key, value));
	}
}

export default new AccountService();
