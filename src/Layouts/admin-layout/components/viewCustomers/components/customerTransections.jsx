import React, { useEffect, useState } from 'react'
import { postRequest } from '../../../../../utils/axios-service';
import logo from "../../../../../assets/swastik_logo.png"
import "../viewCustomersInfo.scss"
import { Table, TableBody, TableCell,Paper, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import moment from 'moment';

export default function CustomerTransections({ userDetails,userTransections }) {
    const token = JSON.parse(sessionStorage.getItem("staffAuth")) || "";
    const [selectedDate,setSelectedDate] = useState();
    const [transectionType,setTransection] = useState("");
    const [Transection,setTransections] = useState(userTransections)
    useEffect(() => {
    }, [userDetails]);

    const onFilterDate = () =>{
        console.log(selectedDate)
        const momentDate = moment(selectedDate).format('DD-MM-YYYY');
        console.log(momentDate)
        let filteredData = userTransections.filter((x) => { if(x.date_of_transection == momentDate){return x}});
        setTransections(filteredData);
        console.log(filteredData)
    }

    const onClear = () =>{
        setTransections(userTransections);
        setSelectedDate("")
    }

    return (
        <>
            <div className="container text-center" id='transectionAdmin'>
                <div className='w-100'>
                    <img src={logo} width={'80px'} alt="" />
                    </div>
                <div className='w-100'>
                    <div className="row mb-2">
                        <div className="col-md-4 mb-2">
                            <input type="date" value={selectedDate} className='form-control p-3'  onChange={(e) => {setSelectedDate(e.target.value)}} placeholder='Select Date' />
                        </div>
                        <div className="col-md-2 mb-2">
                            <Button variant='contained' className='mx-2 p-1 p-3' color='primary' fullWidth size='large' onClick={onFilterDate}>Filter</Button>
                        </div>
                        <div className='col-md-2 mb-2'>
                            <Button variant='contained' fullWidth className='mx-2 p-3' color='secondary' size='large' onClick={onClear}>Clear</Button>

                        </div>
                    </div>
                    <TableContainer component={Paper} className='table-div'>
                        <Table sx={{ minWidth: '100%' }} stickyHeader aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>&#8377; Deposite Amount</TableCell>
                                    <TableCell>&#8377; Withdraw Amount</TableCell>
                                    <TableCell>&#8377; Available Balance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Transection && Transection.map((x,i) => (
                                    <TableRow key={i}>
                                        <TableCell>{x.deposit_amount == 0 ? 'Withdrawal' : 'Deposite' }</TableCell>
                                        <TableCell>{x.date_of_transection || "N/A"}</TableCell>
                                        <TableCell>{x.date_of_time || "N/A"}</TableCell>
                                        <TableCell>{x.deposit_amount == 0 ? '-' : x.deposit_amount }</TableCell>
                                        <TableCell>{x.withdraw_amount == 0 ? '-' : x.withdraw_amount }</TableCell>
                                        <TableCell>{x.current_balance}</TableCell>
                                    </TableRow>
                                ))}
                                {
                                    Transection.length == 0&& 
                                    <TableRow>
                                        <TableCell colSpan={6} align='center'>No Data</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </div>
        </>
    )
}
