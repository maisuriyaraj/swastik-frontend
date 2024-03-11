import React, { useEffect, useState } from 'react'
// import SideBar from './sideBar'
import { postRequest } from '../../../utils/axios-service';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import logo from '../../../../src/assets/swastik_logo.png'
export default function AdminActivities() {
    const [dataRows, setData] = useState([]);

    useEffect(() => {
        getAllData();
    }, [])
    function getAllData() {
        let AuthToken = JSON.parse(sessionStorage.getItem("AdminAuth"));
        postRequest("/api/admin-activities", {}, { 'Authorization': AuthToken }).then((resp) => {
            setData(resp.data.data);
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <div className='container-fluid px-0' style={{ overflowY: 'auto',height:'100vh' }}>
                {/* <SideBar /> */}
                <div className='main-div' style={{ marginLeft: '300px' }}>
                    <div className='w-100 text-center'>
                        <img src={logo} alt="" width={'100px'} />
                    </div>
                    <TableContainer component={Paper} className='table-div' style={{height:'80vh',overflowY: 'auto' }}>
                        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>API</TableCell>
                                    <TableCell align="center">Method</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Start Time</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataRows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{row.api_name}</TableCell>
                                        <TableCell align="center">{row.api_method}</TableCell>
                                        <TableCell align="center">{row.startDate}</TableCell>
                                        <TableCell align="center">{row.startTime}</TableCell>
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
