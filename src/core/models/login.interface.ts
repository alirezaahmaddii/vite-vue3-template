import type { ReferralActivationResponseEnum } from "../enums/register.enum";
import type { IUserInfo } from "./user-info.interface";

export interface OTPRequestDto {
  otp: { transport: string[] };
  signal: AbortSignal
}

export interface IRegisterCellphoneDto {
  authMethod: string
  command: string
  validationToken: string
  verificationCode: string
}

export interface IVerifyCellphoneDto {
  token: string
}

export interface IVerifyCellphonePayload {
  validationToken: string,
  verificationCode: string,
}

export interface IRegisterWheelPayload {
  referralKey: string
}
export interface IRegisterWheelDto extends IRegisterWheelPayload, IUserInfo {
  referralActivation: {
    status: ReferralActivationResponseEnum,
    message: string
  }
}