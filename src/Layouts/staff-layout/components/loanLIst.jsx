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
import SideBar from './sidebar';
import { toast } from 'react-toastify';
import logo from "../../../assets/swastik_logo.png"
export default function LoanList() {
    const [loanDetailsList,setLoanDetails] = useState([]);
    const [employee,setEmp] = useState({});
    const token = JSON.parse(sessionStorage.getItem("staffAuth"));
    useEffect(() =>{
        getAllLOanDEtails();
        loadEmployeeData();
    },[]);

    async function getAllLOanDEtails() {
        try {
            const response = await  postRequest("/api/getAllLoanDetailsStaff",{},{"Authorization":token});
            if(response.data.status === true){
                setLoanDetails(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function loadEmployeeData() {
        let AuthToken = JSON.parse(sessionStorage.getItem("staffAuth"));
        let empID = JSON.parse(sessionStorage.getItem("employee"));
        postRequest("/api/getEmployee", { id: empID }, { 'Authorization': AuthToken }).then((resp) => {
          if (resp.data.status === true && resp.data.code == 201) {
            setEmp(resp.data.data);
          } else {
            toast(resp.data.message)
          }
        })
      }
    return (
        <>
           <div className="container-fluid px-0">
           <SideBar userData={employee} />
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
