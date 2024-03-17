import React, { useEffect, useState } from 'react'
import SideBar from './sidebar';
import logo from "../../../assets/swastik_logo.png"
import { postRequest } from '../../../utils/axios-service';
import './customerLayout.scss'
import { Button } from '@mui/material';

export default function FixedDeposit() {
    // const [userID, setUSer] = useState(JSON.parse(sessionStorage.getItem('user')));
    // const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')))
    // const [userDetails, setData] = useState({});
    // useEffect(() => {
    //     loadData();
    // }, []);
    // const loadData = () => {
    //     const payload = {
    //         id: userID
    //     };
    //     try {
    //         postRequest('/api/getCustomerDetails', payload, { 'Authorization': token }).then((resp) => {
    //             setData(resp.data.data)
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>
            <div className='container-fluid px-0' id='fixedDeposit' style={{ marginTop: '100px' }}>
                {/* <SideBar userData={userDetails} /> */}
                <div className="container px-0">
                    <div className="logo-header text-center">
                        <img src={logo} alt="" width={100} />
                        <h2>
                            <b>Secure Your Savings with Fixed Deposits</b>
                        </h2>
                        <p>"Bankers are the custodians of economic resilience, safeguarding fortunes and nurturing dreams. In their hands, wealth finds purpose, and aspirations take flight. With prudence and integrity, they chart the course to financial empowerment and prosperity."</p>
                    </div>
                    <div className='w-100 m-3'>
                        <h2>Introduction : </h2>
                        <p className=''>
                            At Swastik Finance, we understand the importance of saving for the future. Our Fixed Deposit accounts offer a secure and reliable way to grow your savings while earning competitive interest rates. Whether you're saving for a specific goal or looking to maximize your returns, our Fixed Deposits provide a range of flexible options to suit your needs.
                        </p>
                    </div>
                    <div class="row">
                        <div class="col-md-12 m-3">
                            <h2 className=''>Key Features:</h2>
                            <ul class="list-group">
                                <li class="list-group-item mt-2">Competitive Interest Rates: Benefit from attractive interest rates on your savings, ensuring that your money works harder for you.</li>
                                <li class="list-group-item mt-2">Flexible Tenure Options: Choose from a variety of tenure options ranging from as short as 7 days to as long as 10 years, allowing you to tailor your investment horizon to your financial goals.</li>
                                <li class="list-group-item mt-2">Guaranteed Returns: Enjoy peace of mind knowing that your principal amount is secure, with guaranteed returns at the end of the deposit tenure.</li>
                                <li class="list-group-item mt-2">Online Account Management: Access your Fixed Deposit account conveniently through our secure online banking platform, where you can view account details, track interest earned, and manage renewals with ease.</li>
                                <li class="list-group-item mt-2">Automatic Renewal Options: Opt for automatic renewal of your Fixed Deposit upon maturity, ensuring that your savings continue to grow seamlessly.</li>
                            </ul>
                        </div>
                        <div class="col-md-12 m-3">
                            <h2>Why Choose Your Bank Name for Fixed Deposits?</h2>
                            <ul class="list-group">
                                <li class="list-group-item mt-2">Trust and Reliability: With decades of experience and a strong reputation in the industry, we are committed to safeguarding your savings and providing reliable financial solutions.</li>
                                <li class="list-group-item mt-2">Personalized Service: Our dedicated team of professionals is here to assist you at every step of the way, offering personalized guidance and support to help you make informed financial decisions.</li>
                                <li class="list-group-item mt-2">Convenience and Accessibility: Experience seamless banking with our user-friendly online and mobile banking platforms, allowing you to manage your Fixed Deposit account anytime, anywhere.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="text-center mt-4">
                        <Button variant='contained' size='large' className='p-4 fs-5' >Get Started Today</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
