<template>
  <v-bottom-sheet v-model="loginStore.openLoginState">
    <v-card class="px-4 rounded-t-xl">
      <div :style="{ paddingBottom: keyboardHeight + 'px !important' }">
        <div class="d-flex justify-space-between align-center w-100 mt-6">
          <div class="fw-700 lh-32 fs-18">
            ورود / ثبت نام
          </div>
          <v-icon
            color="#939599"
            @click="loginStore.openLoginState = false"
          >
            mdi mdi-close-circle-outline
          </v-icon>
        </div>
        <p class="text-right fs-14 mt-8 mb-6 text-surface-n40">
          {{ loginStore.loginText }}
        </p>
        <v-form
          ref="form"
          class="d-flex flex-column justify-start align-stretch"
          @submit.prevent="handleLogin"
        >
          <v-text-field
            v-model="phoneNumber"
            density="comfortable"
            class="mb-10"
            label="شماره همراه"
            type="number"
            :rules="mobileRules"
            :minlength="11"
            :maxlength="11"
            variant="outlined"
            required
            hide-details="auto"
            @blur="handleBlurInput"
            @keydown.enter="validate"
            @focus="handleFocusInput"
            @input="clearRules"
          />
          <v-btn
            type="submit"
            :loading="loginLoading"
          >
            <span style="color: white">ثبت شماره</span>
          </v-btn>
        </v-form>
      </div>
    </v-card>
  </v-bottom-sheet>

  <v-bottom-sheet v-model="isOpenOtp">
    <v-card class="px-4 rounded-t-xl">
      <div :style="{ paddingBottom: keyboardHeight + 'px !important' }">
        <div class="d-flex justify-space-between align-center w-100 mt-6">
          <div class="fw-700 lh-32 fs-18">
            کد تایید را وارد کنید
          </div>
          <v-icon
            color="#939599"
            @click="isOpenOtp = false"
          >
            mdi mdi-close-circle-outline
          </v-icon>
        </div>
        <p class="fs-14 lh-28 mt-6 mb-3 text-surface-n40">
          کد تایید برای شماره
          {{ phoneNumber }}
          پیامک شد.
        </p>
        <p
          class="text-primary mb-3 fs-12 lh-28"
          @click="editPhoneNumber"
        >
          اصلاح شماره
          <v-icon
            color="primary"
            class="mr-1"
          >
            mdi-chevron-left
          </v-icon>
        </p>
        <v-form
          ref="verificationForm"
          dir="ltr"
          class="d-flex flex-column justify-start align-stretch"
          @submit.prevent="verify"
        >
          <v-otp-input
            v-model="verificationCode"
            length="5"
            plain
            type="number"
            class="ltr"
            @update:focused="handleKeyboardHeight(300)"
            @finish="verify"
          />

          <p
            v-if="timeLeft > 0"
            class="text-surface-n40 text-center mb-5 mt-10"
          >
            ارسال مجدد کد تایید - {{ timeLeft }} ثانیه
          </p>
          <v-btn
            v-else
            outlined
            block
            class="mt-10"
            @click="login"
          >
            <span style="color: white"> ارسال مجدد کد تایید </span>
          </v-btn>
          <v-btn
            v-if="timeLeft > 0"
            outlined
            block
            type="submit"
            :disabled="!isActive"
            :loading="isActive && loginLoading"
          >
            <span style="color: white"> تایید و پرداخت </span>
          </v-btn>
        </v-form>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup lang="ts">
interface IVForm {
  validate: () => Promise<{ valid: boolean }>;
  reset: () => void;
  resetValidation: () => void;
}
import type {
  IRegisterCellphoneDto,
  IVerifyCellphoneDto,
  IVerifyCellphonePayload,
  OTPRequestDto,
} from "@/core/models/login.interface";
import { registerCellphone, verifyCellphone } from "@/core/services/auth.api";
import {
  callAppUriLogin,
  getSurveyAnswer,
  setPhone,
  setToken,
} from "@/core/utils/token.function";
import {computed, inject, Ref, ref, watch} from "vue";
import { useLoginStore } from "@/stores/login";
import { useSnackbarStore } from "@/stores/snackbar";
import { SnackbarStatusEnum } from "../enums/snackbar.enum";
import { Ref } from "vue";
import { useSurveyStore } from "@/stores/survey";
import { useRegisterWheelConfirm } from "../composable/useRegisterWheel";

const { registerWheelConfirm } = useRegisterWheelConfirm();
const snackbarStore = useSnackbarStore();
const surveyStore = useSurveyStore();
const loginStore = useLoginStore();
const isOpenOtp = ref<boolean>(false);
const loginLoading = ref<boolean>(false);
const phoneNumber = ref<string>();
const verificationForm = ref();
const form = ref<IVForm>();
const timeLeft = ref<number>(60);
const isOpenLogin = ref<boolean>(true);
const verificationCode = inject<Ref<string | undefined>>("verificationCode");
const lengthOtp = ref<number>(5);
const keyboardHeight = ref<number>(16);
const validationToken = ref<string>();
const mobileRules = ref<((value: string) => boolean | string)[]>([
  (value: string) => !!value || "شماره موبایل خود را وارد نمایید",
  (value: string) => /^09\d{9}$/.test(value) || "شماره همراه صحیح نمی باشد",
]);

const getOTPCode = async (): Promise<void> => {
  if ("OTPCredential" in window) {
    try {
      const ac = new AbortController();
      const otpRequest: OTPRequestDto = {
        otp: { transport: ["sms"] },
        signal: ac.signal,
      };
      await navigator.credentials
        .get(otpRequest)
        .then((otp) => {
          //@ts-ignore
          verificationCode.value = otp;
        })
        .catch((error) => {
          console.log(
            "error,",
            error,
            "(navigator.credentials",
            navigator.credentials
          );
        });
    } catch (error) {
      console.log("error", error);
    }
  } else {
    console.log("Web OTP API is not supported on this device/browser");
  }
};

watch(
  () => isOpenOtp.value,
  () => {
    if (isOpenOtp.value) getOTPCode();
  },
  { deep: true }
);

let intervalTimer: null | number = null;

// const closeLoginState = (newValue: boolean) => {
//   if (!newValue && !isOpenOtp.value) {
//     loginStore.setOpenLoginState(newValue);
//   }
// };

// watch(isOpenLogin, closeLoginState);
// watch(isOpenOtp, closeLoginState);

const isActive = computed(() => {
  return verificationCode?.value?.length === lengthOtp.value;
});

const loginFunction = computed(() => loginStore.loginFunction);

const validate = () => {
  setRules();
  form.value?.validate();
};
const setRules = () => {
  mobileRules.value = [
    (value: string) => !!value || "شماره موبایل را وارد نمایید",
    (value: string) => /^09\d{9}$/.test(value) || "شماره همراه صحیح نمی باشد",
  ];
};

const clearRules = () => {
  mobileRules.value = [];
};

const handleFocusInput = () => {
  clearRules();
  handleKeyboardHeight(300);
};

const handleKeyboardHeight = (height: number) => {
  setTimeout(() => {
    keyboardHeight.value = height;
  }, 0);
};

const handleBlurInput = () => {
  validate();
  handleKeyboardHeight(16);
};

const countDownTimer = (maxTimeLeft = 60) => {
  timeLeft.value = maxTimeLeft;
  if (intervalTimer) clearInterval(intervalTimer);
  //@ts-ignore
  intervalTimer = setInterval(() => {
    if (timeLeft.value <= 0) {
      if (intervalTimer) clearInterval(intervalTimer);
      return;
    }
    timeLeft.value -= 1;
  }, 1000);
};

const editPhoneNumber = () => {
  openOtpDg(false);
  loginStore.setOpenLoginState(true);
  cleareVerificationCode();
};

const openOtpDg = (isOpen: boolean, maxTimeLeft = 60) => {
  if (isOpen) {
    countDownTimer(maxTimeLeft);
    verificationForm.value?.reset();
  } else {
    if (intervalTimer) clearInterval(intervalTimer);
  }
  isOpenOtp.value = isOpen;
};

const handleLogin = async () => {
  validate();
  const isValid = await form.value?.validate();
  if (!isValid?.valid) return;

  loginLoading.value = true;

  login();
};

const login = () => {
  registerCellphone(phoneNumber.value as string)
    .then((response: IRegisterCellphoneDto) => {
      const token = response?.validationToken;
      if (token) {
        validationToken.value = token;
      }
      openOtpDg(true);
      getOTPCode();
      loginLoading.value = false;
      isOpenLogin.value = false;
    })
    .catch((error) => {
      if (error === "Request failed with status code 429") {
        snackbarStore.showSnackbar({
          message: "سقف مجاز درخواست, دقایقی بعد تلاش کنید",
          type: SnackbarStatusEnum.Warn, // Example: Adjust type if needed
        });
      } else {
        snackbarStore.showSnackbar({
          message: "خطا در برقراری ارتباط، مجددا تلاش نمایید",
          type: SnackbarStatusEnum.Error, // Example: Adjust type if needed
        });
      }
      loginLoading.value = false;
      isOpenLogin.value = false;
    });
};

const cleareVerificationCode = () => {
  if (verificationCode) {
    verificationCode.value = undefined;
  }
};

const verify = () => {
  loginLoading.value = true;
  const payload: IVerifyCellphonePayload = {
    validationToken: validationToken.value as string,
    verificationCode: verificationCode?.value as string,
  };

  verifyCellphone(payload)
    .then((response: IVerifyCellphoneDto) => {
      const token = response?.token;
      if (token) {
        loginStore.setOpenLoginState(false);
        setToken(token);
        setPhone(phoneNumber.value as string);
        callAppUriLogin(phoneNumber.value as string, token);
        if (!getSurveyAnswer()) {
          surveyStore.openSurvey = true;
        } else {
          registerWheelConfirm();
        }
        loginFunction.value?.();
      }
    })
    .catch((error: string) => {
      if (error.includes("406")) {
        snackbarStore.showSnackbar({
          message: "کد تایید صحیح نمی باشد",
        });
      } else {
        snackbarStore.showSnackbar({
          message: "خطا در برقراری ارتباط، مجددا تلاش نمایید",
        });
      }
    })
    .finally(() => {
      loginLoading.value = false;
    });
};
</script>
<style lang="scss" scoped>
.v-card {
  border-top: 4px solid #b5c458;
}
</style>
