import { BrowserRouter as Router, Route, useNavigate, Navigate, Routes } from 'react-router-dom';
import { isCustomerLoggedIn } from '../../utils/helperFunctions';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const {Component,path,data} = props;
    const showErrorToast = () =>{
        toast.error("You 're not Authorized")
    }

    useEffect(()=>{
        if(!isCustomerLoggedIn()){showErrorToast();}
    },[props])
    return (
        <Routes>
            <Route
                path={path}
                element={
                    isCustomerLoggedIn() ? (
                        <Component {...props} />
                    ) :
                        <Navigate to={"/"} />
                }
            />
            </Routes>
    );
};
