import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function OwnerProtectedRoute({Component}) {
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:4000/owner/check-owner-session").then((response) => {
            if (response.data === "failed") {
                navigate("/owner/owner-login");
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    return (
        <Component/>
    )
}