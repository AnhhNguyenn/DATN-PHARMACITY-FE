import requestApi from "../utils/requestApi";

const user = JSON.parse(localStorage.getItem("user"));
const promotion = JSON.parse(localStorage.getItem("promotion"));

export const createOrderService = async (orderData) => {
    try {
        const response = await requestApi({
            method: "get",
            url: `order/confirm?idUser=${orderData.idUser}&status=${orderData.status}&type=${orderData.type}&idPromotion=${orderData.idPromotion || ''}`
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllOrderAnUserService = async (id) => {
    try {
        const respone = await requestApi({
            method: "get",
            url: `order/getAllOrder?idUser=${id}`
        });
        return respone;
    } catch (error) {
        return error;
    }
};
export const deleteOrder = async (id) => {
    try {
        const respone = await requestApi({
            method: "delete",
            url: `order/delete`,
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
export const getDetailsOrderService = async (dataOrderDetail) => {
    try {
        const respone = await requestApi({
            method: "get",
            url: `order/detail/getAllByOrder?idOrder=${dataOrderDetail}`
        });
        return respone.data;
    } catch (error) {
        return error;
    }
};

export const getAllOrderService = () => {
    return requestApi({
        method: "get",
        url: `order/all`
    });
};


export const changeStatusOrderService = async (idOrder, status) => {
    return requestApi({
        method: "get",
        url: `order/confirmOrder?idOrder=${idOrder}&status=${status}`
    });
}

export const getAllDoanhThu = () => {
    return requestApi({
        method: "get",
        url: `thongke/doanhthu`
    });
};