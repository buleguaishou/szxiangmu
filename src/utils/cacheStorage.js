import localForage from 'localforage';
import moment from 'moment';
const EXPIRE_KEY = '_expire';

class Cache {
  generateKey = (url, params) => {
    const sortedParams = Object.keys(params).sort().reduce((result, key) => {
      result[key] = params[key];
      return result;
    }, {});
    url += `${JSON.stringify(sortedParams)}`;
    return url;
  }

  set = async (key, data, expired = 60) => {
    try {
      await localForage.setItem(key, data);
      // [year, month, day, hour, minute, second, millisecond]
      await localForage.setItem(`${key}${EXPIRE_KEY}`, moment().add(expired, 'minute').toISOString());
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  get = async (key) => {
    try {
      const expiredKey = `${key}${EXPIRE_KEY}`;
      const expired = await localForage.getItem(expiredKey);
      if (expired && moment(expired).isBefore(moment())) {
        await localForage.removeItem(expiredKey);
        return null;
      } else {
        return await localForage.getItem(key);
      }
    } catch (err) {
      console.log(err);
    }
  }

  remove = async (key) => {
    try {
      const expiredKey = `${key}${EXPIRE_KEY}`;
      await localForage.removeItem(expiredKey);
      return await localForage.removeItem(key);
    } catch (err) {
      console.log(err);
    }
  }

  clear = async () => {
    try {
      await localForage.clear();
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Cache();
