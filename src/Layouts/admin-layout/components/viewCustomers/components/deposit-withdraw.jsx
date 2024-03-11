import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Card } from '@mui/material';
import '../viewCustomersInfo.scss';
import { putRequest } from '../../../../../utils/axios-service';
import { toast } from 'react-toastify';
import Loader from '../../../../../utils/react-loader';

export default function DepositWithdraw({ userDetails }) {
    const [TransectionType, setTransection] = useState("deposite");
    const [amount, setAmount] = useState("");
    const [btnText, setbtnText] = useState("Deposit");
    const [pan, setPan] = useState("")
    const empID = JSON.parse(sessionStorage.getItem("Admin")) || "";
    const token = JSON.parse(sessionStorage.getItem("AdminAuth")) || "";
    const [loader, setLoader] = useState(false);

    const handleSelect = (e) => {
        setTransection(e.target.value);
        if (e.target.value == "deposite") {
            setbtnText("Deposite");
        } else {
            setbtnText("Withdraw");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (TransectionType == "deposite") {
            const payload = {
                customer_id: userDetails._id,
                deposit_amount: Number(amount),
                account_number: userDetails.account_number,
                emp_id: empID
            }
            setLoader(true);
            setTimeout(() => {
                putRequest('/api/deposit-cash', payload, { 'Authorization': token }).then((resp) => {
                    if (resp.data.status == true && resp.data.code == 201) {
                        toast.success(resp.data.message,{position:'bottom-right'});
                        window.location.reload();
                    } else if(resp.data.status == false) {
                        setLoader(false);
                        console.log(resp)
                        toast.error(resp.data.message,{position:'bottom-right'});
                    }
                })
                
            }, 3000);
        } else {
            const payload = {
                customer_id: userDetails._id,
                withdraw_amount: Number(amount),
                account_number: userDetails.account_number,
                emp_id: empID
            }
            setLoader(true);
            setTimeout(() => {
                putRequest('/api/withdraw-cash', payload, { 'Authorization': token }).then((resp) => {
                    if (resp.data.status == true && resp.data.code == 201) {
                        toast.success(resp.data.message,{position:'bottom-right'});
                        window.location.reload();
                    } else {
                        setLoader(false);
                        toast.error(resp.data.message,{position:'bottom-right'});
                    }
                })
            }, 3000);
        }
    }
    return (
        <>
            <div className='container' id='depositPage'>
                <div className='w-50'>
                    <Card className="formBox p-4" variant='outlined'>
                        <div className="text-center">
                            <h2>Deposit/Withdraw</h2>
                        </div>
                       {!loader &&  <div className="form-style">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="form-group mt-2 mb-2">
                                    <label htmlFor="email" className="mb-1 mt-1">
                                        Choose Trasection <span className="text-danger">*</span>
                                    </label>
                                    <select name="transection" value={TransectionType} className='form-control text-dark' onChange={(e) => { handleSelect(e) }}  required>
                                        <option value="" hidden selected>Choose Transection</option>
                                        <option value="withdraw">WithDraw Amount</option>
                                        <option value="deposite">Deposite Amount</option>
                                    </select>
                                </div>
                                <div className="form-group mt-2 mb-2" style={{ position: "relative" }}>
                                    <label htmlFor="email" className="mb-1 mt-1">
                                        Account Number <span className="text-danger">*</span>
                                    </label>
                                    <input type="text" className='form-control text-dark' value={userDetails.account_number || "N/A"} readOnly />
                                </div>
                                <div className="form-group mt-2 mb-2" style={{ position: "relative" }}>
                                    <label htmlFor="email" className="mb-1 mt-1">
                                        Enter Amount  <span className="text-danger">*</span>
                                    </label>
                                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Rs.' className='form-control text-dark' required />
                                </div>
                                {/* {amount > 50000 && <div className="form-group mt-2 mb-2" style={{ position: "relative" }}>
                                    <label htmlFor="email" className="mb-1 mt-1">
                                        Pan Number <span className="text-danger">*</span>
                                    </label>
                                    <input type="text" className='form-control text-dark' placeholder='Enter Pan Card Number' value={pan} onChange={(e) => setPan(e.target.value)} required />
                                </div>} */}
                                <div className="pb-2">
                                    <button
                                        type="submit"
                                        className="btn btn-submit w-100 font-weight-bold mt-2"
                                    >
                                        {btnText}
                                    </button>
                                </div>
                            </form>
                        </div>}
                        {loader && <Loader loading={loader} className="loader" />}
                    </Card>
                </div>
            </div>
        </>
    )
}
