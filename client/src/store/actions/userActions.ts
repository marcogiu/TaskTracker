// userActions.ts
import { createAction } from "@reduxjs/toolkit";
import { User } from "../types";

export const registerUserRequest = createAction<User>("user/registerRequest");
export const registerUserSuccess = createAction<User>("user/registerSuccess");
export const registerUserFailure = createAction<string>("user/registerFailure");
