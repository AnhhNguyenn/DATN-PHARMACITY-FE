import requestApi from "../utils/requestApi";

export const loginServices = async (dataLogin) => {
    try {
        const respone = await requestApi({
            method: "post",
            url: "user/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(dataLogin),
        });
        return respone;
    } catch (error) {
        return error;
    }
};
export const loginGoogleService = async (dataLogin) => {
    try {
        const respone = await requestApi({
            method: "post",
            url: "user/logingoogle",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(dataLogin),
        });
        return respone;
    } catch (error) {
        return error;
    }
};

export const getCurrentUser = async (accessToken) => {
    try {
        const respone = await requestApi({
            method: "get",
            url: `user/info?token=${accessToken}`,
        });
        return respone
    } catch (error) {
        return error
    }
};