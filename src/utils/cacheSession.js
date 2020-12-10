class CacheSession {
	set = async (key, data) => {
		try {
			return await sessionStorage.setItem(key, data);
		} catch (err) {
			console.log(err);
		}
	}

	get = async (key) => {
		try {
			return await sessionStorage.getItem(key);
		} catch (err) {
			console.log(err);
		}
	}

	remove = async (key) => {
		try {
			return  await sessionStorage.removeItem(key);
		} catch (err) {
			console.log(err);
		}
	}

	clear = async () => {
		try {
			return await sessionStorage.clear();
		} catch (err) {
			console.log(err);
		}
	}
}

export const cacheSession = new CacheSession();
