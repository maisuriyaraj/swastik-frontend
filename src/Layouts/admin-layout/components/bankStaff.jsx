import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Button, Icon, Pagination, TextField } from '@mui/material';
import SideBar from './sideBar';
import { postRequest } from '../../../utils/axios-service';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

export default function BankStaff(props) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    const names = [
      'Banking Staff',
      'Customers'
    ]
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedGroup, selectGroiup] = useState("");
    const [dataRows, setData] = useState([]);
    const [search, setSearch] = useState("");
    const token = JSON.parse(sessionStorage.getItem('AdminAuth'))
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
    }, [])
  
    useEffect(() => {
    }, [props])
  
    function loadData() {
      let AuthToken = JSON.parse(sessionStorage.getItem("AdminAuth"));
      postRequest("/api/getEmpList", {}, { 'Authorization': AuthToken }).then((resp) => {
        setData(resp.data);
        console.log(resp)
      }).catch(err => {
        console.log(err);
      })
    }
  
    const loginStaffButton = (id) => {
      return (
        <>
          <Button variant='contained' size='sm' onClick={() => loginStaff(id)}>View</Button>
        </>
      )
    }
  
  
  
  
    function getStyles(name, personName, theme) {
      return {
        fontWeight:
          personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
  
    const loginStaff = (staff) => {
        const payload = {
            email:staff.email,
            password:staff.password

        }
        postRequest('/api/staffloginbyadmin',payload,{'Authorization' : token}).then((resp) =>{
            console.log(resp)
             if(resp.data.status === true && resp.data.code === 201){
                 const newWindow = window.open("http://localhost:3000/staff/dashboard",'_blank');
                 sessionStorage.setItem("staffAuth",JSON.stringify(resp.data.token));
                 sessionStorage.setItem("employee",JSON.stringify(resp.data.emp));
                 if(newWindow){
                 }
             }
        })
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
      { field: 'first_name', headerName: "Employee's First Name", width: 250 },
      { field: 'last_name', headerName: "Employee's Last Name", width: 250 },
      { field: 'email', headerName: "Employee's Email", width: 250 },
      { field: 'dob', headerName: "Date Of Birth", width: 250 },
      { field: 'doj', headerName: "Date Of Joining", width: 250 },
      { field: 'position', headerName: "Position", width: 250 },
      {
        field: 'col10', headerName: "Actions", width: 150, renderCell: (params) => (
          <Button variant='contained' size='small' onClick={() => loginStaff(params.row)}>Login</Button>)
      },
    ];
  
    const getRowId = (row) => (row._id)
    return (
      <>
        <div className="container-fluid" id='adminDashboard'>
          <SideBar />
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
  
      </>
    )
  }