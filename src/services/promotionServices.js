import requestApi from "../utils/requestApi";

export const getAllPromotionServices = async () => {
  try {
    const respone = await requestApi({
      url: "Promotion/all",
      method: "get",
    });
    return respone.data;
  } catch (error) {
    return error;
  }
};

export const addPromotionService = (formData) => {
  return requestApi({
    url: "Promotion/add",
    method: "post",
    data: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deletePromotionServices = async (id) => {
  try {
    const respone = await requestApi({
      url: "Promotion/delete",
      method: "delete",
      data: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(respone.data);
    return respone.data;
  } catch (error) {
    return error;
  }
};

export const editPromotionService = (formData) => {
  return requestApi({
    url: `Promotion/edit`,
    method: "put",
    data: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
