import React, { useEffect, useState } from 'react'
import { postRequest } from '../../../../utils/axios-service';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Icon } from '@mui/material';
import SideBar from '../sidebar';
import { toast } from 'react-toastify';
import logo from "../../../../assets/swastik_logo.png"
import { useNavigate } from 'react-router-dom';
export default function LoanList() {
    const [loanDetailsList,setLoanDetails] = useState([]);
    const [userData,setUser] = useState({});
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const user = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();
    useEffect(() =>{
        getAllLOanDEtails();
        loadData();
    },[]);

    async function getAllLOanDEtails() {
        try {
            const response = await  postRequest("/api/getLoanDetails",{customer_id:user},{"Authorization":token});
            if(response.data.status === true){
                setLoanDetails(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

   function  loadData() {
        const payload = {
          id: user
        };
        try {
          postRequest('/api/getCustomerDetails', payload, { 'Authorization': token }).then((resp) => {
            setUser(resp?.data?.data || {})
          }).catch((err) => {
            console.log(err)
          })
        } catch (error) {
          console.log(error)
        }
    }

    const viewLoanDetails = (id) =>{
        navigate(`/user/loan-details/${id}`)
    }
    return (
        <>
           <div className="container-fluid px-0">
           <SideBar userData={userData} />
            <div className='text-center' style={{marginTop:'100px'}}>
                <img src={logo} width={100} alt="" />
            </div>
                <div className="container mt-5">

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Applicant's Full Name</TableCell>
                                    <TableCell>Applicant's Email</TableCell>
                                    <TableCell>Applicant's Contact</TableCell>
                                    <TableCell>Applicant's Requested Loan Amount</TableCell>
                                    <TableCell>Application Date</TableCell>
                                    <TableCell>Loan Type</TableCell>
                                    <TableCell>Loan Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loanDetailsList.map((row) => (
                                    <TableRow
                                        key={row._id}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.personalInformation.fullName}
                                        </TableCell>
                                        <TableCell>{row.personalInformation.email}</TableCell>
                                        <TableCell>{row.personalInformation.phoneNumber}</TableCell>
                                        <TableCell>{row.loanDetails.loanAmountRequested}</TableCell>
                                        <TableCell>{row.personalInformation.ApplicationDate}</TableCell>
                                        <TableCell>{row.loanDetails.loanType}</TableCell>
                                        <TableCell><span className={row.loanDetails.loan_status === 'Pending' ? 'text-warning' : (row.loanDetails.loan_status === 'Rejected' ? 'text-danger' : 'text-success' )}>{row.loanDetails.loan_status}</span></TableCell>
                                        <TableCell><Button variant='contained' size='small' className='p-2' onClick={() => viewLoanDetails(row._id)}><Icon>visibility</Icon></Button></TableCell>
                                    </TableRow>
                                ))}

                                {loanDetailsList.length == 0 && <TableRow>
                                    <TableCell colSpan={8}>
                                        No Loans Available
                                    </TableCell>
                                </TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>
        </>
    )
}
