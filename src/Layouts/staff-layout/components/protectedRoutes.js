import { BrowserRouter as Router, Route, useNavigate, Navigate, Routes } from 'react-router-dom';
import { isStaffLoggedIn } from '../../../utils/helperFunctions';

export const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const {Component,path} = props;
    return (
        <Routes>
            <Route
                path={path}
                element={
                    isStaffLoggedIn() ? (
                        <Component {...props} />
                    ) :
                        // navigate("/")
                        <Navigate to={"/"} />
                }
            />
            </Routes>
    );
};
