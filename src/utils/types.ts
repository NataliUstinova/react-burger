export type TIngredientType = {
  uniqueId?: string;
  _id: string;
  name: string;
  type: "bun" | "sauce" | "main";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large?: string;
  __v: number;
};

export type TTokenResponse = {
  refreshToken: string;
  accessToken: string;
};

export type TApiHeaders = {
  [key: string]: string;
};

export type TUser = {
  email: string;
  name: string;
};

export type TUserRegisterInfo = {
  password: string;
} & TUser;

export type TUserLoginInfo = {
  email: string;
  password: string;
};

export type TUserConfirmPasswordReset = {
  password: string;
  token: string;
};

export type TUserResetPassword = {
  email: string;
};
export type TServerSuccessfulResponse<T> = {
  success: boolean;
  message?: string;
} & T;

export type TUserResponse = TServerSuccessfulResponse<{
  user: TUser;
}>;

export type TUserResponseWithToken = TServerSuccessfulResponse<
  {
    user: TUser;
  } & TTokenResponse
>;

export type TRefreshResponseWithToken =
  TServerSuccessfulResponse<TTokenResponse>;
