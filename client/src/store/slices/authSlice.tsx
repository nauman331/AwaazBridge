import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    userdata: any | null;
    token: string | null;
}
const authSlice = createSlice({
    name: "auth",
    initialState: {
        userdata: null,
        token: null,
    } as AuthState,
    reducers: {
        setUserdata: (state, action) => {
            state.userdata = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.userdata = null;
            state.token = null;
        }
    }
})

export default authSlice.reducer;
export const { setUserdata, setToken, logout } = authSlice.actions;