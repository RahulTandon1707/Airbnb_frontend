import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddAdmin() {
    let {register, handleSubmit, formState: {errors}, getValues, reset} = useForm();

    function onSubmit(data) {
        axios.post("http://localhost:4000/add-admin", data).then((response) => {
            console.log(response.data);
            if (response.data === "success") {
                reset();
                Swal.fire(
                    'Details Added!',
                    'New admin/co-admin has been added successfully',
                    'success'
                )

            } else if (response.data === "exists") {
                Swal.fire(
                    'Error',
                    'Username or email already exists!!',
                    'error'
                )
            } else {
                Swal.fire(
                    'Error',
                    'Details cannot be added. Please try again after sometime!',
                    'error'
                )
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <section className="contact py-5 bg-img">
                <div>
                    <div className="text-center mb-3">
                        <h3 className={"style-font"}>ADD ADMINS</h3>
                    </div>
                    <div className="col-lg-6 col-md-6 offset-lg-3 offset-md-3 contact-left-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group contact-forms">
                                <input {...register('uname', {
                                    required: "You must specify a username",
                                    minLength: {
                                        value: 8,
                                        message: "You must enter atleast 8 characters"
                                    },
                                    maxLength: {
                                        value: 19,
                                        message: "Please enter less than 20 characters"
                                    },
                                    pattern: {
                                        value: /^[A-Za-z][A-Za-z0-9_]{7,29}$/,
                                        message: "Enter valid username"
                                    }
                                })} type="text"
                                       className="form-control" placeholder="Enter Username"/>
                            </div>
                            <ErrorMessage name="uname" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>
                            <div className="form-group contact-forms">
                                <input {...register('password', {
                                    required: "You must specify a password",
                                    minLength: {
                                        value: 8,
                                        message: "Password must have at least 8 characters"
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Please enter less than 13 characters"
                                    }
                                })} type="password"
                                       className="form-control" placeholder="Enter Password"/>
                            </div>
                            <ErrorMessage name="password" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>
                            <div className="form-group contact-forms">
                                <input
                                    type="password" {...register('confirmpassword', {
                                    required: "You must confirm the password",
                                    validate: (value) => {
                                        const {password} = getValues();
                                        return password === value || "Passwords should match!";
                                    }
                                })}
                                    className="form-control" placeholder="Confirm password"/>
                            </div>
                            <ErrorMessage name="confirmpassword" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>

                            <div className="form-group contact-forms">
                                <input {...register('newmail', {
                                    required: "You must specify email",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Enter valid email"
                                    }
                                })} type="text"
                                       className="form-control" placeholder="Enter Email"/>
                            </div>
                            <ErrorMessage name="newmail" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>
                            <div className="form-group contact-forms">
                                <input {...register('fullname', {required: "You must specify name"})} type="text"
                                       className="form-control" placeholder="Enter fullname"/>
                            </div>
                            <ErrorMessage name="fullname" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>
                            <div className="form-group contact-forms">
                                <input {...register('phonenumber', {
                                    required: "You must specify mobile number",
                                    pattern: {
                                        value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                                        message: "Enter valid mobile number"
                                    }
                                })}
                                       type="text"
                                       className="form-control" placeholder="Enter mobile no"/>
                            </div>
                            <ErrorMessage name="phonenumber" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>
                            <div className="form-group contact-forms">
                                <select {...register('type', {required: "You must specify admin type"})}
                                        className={"form-control"} name="type">
                                    <option className={"form-control"} value="select-type" disabled>-Select type-
                                    </option>
                                    <option className={"form-control"} value="admin">Admin</option>
                                    <option className={"form-control"} value="co-admin">Co-Admin</option>
                                </select>
                            </div>
                            <ErrorMessage name="type" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>
                            <button className="btn btn-block sent-butnn">Add Details</button>
                            <button className="btn ht-btn btn-danger btn-block danger-butnn"
                                    onClick={() => reset()}>Reset Details
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}