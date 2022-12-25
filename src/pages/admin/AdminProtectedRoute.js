import {useEffect, useState, createContext} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export let AdminContext = createContext(null);

export function AdminProtectedRoute({Component}) {
    let navigate = useNavigate();
    let [session, setSession] = useState({});
    useEffect(() => {
        axios.get("http://localhost:4000/check-admin-session").then((response) => {
            if (response.data === "failed") {
                navigate("/admin/admin-login");
            } else {
                setSession(() => response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    return (
        <AdminContext.Provider value={session}>
            <Component/>
        </AdminContext.Provider>

    )
}