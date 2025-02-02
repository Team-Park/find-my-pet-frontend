import { BASE_URL } from '@/app/constant/api';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import LocalStorage from './localStorage';


let isRefreshing = false;
let refreshedTokenPromise: Promise<{accessToken: string; refreshToken: string}> | null = null;


// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL, // 기본 API URL
  timeout: 5000, // 요청 타임아웃: 5000ms (5초)
  headers: {
    'Content-Type': 'application/json', // 기본 Content-Type 설정
  },
});

// 요청 인터셉터 (Optional: 요청 전 실행)
apiClient.interceptors.request.use(
  (config) => {
    const token = LocalStorage.getItem('at')?.replace(/"/g, '');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 처리
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
      } = error;
      if (status === 403 && !isRefreshing) {
        isRefreshing = true;
        const originalRequest = config;
        const refreshToken = LocalStorage.getItem('rt')?.replace(/"/g, '');;
        const body = {
            refreshToken: refreshToken
        }
        refreshedTokenPromise = axios.post(`${BASE_URL}/auth/reissue`, body)
          .then((res) => {
            isRefreshing = false;
            refreshedTokenPromise = null;
            return res.data.data;
          })
          .catch((err) => {
            isRefreshing = false;
            // 재발급 요청에 대한 권한이 없음
            window.location.href = '/'
            LocalStorage.removeItem('at')
            LocalStorage.removeItem('rt')
            if (err.response.status === 403) {
              // 로그아웃 로직
            }
            return Promise.reject(err);
          });
  
        const newToken = await refreshedTokenPromise;
  
        if (newToken) {
          config.headers.Authorization = newToken.accessToken;
          LocalStorage.setItem('at', newToken.accessToken)
          LocalStorage.setItem('rt', newToken.refreshToken)
        }
  
        // '최초 만료 요청'
        return apiClient(originalRequest);
      }
  
    //   이전에 토큰 갱신을 시도했지만 아직 완료되지 않았을 때
      if (status === 403 && isRefreshing) {
        // 요청 대기
        const newToken = await refreshedTokenPromise;
        if (newToken) {
          config.headers.Authorization = newToken;
        }
        // 대기 요청 처리
        return apiClient(config);
      }
      return Promise.reject(error);
    }
  );
export default apiClient;