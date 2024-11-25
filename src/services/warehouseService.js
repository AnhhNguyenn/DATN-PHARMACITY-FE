import requestApi from "../utils/requestApi";

export const getAllWarehouseServices = async () => {
  try {
    const respone = await requestApi({
      url: "warehouse/all",
      method: "get",
    });
    return respone.data;
  } catch (error) {
    return error;
  }
};
export const addWarehouseService = (formData) => {
  return requestApi({
    url: "warehouse/add",
    method: "post",
    data: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const deleteWarehouseServices = async (id) => {
  try {
    const respone = await requestApi({
      url: "warehouse/delete",
      method: "delete",
      data: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return respone.data;
  } catch (error) {
    return error;
  }
};
export const editWarehouseService = (formData) => {
  return requestApi({
    url: `warehouse/edit`,
    method: "put",
    data: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};