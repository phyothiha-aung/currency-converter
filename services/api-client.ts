import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const apiClient = axios.create({
  baseURL: 'http://api.currencylayer.com',
  params: {
    access_key: '47cd68fa21d97c9a6016e0ef1482ec32',
  },
});

export default apiClient;
