import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {FaArrowAltCircleLeft} from "react-icons/fa";

export default function UserSignup() {
    let {register, handleSubmit, formState: {errors}, reset, getValues} = useForm();
    let navigate = useNavigate();

    function onSubmit(data) {
        axios.post("http://localhost:4000/user/user-signup", data).then((response) => {
            if (response.data === "success") {
                Swal.fire("Signed Up Successfully!", "Your account has been created successfully", "success");
                navigate("/");
                reset();
            } else {
                Swal.fire("OOPS!!", "Technical Error.Please try again after sometime", "error");
                reset();
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
            <section className="pt-5 text-user-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10 pt-2 pb-2 bg-black">
                            <div className="login-wrap">
                                <div className={"row"}>
                                    <FaArrowAltCircleLeft onClick={() => {
                                        navigate("/")
                                    }} style={{marginTop: "10px"}} size={"2.5rem"}/>
                                    <p onClick={() => {
                                        navigate("/")
                                    }} className={"mt-3 text-light cursor-pointer"}>Back To Home Page</p>
                                </div>
                                <h3 style={{marginTop: "-40px"}} className="text-center mb-4 text-user-white">Create
                                    Your Account</h3>
                                <form onSubmit={handleSubmit(onSubmit)} className={"row"}>
                                    <div className={"col-md-6 col-lg-6"}>
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
                                    </div>
                                    <div className={"col-md-6 col-lg-6"}>
                                        <div className="user-form-group mb-3">
                                            <label className="label" htmlFor="user_name">Full Name</label>
                                            <input {...register("user_name", {
                                                required: "You must specify your name!",
                                                pattern: {
                                                    value: /[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/,
                                                    message: "Enter valid name"
                                                }
                                            })} type="text" className="user-form-control pe-5" placeholder="John Doe"/>
                                            <span className="icon fa fa-user-o"></span>
                                            <ErrorMessage name={"user_name"} errors={errors} render={({message}) => <p
                                                className={"text-danger"}>{message}</p>}/>
                                        </div>
                                    </div>
                                    <div className={"col-md-6 col-lg-6"}>
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
                                    </div>
                                    <div className={"col-md-6 col-lg-6"}>
                                        <div className="user-form-group mb-3">
                                            <label className="label" htmlFor="confirmpassword">Confirm Password</label>
                                            <input {...register('confirmpassword', {
                                                required: "You must confirm the password",
                                                validate: (value) => {
                                                    const {password} = getValues();
                                                    return password === value || "Both Passwords should match!";
                                                }
                                            })} type="password" className="user-form-control"
                                                   placeholder="Password"/>
                                            <span className="icon fa fa-lock"></span>
                                            <ErrorMessage name={"confirmpassword"} errors={errors}
                                                          render={({message}) => <p
                                                              className={"text-danger"}>{message}</p>}/>
                                        </div>
                                    </div>
                                    <div className={"col-md-6 col-lg-6"}>
                                        <div className="user-form-group mb-3">
                                            <label className="label" htmlFor="mobile">Mobile</label>
                                            <input {...register('user_mobile', {
                                                required: "You must specify mobile number",
                                                pattern: {
                                                    value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                                                    message: "Enter valid mobile number"
                                                }
                                            })} type="text" className="user-form-control"
                                                   placeholder="1234567890"/>
                                            <span className="icon fa fa-paper-plane-o"></span>
                                            <ErrorMessage name={"user_mobile"} errors={errors} render={({message}) => <p
                                                className={"text-danger"}>{message}</p>}/>
                                        </div>
                                    </div>
                                    <div className={"col-md-6 col-lg-6"}>
                                        <div className="user-form-group mb-3">
                                            <label className="label" htmlFor="user_Address">User Address</label>
                                            <input {...register('user_address', {
                                                required: "You must specify property address",
                                                maxLength: {
                                                    value: 150,
                                                    message: "Please enter less than 150 characters"
                                                }
                                            })} type="text" className="user-form-control"
                                                   placeholder="123,abc,asr"/>
                                            <span className="icon fa fa-paper-plane-o"></span>
                                            <ErrorMessage name={"user_address"} errors={errors}
                                                          render={({message}) => <p
                                                              className={"text-danger"}>{message}</p>}/>
                                        </div>
                                    </div>
                                    <div className={"col-lg-6 col-md-6 offset-md-3 offset-lg-3"}>
                                        <div className="user-form-group mt-4 pt-2">
                                            <button type="submit"
                                                    className="user-btn-form-control btn btn-success submit px-3">Sign
                                                Up
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className={"text-center"}>
                                    <p>I'm already a member! <NavLink to={"/user-login"}>Sign In</NavLink></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}