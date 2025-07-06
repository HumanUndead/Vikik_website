import apiClient from "../api";
import { IOTPGenerat } from "../type";

export const CreateAccount = async (
  name: string,
  gender: string,
  phone: string
) => {
  try {
    const response = await apiClient().post(
      `Services/RegisterUser?name=${name}&gender=${gender}&phone=${phone}`
    );
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

/* ----------  Login API  ---------- */
export const LoginAccount = async (phone: string, langID: string) => {
  try {
    const response = await apiClient().get(
      `Vikik/Login?Phone=${phone}&langID=${langID}`
    );

    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

/* ----------  OTP Generation  ---------- */

export const OTPGenerate = async (OTPData: IOTPGenerat) => {
  try {
    const response = await apiClient().post("Services/OTPGenerate", OTPData);
    return response.data;
  } catch (error) {
    console.log("Error Generating OTP", error);
  }
};

/* ----------  OTP Verfiy  ---------- */
export const OTPVerify = async (
  userId: string | undefined,
  otp: string,
  langID: string
) => {
  try {
    const response = await apiClient().post(
      `Vikik/UserVerifyOTP?userId=${userId}&OTP=${otp}&langId=${langID}`,
      { Phone: userId, OTP: otp }
    );

    return response.data;
  } catch (error) {
    console.log("Error Verfiy OTP", error);
  }
};

export const GetUser = async (userId: undefined | string) => {
  try {
    const response = await apiClient().post(
      `Services/GetUser?userID=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

export const UpdateUserInf = async (
  userId: string | undefined,
  name: string,
  gender: string,
  dob: string,
  email: string,
  langId: string,
  isRegister: boolean
) => {
  try {
    const response = await apiClient().post(
      `Vikik/UpdateUser?userId=${userId}&email=${email}&name=${name}&gender=${gender}&dOB=${dob}&isRegister=${isRegister}&langId=${langId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

export const MergeUser = async (oldId: string, newId: string) => {
  try {
    const response = await apiClient().post(
      `Vikik/MergeUser?oldId=${oldId}&newId=${newId}  
`
    );
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
  }
};
