import {IUseReward, IUserRewardResponse} from "@/core/models/use-reward.interface";
import axiosInstance from "@/core/services/interceptor";

export const useReward = (payload: IUseReward): Promise<IUserRewardResponse> => {
  return axiosInstance.post(
    "use-reward",
    payload
  )
}
