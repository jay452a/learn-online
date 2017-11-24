import axios from 'axios';

const io = axios.create({ withCredentials: true });

//  请求
io.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//  响应
io.interceptors.response.use(
  response => {
    if (response.data.resCode === '0' || response.data.resultCode === '200') {
      return response.data.data;
    } else if (response.data.head && response.data.head.resultCode === '200') {
      return response.data.body;
    }
    return Promise.reject(
      response.data.resMsg ||
        response.data.resultMsg ||
        (response.data.head && response.data.head.message)
    );
  },
  error => {
    // 400 参数错误
    // 401 未登录
    try {
      switch (error.response.status) {
        case 401: {
          return Promise.reject(
            error.response.data.resMsg || error.response.data.message
          );
        }
        default:
          return Promise.reject(
            error.response.data.resMsg || error.response.data.message
          );
      }
    } catch (e) {
      return Promise.reject(new Error('服务器无响应').message);
    }
  }
);

export default io;
