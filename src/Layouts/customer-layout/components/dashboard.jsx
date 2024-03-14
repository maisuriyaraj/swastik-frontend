import React, { Component } from 'react';
import SideBar from './sidebar';
import { postRequest } from '../../../utils/axios-service';
import { Button, Card, CardActions, CardContent, Icon, Table, TextField, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Loader from '../../../utils/react-loader';
import TableRow from '@mui/material/TableRow';
import './customerLayout.scss'
import Paper from '@mui/material/Paper';
import { BarChart } from '../../../components/chartComponent';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      userDetails: {},
      token: "",
      loading: false,
      walletResponse: {},
      userTransections:[],
      AddWalletOpen: false,
      apiResponse: {},
      walletDetails: {},
      email: "",
      amount: 0,
      mpin: ""
    };
  }

  setLoader() {
    this.setState({ loader: true });
    setTimeout(() => {
      this.setState({ loader: false });
    }, 3000);
  }

  componentDidMount() {
    const userID = JSON.parse(sessionStorage.getItem("user")) || "";
    const token = JSON.parse(sessionStorage.getItem("userToken")) || "";
    this.setState({ userID: userID, token: token });
    this.loadData(userID, token);
    this.loadWalletDetails(userID, token);
    this.loadDataTransection(userID, token);
    this.setLoader();
  }
  componentDidUpdate(prevProps) {
  }

  loadData(userID, token) {
    const payload = {
      id: userID
    };
    try {
      postRequest('/api/getCustomerDetails', payload, { 'Authorization': token }).then((resp) => {
        this.setState({ userDetails: resp.data.data });
      }).catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }

  loadDataTransection = async (userID, token) => {
    try {
        const payload = {
            customer_id: userID
        };
        const response = await postRequest('/api/getTransectionsCustomer', payload, { 'Authorization': token.trim() });
        if(response.data.status === true){
            this.setState({userTransections : response.data.data.transections || []})
        }else{
          this.setState({userTransections : []})

        }
    } catch (error) {
        console.error('Error fetching transections:', error);
    }
}

  loadWalletDetails(userID, token) {
    const payload = {
      customer_id: userID
    };
    try {
      postRequest('/api/getWalletDetails', payload, { 'Authorization': token }).then((resp) => {
        if (resp.data.status === true) {
          this.setState({ walletDetails: resp.data.data })
        } else if (resp.data.status === false) {
          this.setState({ walletDetails: {} })
        }
      }).catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleOpenModal(val) {
    this.setState({ AddWalletOpen: val });
  }

  handleAddWallet(e) {
    e.preventDefault();
    const userID = JSON.parse(sessionStorage.getItem("user")) || "";
    const token = JSON.parse(sessionStorage.getItem("userToken")) || "";
    if (this.state.mpin != "" && this.state.balance != 0) {
      const body = {
        email: this.state.userDetails.email,
        walletBalance: this.state.amount,
        id: userID,
        mpin: this.state.mpin
      }
      postRequest('/api/add-wallet', body, { 'Authorization': token }).then((resp) => {
        if (resp.data.status === true && resp.data.code == 201) {
          this.loadData(userID, token);
          this.loadData(userID, token);
          this.loadWalletDetails(userID, token);
          this.setState({ AddWalletOpen: false, mpin: "", amount: "" });
          toast.success(resp.data.message,{position:'bottom-right'});
        } else {
          toast.error(resp.data.message,{position:'bottom-right'});
        }
      }).catch(err => {
        toast.error(err);
      })
    } else {
      toast.error("Alll Fields are Required !!");
    }
  }




  render() {
    const { userDetails, loader, AddWalletOpen, email, mpin, amount } = this.state;
    return (
      <>
        <div className="container-fluid px-0" id='customerDashboard'>
          <SideBar userData={userDetails} />
          {!loader && <>
            <div className='postheader w-100'>
              <div className='container postheaderDiv'>
                <div>
                  <span className='postheader-item'>My Dashboard</span>
                </div>
                <div className='right-div'>
                  <span className='postheader-item'>Notification(0)</span>
                  <span className='postheader-item'>Pay&Transfer</span>
                  <span className='postheader-item'>Buy Prepaid</span>
                </div>
              </div>
            </div>
            <div className='container main-div'>
              <div className="row">
                <div className="col-md-6 mt-2">
                  <Card sx={{ minWidth: '100%',height:'413px',overflow:'hidden' }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Available balance
                      </Typography>
                      <Typography sx={{ fontSize: 25 }} color="black" gutterBottom>
                        Rs.{userDetails.current_balance || "0"}
                      </Typography>
                      <TableContainer component={Paper} sx={{height:'265px',overflow:'hidden'}}>
                        <Table sx={{ minWidth: '100%' }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Date</TableCell>
                              <TableCell align="right">Transection</TableCell>
                              <TableCell align="right">Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.userTransections.map((row, index) => (
                              <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.date_of_transection}
                                </TableCell>
                                <TableCell align="right">{row.deposit_amount == 0 ? `-${row.withdraw_amount}` : `+${row.deposit_amount}`   }</TableCell>
                                <TableCell align="right" className={row.deposit_amount == 0 ? `text-danger` : `text-success`  }>{row.deposit_amount == 0 ? `Debited` : `Credited`   }</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                    <CardActions>
                      <Link to={'/user/e-passbook'}><Button size="small" >More...</Button></Link>
                    </CardActions>
                  </Card>
                </div>
                <div className="col-md-6 mt-2">

                  <Card sx={{ minWidth: '100%' }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Your Balance Sheet
                      </Typography>
                      <Typography sx={{ fontSize: 25 }} color="black" gutterBottom>
                        Rs.{userDetails.current_balance}
                      </Typography>
                      {/* <LineChart /> */}
                      <BarChart current_balance={userDetails.current_balance} walletbalance={this.state.walletDetails.walletBalance} fixedeposit={0} />
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-12">
                  <h1>Your Activities</h1>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <Card
                        className="my-2"
                        style={{
                          width: '18rem'
                        }}
                      >
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Fixed Deposit
                          </Typography>
                          <Typography variant="h5" component="div">
                            Rs.0.00
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Fixed Amount
                          </Typography>
                          <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">More..</Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div className="col-md-6">
                      <Card
                        className="my-2"
                        style={{
                          width: '18rem'
                        }}
                      >
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            My walllet
                          </Typography>
                          <Typography variant="h5" component="div">
                            Rs.{this.state.walletDetails.walletBalance || '0.00'}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Your Wallet balance
                          </Typography>
                          <Typography variant="body2">
                            <br />
                            {'"a benevolent smile"'}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" onClick={() => this.handleOpenModal(true)}>Add Funds</Button>
                          {this.state.walletDetails.walletBalance  &&  <Button size="small">Pay</Button>}
                        </CardActions>
                      </Card>
                    </div>
                    <div className="col-md-6">
                      <Card
                        className="my-2"
                        style={{
                          width: '18rem'
                        }}
                      >
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            <Icon sx={{fontSize:'50px'}}>person_icon</Icon>
                          </Typography>
                          <Typography variant="h5" component="div">
                            Pay Contacts
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            
                          </Typography>
                          <Typography variant="body2">
                            <br />
                            {'"a benevolent smile"'}
                          </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to={'/user/chat'}><Button >View Contacts</Button></Link>
                        </CardActions>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
              <Modal isOpen={AddWalletOpen} size='md' centered toggle={() => this.handleOpenModal(false)}>
                <ModalHeader toggle={() => this.handleOpenModal(false)}>Add Funds</ModalHeader>
                <ModalBody>
                  <form onSubmit={(e) => this.handleAddWallet(e)}>
                    <div className="row">
                      <div className="col-md-12 mt-2 mb-3">
                        {/* <label>Registered Email : </label> */}
                        {/* <Field type="email" name="email" id="email" className="form-control" /> */}
                        <TextField id="email" value={userDetails.email} disabled label="Registered Email" fullWidth variant="filled" />
                      </div>
                      <div className="col-md-12 mt-2 mb-3">
                        <TextField id="balance" value={amount} onChange={(e) => this.setState({ amount: e.target.value })} type='number' label="Amount" fullWidth variant="filled" />
                      </div>
                      <div className="col-md-12 mt-2 mb-3">
                        <TextField id="mpin" type='password' value={mpin} onChange={(e) => this.setState({ mpin: e.target.value })} label="MPIN" fullWidth variant="filled" />
                      </div>
                    </div>
                    <Button variant='contained' type='submit' className='mt-3' color='primary' size='large'>Add Wallet</Button>
                  </form>
                </ModalBody>
              </Modal>
            </div>
          </>}
          {loader && <Loader loading={loader} className="loader" />}
        </div>
      </>
    );
  }
}


export default Dashboard;
