import { BrowserRouter as Router, Route, useNavigate, Navigate, Routes } from 'react-router-dom';
import { isLoggedIn } from '../../utils/helperFunctions';

export const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const {Component,path} = props;
    return (
        <Routes>
            <Route
                path={path}
                element={
                    isLoggedIn() ? (
                        <Component {...props} />
                    ) :
                        // navigate("/")
                        <Navigate to={"/"} />
                }
            />
            </Routes>
    );
};
