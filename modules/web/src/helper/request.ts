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
  baseURL: process.env.NEXT_PUBLIC_API_BASE || '/api', 
  timeout: 20000,
});

request.interceptors.request.use((config) => {

  config.headers = config.headers || {};

  
  if (!config.headers.Authorization) {
    
    let raw =
      (typeof window !== 'undefined' && (localStorage.getItem('token') || sessionStorage.getItem('token'))) ||
      process.env.NEXT_PUBLIC_FAKE_TOKEN || 
      '';

    if (raw && (raw.startsWith('"') || raw.startsWith('{') || raw.startsWith('['))) {
      try {
        raw = JSON.parse(raw);
      } catch {
 
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