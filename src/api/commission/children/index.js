import {post, get, del, put} from '@/utils/service';
import url from '../url';

class AccountService {
	auditList(sldh) {
		return get(url.auditList(sldh));
	}
	recordingList(sldh) {
		return get(url.recordingList(sldh));
	}
	applyList(sldh) {
		return get(url.applyList(sldh));
	}
	getFile(sldh,params) {
		return get(url.getFile(sldh),params)
	}
	nopass(sldh) {
		return get(url.nopass(sldh))
	}
	signpass(sldh) {
		return get(url.signpass(sldh))
	}


	signList(params) {
		return get(url.signList, params);
	}
	signBatch(params) {
		return post(url.signBatch, params);
	}
	Pigeon(sldh) {
		return get(url.Pigeon(sldh))
	}
	allList(params) {
		return get(url.allList, params);
	}
	settleNumber(sldhs, params) {
		return put(url.settleNumber(sldhs), params);
	}
	settleAffirm(sldhs, params) {
		return post(url.settleAffirm(sldhs), params);
	}
	storedAffirm(sldhs,params) {
		return post(url.storedAffirm(sldhs),params,{
			timeout: 20000,
		})
	}
}

export default new AccountService();