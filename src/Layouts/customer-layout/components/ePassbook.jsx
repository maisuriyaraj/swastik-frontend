import React, { useEffect, useState } from 'react';
import { postRequest } from '../../../utils/axios-service';
import logo from "../../../assets/swastik_logo.png";
import "./customerLayout.scss"
import {TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Paper, Button, Icon} from '@mui/material'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { getPasswbookPDF } from '../../../utils/pdfPassbookFormat';
import SideBar from './sidebar';

// Register fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function EPassbook() {
    const token = JSON.parse(sessionStorage.getItem("userToken")) || "";
    const customer = JSON.parse(sessionStorage.getItem("user")) || "";
    const [selectedDate, setSelectedDate] = useState();
    const [userDetails,setDetails] = useState({});
    const [Transection, setTransections] = useState([])
    useEffect(() => {
        loadDataTransection();
        loadCustomerData();
    }, []);

    const loadDataTransection = async () => {
        try {
            const payload = {
                customer_id: customer
            };
            const response = await postRequest('/api/getTransectionsCustomer', payload, { 'Authorization': token.trim() });
            if(response.data.status === true){
                setTransections(response.data.data.transections || [])
            }else{
                setTransections([])
            }
        } catch (error) {
            console.error('Error fetching transections:', error);
        }
    }

    const loadCustomerData = () =>  {
        const payload = {
          id: customer
        };
        try {
          postRequest('/api/getCustomerDetails', payload, { 'Authorization': token }).then((resp) => {
            if(resp.data.status == true){
                setDetails(resp.data.data);
                console.log(resp.data.data)
            }else{
                setDetails({});
            }
          }).catch((err) => {
            console.log(err)
          })
        } catch (error) {
          console.log(error)
        }
      }

    const generatePDF = () => {
        pdfMake.createPdf(getPasswbookPDF(userDetails,Transection)).download(`passbook.pdf`);
      }
    return (
        <div className="" id='transectionCustomer'>
            <SideBar userData={userDetails} />
            <div className='container'>
            <div className='w-100'>
                <img src={logo} width={'80px'} alt="" />
            </div>
            <div className='w-100'>
                <div className="row mb-2">
                    <div className='col-md-12 text-end mb-2 mt-2'>
                        <Button variant='contained' className='mx-2 p-3' color='secondary' size='large' onClick={generatePDF} >Download Passbook &nbsp;&nbsp;<Icon style={{fontSize:'30px'}}>download_for_offline</Icon> </Button>
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
                            {Transection && Transection.map((x, i) => (
                                <TableRow key={i}>
                                    <TableCell>{x.deposit_amount == 0 ? 'Withdrawal' : 'Deposite'}</TableCell>
                                    <TableCell>{x.date_of_transection || "N/A"}</TableCell>
                                    <TableCell>{x.date_of_time || "N/A"}</TableCell>
                                    <TableCell>{x.deposit_amount == 0 ? '-' : x.deposit_amount}</TableCell>
                                    <TableCell>{x.withdraw_amount == 0 ? '-' : x.withdraw_amount}</TableCell>
                                    <TableCell>{x.current_balance}</TableCell>
                                </TableRow>
                            ))}
                            {
                                Transection.length == 0 &&
                                <TableRow>
                                    <TableCell colSpan={6} align='center'>No Data</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            </div>
        </div>
    )
}
