import { ref } from "vue";
export function useOTP() {
    const verificationCode = ref<string>()
    return { verificationCode };
}