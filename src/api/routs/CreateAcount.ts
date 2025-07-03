/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../api";

export const CreateAccount = async (accountData: any) => {
  try {
    const response = await apiClient().post("Services/RegisterUser", [
      accountData.name,
      accountData.gender,
      accountData.phone,
      accountData.refID,
    ]);
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

export const loginAccount = async (loginData: any) => {
  try {
    const response = await apiClient().post("Services/Login", loginData);
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
  }
};
