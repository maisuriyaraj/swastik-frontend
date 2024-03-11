import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./staffDashboard.scss"
import { useTheme } from '@mui/material/styles';
import { Button, Icon, TextField } from '@mui/material';
import { postRequest } from '../../../utils/axios-service';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import SideBar from "./sidebar"

export default function StaffDashboard(props) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const names = [
    'Customers'
  ]
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedGroup, selectGroiup] = useState("");
  const [dataRows, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [employee, setEmp] = useState({})
  const theme = useTheme();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useState(() => {
    loadData();
    loadEmployeeData();
  }, [])

  useEffect(() => {
  }, [props])

  function loadData() {
    let AuthToken = JSON.parse(sessionStorage.getItem("staffAuth"));
    postRequest("/api/getCustomers", {}, { 'Authorization': AuthToken }).then((resp) => {
      if (resp.data.status == true) {
        setData(resp.data.data);
      }
    }).catch(err => {
      console.log(err);
    })
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

  const viewCustomer = (customer_id) => {
    navigate(`/staff/customer?id=${customer_id}`)
  }

  const handleCancle = () => {
    setSearch("");
    loadData();
  }

  const onFilter = () => {
    if (search) {
      let newArr = dataRows.filter((x) => {
        if (x.first_name == search || x.last_name == search || x.email == search || x.pan_number == search || x.adhar_number == search) {
          return x;
        } else {

        }
      });
      setData(newArr);
    }
  }

  const columns = [
    { field: 'first_name', headerName: "Customer's First Name", width: 250 },
    { field: 'last_name', headerName: "Customer's Last Name", width: 250 },
    { field: 'email', headerName: "Customer's Email", width: 250 },
    { field: 'dob', headerName: "Date Of Birth", width: 250 },
    { field: 'phone', headerName: "Customer's Phone", width: 250 },
    { field: 'address', headerName: "Customer's Address", width: 250 },
    { field: 'pan_number', headerName: "Pancard Number", width: 250 },
    { field: 'adhar_number', headerName: "Adharcard Number", width: 250 },
    { field: 'account_type', headerName: "Account type", width: 250 },
    { field: 'account_number', headerName: "Account Number", width: 250 },
    {
      field: 'col10', headerName: "Actions", width: 150, renderCell: (params) => (
        <Button variant='contained' size='small' onClick={() => viewCustomer(params.row._id)}>View</Button>)
    },
  ];

  const getRowId = (row) => (row._id)
  return (
    <>
      <div className="container-fluid" id='staffDashboard'>
      <SideBar userData={employee} />
      <div className="container">
      <div className="row main-div">
          <div className="col-md-12 px-1">
            <div className="dashboard">
              <h2>Dashboard</h2>
              <div className="counter">
                <div className="d1 card">
                  <div className='icon-div'><Icon className='dash-icon'>groupicon</Icon></div>
                  <h2> 8,282</h2>
                  <span className="text-muted">Customers</span>
                </div>
                <div className="d1 card">
                  <div className='icon-div'><Icon className='dash-icon'>diversity_3</Icon></div>
                  <h2>200,521</h2>
                  <span className="text-muted">Banking Staff</span>
                </div>
                <div className="d1 card">
                  <div className='icon-div'><Icon className='dash-icon'>real_estate_agent</Icon></div>
                  <h2>215,542</h2>
                  <span className="text-muted">Loans</span>
                </div>
              </div>
            </div>
            <div className="row s1 mx-0">
              <div className="col-md-3 px-0  mx-1">
                <TextField id="outlined-basic" value={search} onChange={(e) => setSearch(e.target.value)} className='input-control mx-1' label="Search" variant="outlined" />
              </div>
              <div className="col-md-3 px-1 mx-1">
                <Button color='success' className='btn-search mx-1' size='md' variant="contained" onClick={onFilter}>Filter</Button>
                <Button color='primary' className='btn-search mx-1' size='md' variant="contained" onClick={handleCancle}>Cancle</Button>
              </div>
            </div>
            <div className='table-div'>
              <DataGrid rows={dataRows} getRowId={getRowId} columns={columns}
                pageSize={2}
                rowCount={5}
                rowsPerPageOptions={[2, 4, 6]} />
            </div>
          </div>
        </div>
      </div>
      
      </div>

    </>
  )
}
