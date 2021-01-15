 interface SucceedRegisterUserResponse {
  id: string;
  email: string;
}

 interface FailedRegisterUserResponse {
  isSuccess:false;
  description: string;
}

export type RegisterUserResponse = SucceedRegisterUserResponse | FailedRegisterUserResponse