import axios, {
    AxiosInstance,
    AxiosRequestConfig,
  } from "axios";
  
  const DEFAULT_TIMEOUT = 10000; // 10 seconds
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const apiClient = (): AxiosInstance => {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: API_URL,
      timeout: DEFAULT_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const instance: AxiosInstance = axios.create(axiosConfig);
  
    /* const requestHandler = (
      request: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig => {
      const userToken: string | null = "";
  
      if (userToken) {
        request.headers.set("Authorization", `Bearer ${userToken}`);
      }
  
      return request;
    };
  
    const onResponseError = (error: AxiosError): Promise<never> => {
      ErrorHandler(
        Number(error.response?.status) || 500,
        error as AxiosError<ErrorResponse>
      );
  
      return Promise.reject(error);
    };
  
    instance.interceptors.request.use(requestHandler, (error: AxiosError) =>
      Promise.reject(error)
    );
  
    instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      onResponseError
    ); */
  
    return instance;
  };
  
  export default apiClient;
  
  
  
  
  
  
  
  
  
  
  
  
  