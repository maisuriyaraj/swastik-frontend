import { createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../utils/axios-service';

export const getAllData = createAsyncThunk('getCustomers', async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const result = await response.json();
    return result;
});

export const loadData = createAsyncThunk('customerDetails', async ({ userID, token },{rejectWithValue}) => {
    const payload = {
        id: userID.userID
    };
    try {
        const response = await postRequest('/api/getCustomerDetails', payload, { 'Authorization': userID.token });
        return response.data.data;
    } catch (error) {
        return rejectWithValue("Oops ! Somthinf went Wrong !!...");
    }
});

export const AddWallet = createAsyncThunk('addWallet',async(payload,{rejectWithValue}) =>{
    const body = {
        email:payload.email,
        walletBalance:payload.walletBalance,
        id:payload.id,
        mpin:payload.mpin
    }
    try {
        const response = await postRequest('/api/add-wallet',body,{'Authorization':payload.token});
        return response.data;
    } catch (error) {
    return rejectWithValue("Unable to Provide Service !...");
    }
})