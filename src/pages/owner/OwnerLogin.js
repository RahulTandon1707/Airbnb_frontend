import {useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
import {useEffect} from "react";

export default function OwnerLogin() {
    let navigate = useNavigate();
    let {register, handleSubmit, formState: {errors}} = useForm();

    function onSubmit(data) {
        axios.post("http://localhost:4000/owner/check-owner-details", data).then((response) => {
            if (response.data === "failure") {
                Swal.fire({icon: "warning", title: "Invalid email or password!!"});
            } else if (response.data === "pending") {
                Swal.fire('Request Pending!!', 'Your account has not been activated yet!', 'info');
            } else if (response.data === "success login") {
                navigate("/owner");
            } else if (response.data === "blocked") {
                Swal.fire('Account Blocked!!', 'Please contact the administrator.', 'error');
            } else if (response.data === "error") {
                Swal.fire('Technical error', 'Please try again after sometime!!', 'error');
            }
        })
    }

    useEffect(() => {
        axios.get("http://localhost:4000/owner/check-owner-session").then((response) => {
            if (response.data === "success") {
                Swal.fire({icon: "warning", title: "You've already logged in!"});
                navigate("/owner");
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <div id="login-bg" className="container-fluid">
                <div className="bg-imgs" style={{
                    backgroundImage: `url(${require('../../images/background.jpg')})`,
                }}></div>
            </div>
            <div className="container" id="login">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="login">
                            <h1 className={"text-dark"}>Owner Login</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <input {...register('email', {required: "This field is required"})} type="text"
                                           className="form-control" placeholder="Enter your email"/>
                                </div>
                                <ErrorMessage name="email" errors={errors}
                                              render={({message}) => <p className="text-danger">{message}</p>}/>
                                <div className="form-group">
                                    <input {...register('pass', {required: "You must enter the password!"})}
                                           type="password" className="form-control"
                                           placeholder="Password"/>
                                </div>
                                <ErrorMessage name={"pass"} errors={errors}
                                              render={({message}) => <p className={"text-danger"}>{message}</p>}/>
                                <button type="submit" className=" mt-4 btn btn-lg btn-block btn-success">Sign in
                                </button>
                                <div className={"mt-2"}>
                                    <span>New to us?<NavLink to={"/owner/owner-signup"}>Signup Now</NavLink></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}