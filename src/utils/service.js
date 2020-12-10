import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
import { apiBaseUrl } from '@/config';
import cacheStorage from '@/utils/cacheStorage'
const app = new Vue();
const service = axios.create({
    baseURL: apiBaseUrl,
    timeout: 10000,
    responseType: "json",
    withCredentials: false,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Cache-Control": "no-cache"
    }
});

service.interceptors.request.use(
    async config => {
        const token = await cacheStorage.get('token');
        if(!token){
            // router.push({path: '/login'});
        }
        console.log(token)
        if(token){
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);
const dealBulkData = responseBody => {
    if(responseBody.hasOwnProperty("data")) {
        if(!responseBody.data) {
            return {}
        }
        else if(responseBody.data && responseBody.totalItems){
            return {data:responseBody.data,
                totalItems:responseBody.totalItems,
                totalPages:responseBody.totalPages};
        }
        return responseBody.data
    }
    return responseBody;
};
service.interceptors.response.use(
    async response => {
        if (response.status === 200) {
            if (response.data && response.data.code) {
                switch(response.data.code) {
                    case '200': return dealBulkData(response.data); break;
                    case '401':
                                router.push({path: '/login'});
                                // this.cacheStorage.clear();
                                await app.cacheStorage.clear();
                                await app.cacheStorage.clear();
                                return Promise.reject('登录过期或不合法！');
                                break;
                    case '403': app.$message.error('无权限！'); break;
                    // 系统异常
                    case '500':
                    app.$message.error("系统异常，请联系系统管理员");
                    break;
                    default:
                    app.$message.warning(response.data.message);
                    return response.data;
                    break;
                }
            }
            return response.data;
        } else {
            Promise.reject();
        }
    },
    err => {
        if(err) {
        // console.log(err)
        // if(err.config && err.config.headers.showLoading !== false) {
        //   hideLoading();
        // }
            if (err.code === "ECONNABORTED") {
                app.$message.error('请求超时！');
            } else {
                console.log(err)
            }
        }
        if (err && err.response) {
            switch (err.response.status) {
                case 400:app.$message.error('请求错误');break;
                case 401:app.$message.error('未授权，请登录');break;
                case 403:app.$message.error('拒绝访问');break;
                case 404:app.$message.error(`请求地址出错`); break;
                case 408:app.$message.error('请求超时'); break;
                case 500:app.$message.error('服务不可用'); break;
                case 501:app.$message.error('服务未实现');break;
                case 502:app.$message.error('网关错误'); break;
                case 503:app.$message.error('服务不可用'); break;
                case 504:app.$message.error('网关超时'); break;
                case 505:app.$message.error('HTTP版本不受支持'); break;
                default: break;
            }
        }
        return Promise.reject(err);
    }
);

const errorHandler = (error) => {
    return Promise.reject('error,'+ error);
  };
  /**
   * @param url$
   * @param params
   * @param config
   */
  export const get = (url, config = {}) => {
    return service.get(url, config.headers ? config : {params: config}).then((res) => res, (err) => errorHandler(err));
  };
  export const post = (url, data, config) => {
    return service.post( url, data, config).then((res) => res, (err) => errorHandler(err));
  };
  export const del = (url, config) => {
    return service.delete( url, config).then((res) => res, (err) => errorHandler(err));
  };
  export const put = (url, data, config) => {
    return service.put( url, data , config).then((res) => res, (err) => errorHandler(err));
  };
//   export const request = (url, data, config?): Axios.AxiosPromise<any> => {
//     return service( url, data, config).then((res) => res, (err) => errorHandler(err));
//   };
// export default service;
