import {NavLink, useNavigate} from "react-router-dom";
import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import {useEffect} from "react";
import {FaArrowAltCircleLeft} from "react-icons/fa";


export default function UserLogin() {
    let {register, handleSubmit, formState: {errors}, reset} = useForm();
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/user/check-user-session").then((response) => {
            if (response.data === "success") {
                Swal.fire({icon: "warning", title: "You've already logged in!"});
                navigate("/");
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [navigate]);

    function onSubmit(data) {
        axios.post("http://localhost:4000/user/check-user-details", data).then((response) => {
            if (response.data === "notexist") {
                Swal.fire("Invalid credentials!", "Invalid username or password!", "warning");
                reset();
            } else if (response.data === "error") {
                Swal.fire("OOPS!!", "Technical Error.Please try again after sometime", "error");
                reset();
            } else {
                navigate("/");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <div id="login-bg" className="container-fluid">
                <div className="bg-imgs" style={{
                    backgroundImage: `url(${require('../../images/user/login-background.jpg')})`,
                }}></div>
            </div>
            <section className="ftco-section text-user-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 col-lg-5 pt-2 pb-2 bg-black b-radius">
                            <div className="login-wrap">
                                <span><FaArrowAltCircleLeft onClick={() => {
                                    navigate("/")
                                }} className={"mt-2 cursor-pointer"} size={"2.2rem"}/></span>
                                <h3 style={{marginTop: "-40px"}} className="text-center mb-4 text-user-white">Login To
                                    Your Account</h3>
                                <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                                    <div className="user-form-group mb-3">
                                        <label className="label" htmlFor="user_email">Email Address</label>
                                        <input {...register('user_email', {
                                            required: "You must specify email",
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Enter valid email"
                                            }
                                        })} type="email" className="user-form-control"
                                               placeholder="johndoe@gmail.com"/>
                                        <span className="icon fa fa-paper-plane-o"></span>
                                        <ErrorMessage name={"user_email"} errors={errors} render={({message}) => <p
                                            className={"text-danger"}>{message}</p>}/>
                                    </div>
                                    <div className="user-form-group mb-3">
                                        <label className="label" htmlFor="password">Password</label>
                                        <input {...register('password', {
                                            required: "You must enter the password!",
                                            minLength: {
                                                value: 8,
                                                message: "Password must have at least 8 characters"
                                            },
                                            maxLength: {
                                                value: 12,
                                                message: "Please enter less than 13 characters"
                                            }
                                        })} type="password" className="user-form-control"
                                               placeholder="Password"/>
                                        <span className="icon fa fa-lock"></span>
                                        <ErrorMessage name={"password"} errors={errors} render={({message}) => <p
                                            className={"text-danger"}>{message}</p>}/>
                                    </div>
                                    <div className="user-form-group mt-4 pt-2">
                                        <button type="submit"
                                                className="user-btn-form-control btn btn-primary submit px-3">Sign In
                                        </button>
                                    </div>
                                </form>
                                <div className={"text-center"}>
                                    <p>New to us? <NavLink to={"/user-signup"}>Sign Up</NavLink></p>
                                    {/*<p>Back to Home Page<NavLink to={"/"}>Click here</NavLink></p>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}