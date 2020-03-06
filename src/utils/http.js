import axios from "axios"
import auth from "./auth"
import router from "../rouers"

const BASE_URL = 'http://127.0.0.1:8100';


class Http {
    constructor() {
        this.http = axios.create(
            {
                baseURL: BASE_URL,
                timeout: 1000
            }
        );

        // 请求之前的拦截器，用来设置JWT
        this.http.interceptors.request.use(config => {
            const token = auth.token;
            if (token) {
                config.headers.common.Authorization = 'JWT ' + token
            }
            return config
        });

        // 响应之后的拦截器
        this.http.interceptors.response.use(response => {
            if (response.status === 403) {
                auth.clearUserToken();
                router.replace('/login')
            }
            return response
        })
    }

    login(params){
        const url = "/cms/login";
        return this.http.post(url,params)
    }

    getMerchants(page=1){
        const url = "/cms/merchant?page="+page;
        return this.http.get(url)
    }

    addMerchant(data){
        const url = "/cms/merchant";
        return this.http.post(url,data)
    }

}

export default new Http();