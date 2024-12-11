import { getToken } from "@/core/utils/token.function";
import { executeSpin } from "@/core/services/execute-spin.api";
import { SnackbarStatusEnum } from "@/core/enums/snackbar.enum";
import { useLoginStore } from "@/stores/login";
import { useSnackbarStore } from "@/stores/snackbar";
import {ref,type Ref} from "vue";
import {useUserInfoStore} from "@/stores/user-info";
import type {IUserRewards} from "@/core/models/user-info.interface";

export const useExecuteSpin = (totalSlices: number, isSpinning: Ref<boolean>) => {
  const lucks = [
    "lottery_chance_200_million",
    "nab_profile",
    "internet",
    "okala",
    "snapp",
    "bab_discount",
    "charge",
    "habl_discount",
  ];
  const winnerLuck = ref("");

  const loginStore = useLoginStore();
  const snackbarStore = useSnackbarStore();
  const currentRotation = ref<number>(0);
  const rotationAngle = ref<number>(0);
  const awardWinnerLuck = ref<IUserRewards>({})
  const userInfoStore = useUserInfoStore();

  const spinStart = () => {
    if (!getToken()?.length) {
      loginStore.setOpenLoginState(true);
      return;
    }
    if (isSpinning.value) return;
    if (userInfoStore.userData.score === 0 || !userInfoStore.userData.referralLink  ) return;

    isSpinning.value = true;

    const fullRotation = 360 * 5;
    currentRotation.value += fullRotation;
    rotationAngle.value = currentRotation.value;

    executeSpin()
      .then((res) => {
        winnerLuck.value = res.rewardType;
        awardWinnerLuck.value = res;
        const index = lucks.indexOf(winnerLuck.value);
        if (index === -1) {
          snackbarStore.showSnackbar({
            message: 'لطفا دوباره تلاش کنید.',
            type: SnackbarStatusEnum.Error,
          });
          return;
        }
        const winnerIndex = index + 1;
        const sliceAngle = 360 / totalSlices;
        const targetAngle = (winnerIndex - 1) * sliceAngle;
        userInfoStore.updateScore((userInfoStore.userData.score as number) - 1)
        currentRotation.value += targetAngle - (currentRotation.value % 360);
        rotationAngle.value = currentRotation.value;
      })
      .catch((error) => {
        snackbarStore.showSnackbar({
          message: error.response.data.message,
          type: SnackbarStatusEnum.Error,
        });
      })
  };

  return {
    spinStart,
    rotationAngle,
    awardWinnerLuck
  };
};
