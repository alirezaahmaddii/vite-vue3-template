import { useUserInfoStore } from "@/stores/user-info";
import { useRoute } from "vue-router";
import { registerWheel } from "../services/auth.api";
import { IRegisterWheelDto, ISurveyResult } from "../models/login.interface";
import { useSurveyStore } from "@/stores/survey";
import { setSurveyAnswer } from "../utils/token.function";

export function useRegisterWheelConfirm() {
  const userInfoStore = useUserInfoStore();
  const surveyStore = useSurveyStore();
  const route = useRoute();
  const registerWheelConfirm = (surveyResult?: ISurveyResult[]) => {
    registerWheel({ referralKey: route.query?.referralKey as string, surveyResult }).then(
      (response: IRegisterWheelDto) => {
        userInfoStore.updateUserData(response);
        if (surveyResult?.length) {
          setSurveyAnswer("true")
          surveyStore.openSurvey = false;
        }
      }
    );
  };

  return {
    registerWheelConfirm,
  }
}
