import React, { Component } from 'react';
import "./viewCustomersInfo.scss"
import { postRequest } from '../../../../utils/axios-service';
import BankProfile from './components/bankProfile';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccountDetails from './components/accountDetails';
import DocumentManagement from './components/documentManagement';
import DepositWithdraw from './components/deposit-withdraw';
// import SideBar from '../sidebar.jsx';
import CustomerTransections from './components/customerTransections';
import LoanDetails from './components/loanDetails';

class ViewCustomersInfo extends Component {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(window.location.search);

    this.state = {
      userDetails: {},
      token: JSON.parse(sessionStorage.getItem("AdminAuth")),
      id: searchParams.get('id'),
      customerDocs: {},
      userTransections: [],
      activeTab: 1,
      loanDetails: []
    };
  }

  loadCustomersDocuments() {
    postRequest("/api/getCustomerDocs", { id: this.state.id }, { Authorization: this.state.token.trim() }).then((resp) => {
      if (resp.data.status !== false && resp.data.code !== 200) {
        this.setState({ customerDocs: resp.data.data })
      } else {
        this.setState({ customerDocs: [] })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  loadCustomerData() {
    postRequest("/api/getCustomer", { id: this.state.id }, { "Authorization": this.state.token.trim() })
      .then((resp) => {
        this.setState({ userDetails: resp.data.data });
      })
      .catch((err) => console.log(err));
  }

  async loadDataTransection() {
    try {
      const payload = {
        customer_id: this.state.id
      };
      const response = await postRequest('/api/getTransectionsEmployee', payload, { 'Authorization': this.state.token.trim() });
      this.setState({ userTransections: response.data.data.transections || [] });
    } catch (error) {
      console.error('Error fetching transections:', error);
    }
  }

  async getAllLOanDetails() {
    try {
      const payload = {
        customer_id: this.state.id
      };
      const response = await postRequest('/api/getLoanDetailsAdmin', payload, { 'Authorization': this.state.token.trim() });
      if(response.data.status == true){
        console.log(response.data.data || []);
        this.setState({loanDetails:response.data.data || []})
      } 
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.loadCustomerData();
    this.loadCustomersDocuments();
    this.loadDataTransection();
    this.getAllLOanDetails();
  }

  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  render() {
    const { activeTab, customerDocs, userTransections } = this.state;
    return (
      <>
        <div className=' px-0' id='viewCustomerAdmin'>
          {/* <SideBar userData={this.state.userDetails} /> */}
          <div className="container-xl px-4 mt-4">
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
                Deposite / WithDraw
              </a>
              <a className={`nav-link ${activeTab == 5 ? 'active' : ''} ms-0`} onClick={() => this.setActiveTab(5)} style={{ cursor: 'pointer' }}>
                Loan Details
              </a>
              <a className={`nav-link ${activeTab == 6 ? 'active' : ''} ms-0`} onClick={() => this.setActiveTab(6)} style={{ cursor: 'pointer' }}>
                Transection Details
              </a>
            </nav>
            <hr className="mt-0 mb-4" />
            {activeTab == 1 && <BankProfile userDetails={this.state.userDetails} />}
            {activeTab == 2 && <AccountDetails userDetails={this.state.userDetails} />}
            {activeTab == 3 && <DocumentManagement customerDocs={customerDocs} email={this.state.userDetails.email} />}
            {activeTab == 4 && <DepositWithdraw userDetails={this.state.userDetails} />}
            {activeTab == 5 && <LoanDetails loanDetails={this.state.loanDetails} />}
            {activeTab == 6 && <CustomerTransections userDetails={this.state.userDetails} userTransections={userTransections} />}
          </div>

        </div>

      </>
    );
  }
}



export default ViewCustomersInfo;
