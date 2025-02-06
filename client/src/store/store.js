import { configureStore } from "@reduxjs/toolkit";
import consultationReducer from "./consultation-slice/index"
import authReducer from "./auth-slice/index";

const store = configureStore({
    reducer: {
        auth: authReducer,
        consultation:consultationReducer
    },
  });
  
  export default store;
