import requestApi from "../utils/requestApi";

export const getAllSupplierServices = async () => {
  try {
    const respone = await requestApi({
      url: "supplier/all",
      method: "get",
    });
    return respone.data;
  } catch (error) {
    return error;
  }
};
export const addSupplierService = (formData) => {
  return requestApi({
    url: "supplier/add",
    method: "post",
    data: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const deleteSupplierServices = async (id) => {
  try {
    const respone = await requestApi({
      url: "supplier/delete",
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
export const editSupplierService = (formData) => {
  return requestApi({
    url: `supplier/edit`,
    method: "put",
    data: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
