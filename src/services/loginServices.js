import requestApi from "../utils/requestApi";

export const loginServices = async (dataLogin) => { // dataLogin chứa email và password PLAIN TEXT
    try {
        const respone = await requestApi({
            method: "post",
            url: "user/login",
            headers: {
                "Content-Type": "application/json",
            },
            // Gửi dataLogin (PLAIN TEXT) lên backend
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
}