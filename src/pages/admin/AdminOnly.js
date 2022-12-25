import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AdminContext} from "./AdminProtectedRoute";


export function AdminOnly({Component}) {
    const adminSession = useContext(AdminContext);
    let navigate = useNavigate();
    if (adminSession.type === 'co-admin') {
        navigate('/admin');
    }

    return (
        <>
            <Component/>
        </>
    )
}