import React, { Component } from 'react';
import { connect } from 'react-redux';
import BankProfile from './components/BankProfile';
import AccountDetails from './components/AccountDetails';
import DocumentsManagement from './components/documents';
import './components/profile.scss'
import { loadData } from '../../../../redux/slices/customerActions';
import { postRequest } from '../../../../utils/axios-service';
import SideBar from '../sidebar';
import { Button } from '@mui/material';
class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(window.location.search);

    this.state = {
      userDetails: {},
      token: JSON.parse(sessionStorage.getItem("userToken")),
      userID: JSON.parse(sessionStorage.getItem("user")),
      customerDocs: {},
      activeTab: 1,
    };
  }


  componentDidMount() {
    this.props.loadData({ userID: this.state.userID, token: this.state.token });
  }

  componentDidUpdate(preValue) {
    if (preValue.userDetails !== this.props.userDetails) {
      this.setState({ userDetails: this.props.userDetails.data }, () => {
        console.log(this.state.userDetails)
      })
    }
  }

  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  handleBack(){
      window.history.back()
  }

  render() {
    const { activeTab, customerDocs, userDetails } = this.state;
    return (
      <>
        <div className=' px-0' id='customerProfile'>
          <SideBar userData={userDetails} />
          <div className="container-xl px-4 mt-4">
            <div className='row'>
              <div className="col-md-9">
                <nav className="nav nav-borders">
                  <a className={`nav-link ${activeTab == 1 ? 'active' : ''} ms-0`} onClick={() => this.setActiveTab(1)} style={{ cursor: 'pointer' }}>
                    BankProfile
                  </a>
                  <a className={`nav-link ${activeTab == 2 ? 'active' : ''} ms-0`} onClick={() => this.setActiveTab(2)} style={{ cursor: 'pointer' }}>
                    Account Details
                  </a>
                  <a className={`nav-link ${activeTab == 3 ? 'active' : ''} ms-0`} onClick={() => this.setActiveTab(3)} style={{ cursor: 'pointer' }}>
                    Documents
                  </a>
                  <a className={`nav-link ${activeTab == 4 ? 'active' : ''} ms-0`} onClick={() => this.setActiveTab(4)} style={{ cursor: 'pointer' }}>
                    Loan Details
                  </a>
                  <a className={`nav-link ${activeTab == 5 ? 'active' : ''} ms-0`} onClick={() => this.setActiveTab(5)} style={{ cursor: 'pointer' }}>
                    Transection Details
                  </a>
                </nav>
              </div>
              <div className='col-md-3 text-end'>
                  <Button variant='contained' color='secondary' size='large' onClick={this.handleBack} >Back</Button>
              </div>
            </div>
            <hr className="mt-0 mb-4" />
            {activeTab == 1 && <BankProfile userDetails={this.state.userDetails} />}
            {activeTab == 2 && <AccountDetails userDetails={this.state.userDetails} />}
            {activeTab == 3 && <DocumentsManagement />}
          </div>

        </div>

      </>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userDetails: state.customer,
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    // getAllData: () => dispatch(getAllData()),
    loadData: (userID, token) => dispatch(loadData({ userID, token })),
    // AddWallet:(payload) => dispatch(AddWallet(payload))

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);
