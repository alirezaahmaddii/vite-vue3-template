import { defineStore } from "pinia";
import type { IUserInfo, IUserRewards } from "@/core/models/user-info.interface";
import {ref} from "vue";

export const useUserInfoStore = defineStore("userStore", () => {
  const userData = ref<IUserInfo>({
    referralLink: undefined,
    score: 1,
    userRewards: [],
  });

  const updateScore = (newScore: number) => {
    userData.value.score = newScore;
  };

  const addUserReward = (reward: IUserRewards) => {
    userData.value.userRewards = [...(userData.value.userRewards ?? []), reward];
  };

  const resetUserRewards = () => {
    userData.value.userRewards = [];
  };

  const updateUserData = (newData: IUserInfo) => {
    userData.value.referralLink = newData.referralLink;
    userData.value.score = newData.score;
    userData.value.userRewards = [...(newData.userRewards ?? [])];
  };

  return {
    userData,
    updateScore,
    addUserReward,
    resetUserRewards,
    updateUserData,
  };
});
