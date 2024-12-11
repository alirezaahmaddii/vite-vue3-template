<template>
  <div class="container w-100 h-100 px-4 py-5 mx-auto overflow-x-hidden">
<!--  ` <SendNumberForChargeContent />-->
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
    >
      <template #content>
        <component :is="computedContent" />
      </template>
    </bottom-sheet-award>
    <bottomSheetSurvey></bottomSheetSurvey>
  </div>
</template>

<script setup lang="ts">
import { VBadge } from "vuetify/components";
import { useSurveyStore } from "@/stores/survey";
import appHeader from "./components/Header.vue"
import {useExecuteSpin} from "@/pages/home/composable/useExecuteSpin";
import {getUserInfo} from "@/core/services/get-user-info.api";
import {computed, defineAsyncComponent, h, onMounted, ref} from "vue";
import {useUserInfoStore} from "@/stores/user-info";
import type {IUserRewards} from "@/core/models/user-info.interface";
import {SnackbarStatusEnum} from "@/core/enums/snackbar.enum";
import {useSnackbarStore} from "@/stores/snackbar";
import {getToken} from "@/core/utils/token.function";
import MobileInput from "@/pages/home/components/MobileInput.vue";
// import SendNumberForChargeContent from "./components/SendNumberForChargeContent.vue";

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

const userInfoStore = useUserInfoStore();
const snackbarStore = useSnackbarStore();
const { spinStart, rotationAngle, awardWinnerLuck } = useExecuteSpin(
  8,
  isSpinning
);

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
      return h(VBadge, {
        content: "شارژ موردنظر تا 24 ساعت آینده فعال خواهد شد",
        inline: true,
        color: "light-green-lighten-4",
        textColor: "light-green",
        class: "badge-padding",
      });

    case "internet":
      return h(VBadge, {
        content: "بسته موردنظر تا 24 ساعت آینده فعال خواهد شد",
        inline: true,
        color: "light-green-lighten-4",
        textColor: "light-green",
        class: "badge-padding",
      });

    case "send_charge":
      description.value =
        "لطفا شماره موبایلی که میخواهید شارژ به اون واریز بشه رو وارد کنید";
      return h(MobileInput);

    case "send_internet":
      description.value =
        "لطفا شماره موبایلی که میخواهید بسته به اون واریز بشه رو وارد کنید";
      return h(MobileInput);

    case "cash":
      description.value =
        "لطفا شماره موبایلی که میخواهید بسته به اون واریز بشه رو وارد کنید";
      return;

    default:
      return "";
  }
};

const surveyStore = useSurveyStore();
onMounted(() => {
  if (getToken()) getUserInformation();
  surveyStore.openSurvey = true;
});
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
