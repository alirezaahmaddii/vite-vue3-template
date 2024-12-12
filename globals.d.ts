export { };

declare global {
    interface Window {
        fillOTPInput: (otpCode: string) => void;
    }
}