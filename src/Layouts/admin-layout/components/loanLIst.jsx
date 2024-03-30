import React, { useEffect, useState } from 'react'
import { postRequest } from '../../../utils/axios-service';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import SideBar from './sideBar';
export default function LoanList() {
    const [loanDetailsList, setLoanDetails] = useState([]);
    const token = JSON.parse(sessionStorage.getItem("AdminAuth"));
    useEffect(() => {
        getAllLOanDEtails();
    }, []);

    async function getAllLOanDEtails() {
        try {
            const response = await postRequest("/api/getAllLoanDetailsAdmin", {}, { "Authorization": token });
            if (response.data.status === true) {
                setLoanDetails(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container-fluid px-0">
                <SideBar />
                <div className="container">

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
                                    <TableCell>Action</TableCell>
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
                                        <TableCell>{row.loanDetails.loan_status}</TableCell>
                                        <TableCell>
                                            <Button color='success' size='small' className='m-1'>Approve</Button>
                                            <Button color='warning' size='small' className='m-1'>Reject</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>
        </>
    )
}
