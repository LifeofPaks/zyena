import { configureStore } from "@reduxjs/toolkit";
import consultationSlice from "./consultation-slice/index"

const store = configureStore({
    reducer: {
        consultation:consultationSlice
    },
  });
  
  export default store;