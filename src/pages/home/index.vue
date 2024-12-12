<template>
  <div class="container w-100 h-100 px-4 py-5 mx-auto overflow-x-hidden">
    <app-header />
    <wheel-image
      carousel-icon="/melon.png"
      :chance-number="userInfoStore.userData.score as number"
      duration-animation="10"
      spin-wheel-image="/Vector.png"
      image-wheel-of-luck="/shape1.png"
      :rotation-angle="rotationAngle"
      @done="doneWheel"
      @spin-wheel="spinStart"
    />
    <lucky-ways-getting />
    <list-of-award
      :list-award="userInfoStore.userData.userRewards as IUserRewards[]"
      @award-click="handleClickOnAward"
    />

    <bottom-sheet-award
      v-if="awardChoices.rewardType"
      :title="awardChoices.rewardTitle as string"
      :description="description"
      :icon="awardChoices.icon as string"
      :text-btn="textBtn"
      :is-open-bottom-sheet="isOpenBottomSheet"
      @update:is-open-bottom-sheet="isOpenBottomSheet = !isOpenBottomSheet"
      @submit-bottom-sheet="submitBottomSheetBtn"
    >
      <template #content>
        <component :is="computedContent" />
      </template>
    </bottom-sheet-award>
    <bottomSheetSurvey />
  </div>
</template>

<script setup lang="ts">
import appHeader from "./components/Header.vue"
import {useExecuteSpin} from "@/pages/home/composable/useExecuteSpin";
import {getUserInfo} from "@/core/services/get-user-info.api";
import {computed, defineAsyncComponent, h, onMounted, ref} from "vue";
import {useUserInfoStore} from "@/stores/user-info";
import type {IUserRewards} from "@/core/models/user-info.interface";
import {SnackbarStatusEnum} from "@/core/enums/snackbar.enum";
import {useSnackbarStore} from "@/stores/snackbar";
import {getToken} from "@/core/utils/token.function";
import TwoStepUseRewardContent from "./components/TwoStepUseRewardContent.vue";
import {useReward} from "@/core/services/user-reward";
import {IUseReward} from "@/core/models/use-reward.interface";

const luckyWaysGetting = defineAsyncComponent(
  () => import("./components/LuckyWaysGetting.vue")
);
const wheelImage = defineAsyncComponent(
  () => import("./components/WheelImage.vue")
);
const discountContent = defineAsyncComponent(
  () => import("./components/DiscountContent.vue")
);
const listOfAward = defineAsyncComponent(
  () => import("./components/ListOfAward.vue")
);
const bottomSheetAward = defineAsyncComponent(
  () => import("./components/BottomSheetAward.vue")
);
const bottomSheetSurvey = defineAsyncComponent(
  () => import("./components/survey/BottomSheetSurvey.vue")
);

const description = ref<string>("");
const textBtn = ref<string>("تایید");
const awardChoices = ref<IUserRewards>({});
const isOpenBottomSheet = ref<boolean>(false);
const isSpinning = ref<boolean>(false);
const mobilePhoneNumber = ref("");
const selectedOperator = ref<string>("hamrahe-aval");
const isChangeOperator = ref(false)
const userInfoStore = useUserInfoStore();
const snackbarStore = useSnackbarStore();
const { spinStart, rotationAngle, awardWinnerLuck } = useExecuteSpin(
  8,
  isSpinning
);
const hasErrorOfValidation = ref<boolean>(false);
const doneWheel = () => {
  if (awardWinnerLuck.value.rewardType) {
    isOpenBottomSheet.value = true;
    awardChoices.value = awardWinnerLuck.value;
    userInfoStore.addUserReward(awardWinnerLuck.value);
  }
  isSpinning.value = false;
};

const handleClickOnAward = (award: IUserRewards) => {
  isOpenBottomSheet.value = true;
  awardChoices.value = award;
};

const getUserInformation = () => {
  getUserInfo()
    .then((res) => {
      userInfoStore.updateUserData(res);
    })
    .catch((error) => {
      snackbarStore.showSnackbar({
        message: error.response.data.message,
        type: SnackbarStatusEnum.Error,
      });
    });
};

const computedContent = computed(() =>
  getAwardContent(awardChoices.value.rewardType as string)
);
const getAwardContent = (type: string) => {
  textBtn.value = "تایید"
  description.value = "";
  switch (type) {
    case "lottery_chance_200_million":
      description.value =
        "تبریک! شما ۱۰ امتیاز برای قرعه‌کشی کمک‌هزینه خرید خودرو کوییک به دست آوردید 🎉  امتیازاتتون به‌طور خودکار ثبت شد. منتظر شانس بزرگتون باشید!";
      return;

    case "nab_profile":
      description.value =
        "این جایزه به شماره‌ای که با آن وارد شدید تعلق می‌گیرد.برای استفاده از این اشتراک به “ اطلاعات حساب “ خود بروید.";
      textBtn.value = "رفتن به اطلاعات حساب";
      return;

    case "habl_discount":
      return h(discountContent, {
        title: awardChoices.value.rewardTitle as string,
        expireDate: awardChoices?.value.expireDate as string,
      });

    case "bab_discount":
      return h(discountContent, {
        title: awardChoices.value.rewardTitle as string,
        expireDate: awardChoices?.value.expireDate as string,
      });

    case "charge":
      return h(TwoStepUseRewardContent, {
        typeRewardTwoStep: "charge",
        isUsed: awardChoices.value.used as boolean,
        "onUpdate:mobile-phone-number": (value:string) => mobilePhoneNumber.value = value,
        "onUpdate:is-change-operator": (value:boolean) => isChangeOperator.value = value,
        "onUpdate:selected-operator": (value:string) => selectedOperator.value = value,
        onHasError: (hasError) => hasErrorOfValidation.value = hasError,
      });

    case "internet":
      return h(TwoStepUseRewardContent, {
        typeRewardTwoStep: "charge",
        isUsed: awardChoices.value.used as boolean,
        "onUpdate:mobile-phone-number": (value:string) => mobilePhoneNumber.value = value,
        "onUpdate:is-change-operator": (value:boolean) => isChangeOperator.value = value,
        "onUpdate:selected-operator": (value:string) => selectedOperator.value = value,
        onHasError: (hasError) => hasErrorOfValidation.value = hasError,
      });

    case "cash":
      description.value =
        "دوستان شما در بادصبا تا 24 ساعت آینده با شما تماس میگیرند.";
      return;

    default:
      return "";
  }
};
onMounted(() => {
  if (getToken()) getUserInformation();
});

const useRewardCharge = () => {
  if (!hasErrorOfValidation.value) {
    const rewardData:IUseReward = {
      cellphone: mobilePhoneNumber.value,
      userRewardId: awardChoices.value.userRewardId as string,
    };

    if (isChangeOperator.value) {
      rewardData.operator = selectedOperator.value;
      rewardData.simType = "post-paid";
    }
    useReward(rewardData).then((response) => {
      awardChoices.value.used = true;
      snackbarStore.showSnackbar({
        message: response.message,
        type: SnackbarStatusEnum.Success,
      });
    }).catch((error) => {
      snackbarStore.showSnackbar({
        message: error.response.data.message,
        type: SnackbarStatusEnum.Error,
      });
    });
  }
}

const actionHandlers = {
  "nab_profile": () => {
    console.log("Navigate to profile");
  },
  "habl_discount": () => {
    console.log("Handle habl_discount");
  },
  "bab_discount": () => {
    console.log("Handle bab_discount");
  },
  charge: () => {
    useRewardCharge();
  },
  internet: () => {
    useRewardCharge();
  },
  cash: () => {
    console.log("Handle cash reward");
  },
  default: () => {
    isOpenBottomSheet.value = !isOpenBottomSheet.value
  },
};

const submitBottomSheetBtn = () => {
  const handler = actionHandlers[awardChoices.value.rewardType] || actionHandlers.default;
  handler();
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 700px;
  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .badge-round {
    ::v-deep(.v-badge__badge) {
      border-radius: 8px;
      padding: 13px;
    }
  }

  .badge-padding {
    ::v-deep(.v-badge__badge) {
      padding: 30px;
      font-size: 14px;
    }
  }
}
</style>
