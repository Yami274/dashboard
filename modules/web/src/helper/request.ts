// import Axios from 'axios';

// export const request = Axios.create({
//   baseURL: '/api',
// });

// request.interceptors.request.use((config) => {
//   if (config?.headers?.Authorization) {
//     return config;
//   }

//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
//   }
//   return config;
// });


import axios from 'axios';

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || '/api', // 支持 .env 配置
  timeout: 20000,
});

request.interceptors.request.use((config) => {
  // 兜底 headers
  config.headers = config.headers || {};

  // 如果外部已手动传了 Authorization，就不要覆盖
  if (!config.headers.Authorization) {
    // 取本地 token；可按你们项目的 key 调整
    let raw =
      (typeof window !== 'undefined' && (localStorage.getItem('token') || sessionStorage.getItem('token'))) ||
      process.env.NEXT_PUBLIC_FAKE_TOKEN || // 可在 .env.local 里临时塞一个开发用 token
      '';

    // 有些项目会把 token 用 JSON.stringify 存，做个兼容
    if (raw && (raw.startsWith('"') || raw.startsWith('{') || raw.startsWith('['))) {
      try {
        raw = JSON.parse(raw);
      } catch {
        // ignore
      }
    }

    if (raw) {
      config.headers.Authorization = raw.startsWith('Bearer ')
        ? raw
        : `Bearer ${raw}`;
    }
  }

  return config;
});
export default request;