
export interface IUserRewards {
  rewardKey?: string,
  rewardTitle?: string,
  rewardType?: string,
  userRewardId?: string,
  discountCode?: string,
  expireDate?: string,
  icon?: string;
  smallIcon?: string,
  isNab?: boolean,
  used?: boolean,
}

export interface IUserInfo {
  score?: number,
  referralLink?: string,
  userRewards?: IUserRewards[]
}
