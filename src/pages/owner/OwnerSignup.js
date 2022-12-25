import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
import {NavLink} from "react-router-dom";

export default function OwnerSignup() {
    let {register, handleSubmit, formState: {errors}, reset} = useForm();

    function onSubmit(data) {
        axios.post("http://localhost:4000/owner/join-owner", data).then((response) => {
            if (response.data === "error") {
                Swal.fire("Technical Error", "Please try again after sometime", "error");
                reset();
            } else if (response.data === "exists") {
                Swal.fire('Error', 'Email already exists!!', 'error');
                reset();
            } else {
                Swal.fire("Request Sent", "Your request has been sent successfully", "success");
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
                    backgroundImage: `url(${require('../../images/background.jpg')})`,
                }}></div>
            </div>
            <div className="container" id="login" style={{paddingTop: "2%"}}>
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="login" style={{borderRadius: "8%"}}>
                            <h1 className={"text-dark"}>Owner Signup</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <input {...register('owner_name', {
                                        required: "You must your name",
                                        pattern: {
                                            value: /[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/,
                                            message: "Enter valid name"
                                        }
                                    })} type="text"
                                           className="form-control" placeholder="Enter Full Name"/>
                                </div>
                                <ErrorMessage name="owner_name" errors={errors}
                                              render={({message}) => <p className="text-danger"
                                                                        style={{marginTop: "-10px"}}>{message}</p>}/>
                                <div className="form-group">
                                    <input {...register('contact_no', {
                                        required: "You must specify mobile number",
                                        pattern: {
                                            value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                                            message: "Enter valid mobile number"
                                        }
                                    })} type="text" className="form-control"
                                           placeholder="Enter Mobile No"/>
                                </div>
                                <ErrorMessage name={"contact_no"} errors={errors}
                                              render={({message}) => <p className={"text-danger"}
                                                                        style={{marginTop: "-10px"}}>{message}</p>}/>
                                <div className="form-group">
                                    <input {...register('contact_email', {
                                        required: "You must specify email",
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Enter valid email"
                                        }
                                    })}
                                           type="email" className="form-control"
                                           placeholder="Enter Email"/>
                                </div>
                                <ErrorMessage name={"contact_email"} errors={errors}
                                              render={({message}) => <p className={"text-danger"}
                                                                        style={{marginTop: "-10px"}}>{message}</p>}/>
                                <div className="form-group">
                                    <input {...register('pass', {
                                        required: "You must enter the password!",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "Please enter less than 13 characters"
                                        }
                                    })}
                                           type="password" className="form-control"
                                           placeholder="Password"/>
                                </div>
                                <ErrorMessage name={"pass"} errors={errors}
                                              render={({message}) => <p className={"text-danger"}
                                                                        style={{marginTop: "-10px"}}>{message}</p>}/>
                                <button type="submit" className=" mt-2 btn btn-lg btn-block btn-success">Join
                                </button>
                                <div className={"mt-2"}>
                                    <span>Already a user?<NavLink to={"/owner/owner-login"}>Signin</NavLink></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}