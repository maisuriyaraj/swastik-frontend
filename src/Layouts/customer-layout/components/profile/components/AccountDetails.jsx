import React, { useEffect, useState } from 'react'

export default function AccountDetails(props) {
    const [user, setUSer] = useState({});
    useEffect(() => {
        console.log(props);
        setUSer(props.userDetails);
        console.log(user)
    }, [])
    return (
        <>
            <div className='container'>
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between">
                        <h2> Account Details</h2>
                    </div>
                    <div className="card-body p-4">
                        <div className="row mt-4 mb-2">
                            <div className="col-md-6">
                                <h5>Account Holder Name:</h5>
                            </div>
                            <div className="col-md-6">
                                <p>{user.first_name + " " + user.last_name}</p>
                            </div>
                        </div>
                        <div className="row mt-4 mb-2">
                            <div className="col-md-6">
                                <h5>Account Holder Registered Email:</h5>
                            </div>
                            <div className="col-md-6">
                                <p>{user.email}</p>
                            </div>
                        </div>
                        <div className="row mt-4 mb-2">
                            <div className="col-md-6">
                                <h5>Account Holder Registered Mobile:</h5>
                            </div>
                            <div className="col-md-6">
                                <p>{user.phone}</p>
                            </div>
                        </div>
                        <div className="row mt-4 mb-2">
                            <div className="col-md-6">
                                <h5>Account Number:</h5>
                            </div>
                            <div className="col-md-6">
                                <p>{user.account_number}</p>
                            </div>
                        </div>
                        <div className="row mt-4 mb-2">
                            <div className="col-md-6">
                                <h5>Account Type:</h5>
                            </div>
                            <div className="col-md-6">
                                <p>{user.account_type}</p>
                            </div>
                        </div>
                        <div className="row mt-4 mb-2">
                            <div className="col-md-6">
                                <h5>Account Holder Adhar Number:</h5>
                            </div>
                            <div className="col-md-6">
                                <p>{user.adhar_number}</p>
                            </div>
                        </div>
                        <div className="row mt-4 mb-2">
                            <div className="col-md-6">
                                <h5>Account Holder Pan Number:</h5>
                            </div>
                            <div className="col-md-6">
                                <p>{user.pan_number}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
