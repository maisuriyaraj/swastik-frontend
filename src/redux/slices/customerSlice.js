import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  {getAllData,loadData,AddWallet } from './customerActions';
// Action


export const getCustomerData = createSlice({
    name: "getCustomers",
    initialState: {
        customers: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllData.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(getAllData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const getCustomerDetails = createSlice({
    name:"customerDetails",
    initialState:{
        data:{},
        loading:false,
        error:null
    },
    extraReducers:(builder) =>{
        builder
        .addCase(loadData.pending,(state)=>{
            state.loading = true;
        })
        .addCase(loadData.fulfilled,(state,action)=>{
            state.loading = true;
            state.data = action.payload
        })
        .addCase(loadData.rejected,(state,action)=>{
            state.loading = true;
            state.error = action.payload
        })
    }
})

export const AddWalletDetails = createSlice({
    name:'customerDetails',
    initialState:{
        data:{},
        loading:false,
        error:null
    },
    extraReducers:(builder) =>{
        builder
        .addCase(AddWallet.fulfilled,(state,action)=>{
            state.loading = true
            state.data = action.payload
        }).addCase(AddWallet.pending,(state) =>{
            state.loading  = true
        }).addCase(AddWallet.rejected,(state,action) =>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const getCustomerDataReducer = getCustomerData.reducer;
export const getCustomerDetailsReducer = getCustomerDetails.reducer;
export const AddWalletDetailsReducer = AddWalletDetails.reducer


