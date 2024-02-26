import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    user: {}
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        loginRequested(state, action) {
            state.isLoading = true;
        },
        logginSuccessful(state, action){
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false
        },
        loginError(state, action){
            state.isLoading = false;
            state.isLoggedIn = false;
            state.user = {};
        },
        logout(state){
            state.isLoading = false;
            state.isLoggedIn = false;
            state.user = {};
        }

    }
})

export const {loginRequested, logginSuccessful, loginError, logout} = userSlice.actions;
export default userSlice.reducer;