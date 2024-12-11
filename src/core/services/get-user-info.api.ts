import type {IUserInfo} from "@/core/models/user-info.interface";
import Axios from "@/core/services/interceptor";

export const getUserInfo = (): Promise<IUserInfo> => {
  return Axios.get(
    "user-info",
  );
}
