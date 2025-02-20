import { configureStore } from "@reduxjs/toolkit";
import consultationReducer from "./consultation-slice/index"
import authReducer from "./auth-slice/index";
import contactUsReducer from "./contact-slice/index"

const store = configureStore({
    reducer: {
        auth: authReducer,
        consultations:consultationReducer,
        contacts:contactUsReducer
    },
  });
  
  export default store;
