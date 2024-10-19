import { BASE_URL } from '@/app/constant/api';
import axios, { AxiosInstance } from 'axios';
import LocalStorage from './localStorage';

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

// 응답 인터셉터 (Optional: 응답 후 처리)
apiClient.interceptors.response.use(
  (response) => {
    // 예: 응답 데이터를 변경하거나 특정 처리를 적용
    return response;
  },
  (error) => {
    // 에러 핸들링 (예: 에러 상태 코드에 따른 처리)
    if (error.response && error.response.status === 401) {
      // 인증 오류 처리
    }
    return Promise.reject(error);
  }
);

export default apiClient;