import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginServices, loginGoogleService } from "../../services/loginServices";
import { signupServices, signupGoogleService } from "../../services/signupService";
import {
    editProfileService,
    getInforUserService,
    uploadAvatarService,
} from "../../services/userService";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        status: "idle",
        message: "logout",
        currentUser: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLoginApi.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userLoginApi.fulfilled, (state, action) => {
                action.payload.status !== 200
                    ? (state.message = "Đăng nhập thất bại!")
                    : (state.message = "Đăng nhập thành công!");
                if (state.message === "Đăng nhập thành công!") {
                    state.currentUser = action.payload.data.data;
                    localStorage.setItem(
                        "user",
                        JSON.stringify(action.payload.data.data)
                    );
                    state.status = 200;
                }
            })
            .addCase(userSignupApi.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userLoginGoogleApi.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userLoginGoogleApi.fulfilled, (state, action) => {
                action.payload.status !== 200
                    ? (state.message = "Đăng nhập thất bại!")
                    : (state.message = "Đăng nhập thành công!");
                if (state.message === "Đăng nhập thành công!") {
                    if (action.payload.data && action.payload.data.data && action.payload.data.data[0]) {
                        state.currentUser = action.payload.data.data[0];
                        localStorage.setItem(
                            "user",
                            JSON.stringify(action.payload.data.data[0])
                        );
                        state.status = 200;
                    }

                }
            })
            .addCase(userSignupGoogleApi.pending, (state) => {
                state.status = "loading";
            });
    },
});

export const userLoginApi = createAsyncThunk(
    "user/login",
    async (payload) => {
        try {
            const response = await loginServices(payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
export const userLoginGoogleApi = createAsyncThunk(
    "user/loginGoogle",
    async (payload) => {
        try {

            const response = await loginGoogleService(payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const userSignupApi = createAsyncThunk(
    "user/userSignup",
    async (dataSignup) => {
        const response = await signupServices(dataSignup);
        return response;
    }
);
export const userSignupGoogleApi = createAsyncThunk(
    "user/userSignupGoogle",
    async (dataSignup) => {
        const response = await signupGoogleService(dataSignup);
        return response;
    }
);

export const editProfileApi = createAsyncThunk(
    "user/userEdit",
    async (userEdit) => {
        const response = await editProfileService(userEdit);
        localStorage.setItem("user", JSON.stringify(response.data.data[0]));
        return response;
    }
);

export const uploadAvatarApi = (idUser, formData) => {
    return async (dispatch) => {
        try {
            await uploadAvatarService(idUser, formData);
            const { data } = await getInforUserService();
            localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    };
};