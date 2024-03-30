import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { postRequest } from '../../../../../utils/axios-service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function LoanDetails({ loanDetails }) {

    const token = JSON.parse(sessionStorage.getItem("AdminAuth"));
    const navigator = useNavigate()
    const ChangeLoanStatus = (item, status) => {
        const payload = {
            loan_id: item._id,
            account_number: item.personalInformation.Account_no,
            email: item.personalInformation.email,
            status: status
        }

        postRequest("/api/changeLoanStatus", payload, { "Authorization": token }).then((resp) => {
            if (resp.data.status == true) {
                toast.success(resp.data.message);
                // window.location.reload();
            } else {
                toast.error(resp.data.message);
            }
        });


        console.log(payload);
    }

    function gotoDetails(id){
        navigator(`/admin/customer/loan-details/${id}`)
    }
    return (
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
                    {loanDetails.map((row) => (
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
                            {/* <TableCell>
                                {row.loanDetails.loan_status == "Pending" && <>
                                    <Button color='success' size='small' className='m-1' onClick={() => ChangeLoanStatus(row, "Approved")}>Approve</Button>
                                    <Button color='warning' size='small' className='m-1' onClick={() => ChangeLoanStatus(row, "Rejected")}>Reject</Button>
                                </>}
                                {row.loanDetails.loan_status === "Rejected" && <Button color='success' size='small' className='m-1' onClick={() => ChangeLoanStatus(row, "Approved")}>Approve</Button>}
                                {row.loanDetails.loan_status === "Approved" && <Button color='warning' size='small' className='m-1' onClick={() => ChangeLoanStatus(row, "Rejected")}>Reject</Button>}
                            </TableCell> */}
                            <TableCell>
                                <Button color='primary' variant='contained' size='small' onClick={() => gotoDetails(row._id)}>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
