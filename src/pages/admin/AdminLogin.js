import {useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
import {useEffect} from "react";

export default function AdminLogin() {
    let navigate = useNavigate();
    let {register, handleSubmit, formState: {errors}} = useForm();

    function onSubmit(data) {
        axios.post("http://localhost:4000/check-details", data).then((response) => {
            if (response.data === "failure") {
                Swal.fire({icon: "warning", title: "Invalid email or password!!"});
            }
            if (response.data === "success login") {
                navigate("/admin");
            } else if (response.data === "inactive") {
                Swal.fire('User Inactive!!', 'Please contact the administrator.', 'error');
            } else if (response.data === "error") {
                Swal.fire('Technical error', 'Please try again after sometime!!', 'error');
            }
        })
    }

    useEffect(() => {
        axios.get("http://localhost:4000/check-admin-session").then((response) => {
            if (response.data === "success") {
                Swal.fire({icon: "warning", title: "You've already logged in!"});
                navigate("/admin");
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
                            <h1 className={"text-dark"}>Admin Login</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <input {...register('name_email', {required: "This field is required"})} type="text"
                                           className="form-control" placeholder="Enter email or username"/>
                                </div>
                                <ErrorMessage name="name_email" errors={errors}
                                              render={({message}) => <p className="text-danger">{message}</p>}/>
                                <div className="form-group">
                                    <input {...register('login_pass', {required: "You must enter the password!"})}
                                           type="password" className="form-control"
                                           placeholder="Password"/>
                                </div>
                                <ErrorMessage name={"login_pass"} errors={errors}
                                              render={({message}) => <p className={"text-danger"}>{message}</p>}/>
                                {/*<div className="form-check">*/}

                                {/*<label className="switch">*/}
                                {/*    <input type="checkbox"/>*/}
                                {/*    <span className="slider round"></span>*/}
                                {/*</label>*/}
                                {/*<label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>*/}


                                {/*</div>*/}
                                {/*<label className="forgot-password mt-2 text-center"><a href="#">Forgot*/}
                                {/*    Password?</a></label>*/}

                                <button type="submit" className="mt-4 btn btn-lg btn-block btn-success">Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}