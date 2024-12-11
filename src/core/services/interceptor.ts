import axios, { AxiosError, type AxiosResponse } from "axios";
import { getToken } from "@/core/utils/token.function";
import { useSnackbarStore } from "@/stores/snackbar";
import { SnackbarLocationEnum, SnackbarStatusEnum } from "@/core/enums/snackbar.enum";

const snackbarStore = useSnackbarStore();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    authorization: getToken()
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!navigator.onLine) {
      snackbarStore.showSnackbar({
        message: "لطفا دسترسی به اینترنت را بررسی کنید ",
        type: SnackbarStatusEnum.Error,
        duration: 3000,
        location: SnackbarLocationEnum.Top,
      });
      return Promise.reject(new Error("No internet connection"));
    }

    config.headers["Content-Type"] = "application/json";

    const token: string | null = getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

interface IApiResponse {
  message: string;
}

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function handleError(error: AxiosError<{ data: IApiResponse | IApiResponse[] }>) {
    if (!navigator.onLine) {
      snackbarStore.showSnackbar({
        message: "لطفا دسترسی به اینترنت را بررسی کنید ",
        type: SnackbarStatusEnum.Error,
        location: SnackbarLocationEnum.Top,
      });
      return Promise.reject(new Error("No internet connection"));
    }

    if (error?.response?.status === 403) {
      // Handle forbidden error e.g., show restricted access warning
    }

    if (error?.response?.status === 500) {
      snackbarStore.showSnackbar({
        message: "خطا دربرقرای ارتباط با سرور",
        type: SnackbarStatusEnum.Error,
      });
      return Promise.reject(error);
    }

    if (error?.response?.status === 401) {
      // Handle unauthorized error e.g., refresh and set token in storage
    }

    // Safely narrow the type of `data`
    const data = error?.response?.data;
    // Narrowing down the type of `data`
    let message: string | undefined;

    if (Array.isArray(data)) {
      // Check if `data` is an array
      if (data.length > 0 && "message" in data[0]) {
        message = (data[0] as IApiResponse).message;
      }
    } else if (data && "message" in data) {
      // Check if `data` is an object
      message = (data as IApiResponse).message;
    }

    snackbarStore.showSnackbar({
      message: message || "خطای ناشناخته رخ داده است",
      type: SnackbarStatusEnum.Error,
    });

    return Promise.reject(error); // forward other client errors
  }

);

export default axiosInstance;
