import { configureStore } from '@reduxjs/toolkit'
import  {AddWalletDetailsReducer, getCustomerDataReducer,getCustomerDetailsReducer}  from './slices/customerSlice'
export const store = configureStore({
  reducer: {
    customers:getCustomerDataReducer,
    customer:getCustomerDetailsReducer,
    wallet:AddWalletDetailsReducer
  },
})