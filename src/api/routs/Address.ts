import apiClient from "../api";
import { CreateAddressProfile } from "../type";

export const GetAddress = async (
  userId: string | undefined,
  langId: string
) => {
  try {
    const data = await apiClient().post(
      `Services/UserAddressesGet?uid=${userId}&langID=${langId}`
    );

    return data.data;
  } catch (error) {
    console.log(error);
    //
  }
};

export const CreateAddress = async (
  userId: string | undefined,
  address: CreateAddressProfile,
  langId: string,
  id?: string
) => {
  try {
    const data = await apiClient().post(
      `Services/UserAddressSave?uid=${userId}&id=${id || 0}&name=${
        address.name
      }&address1=${address.address}&address2=${address.address}&country=${
        address.country
      }&city=${address.city}&phone1=${address.phone}&phone2=${
        address.phone
      }&postal=${address.postal || "11118"}&langID=${langId}`
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
