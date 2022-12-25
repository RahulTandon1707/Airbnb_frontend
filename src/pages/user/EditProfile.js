import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router-dom";

export default function EditProfile() {
    let {register, handleSubmit, formState: {errors}, setValue, reset} = useForm();
    let navigate=useNavigate();
    let [user_name, setusername] = useState("");
    let [user_email, setuseremail] = useState("");
    let {user_id} = useParams();
    useEffect(() => {
        reset();
        axios.get(`http://localhost:4000/user/get-user-profile-data-by-id${user_id}`).then((response) => {
            if (response.data === "error") {
                Swal.fire('Error!!', 'Some error occured in fetching details!!', 'error');
            } else {
                response.data.map((value, index) => {
                    let {user_address, user_email, user_mobile, user_name} = value;
                    setValue("user_email", user_email);
                    setuseremail(user_email);
                    setValue("user_name", user_name);
                    setusername(user_name);
                    setValue("user_address", user_address);
                    setValue("user_mobile", user_mobile);
                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function onSubmit(data) {
        axios.post(`http://localhost:4000/user/update-user-profile${user_id}`, data).then((response) => {
            if (response.data === "error") {
                Swal.fire('Error', 'Some technical error occured!!', 'error');
                navigate("/user-profile");
            } else if (response.data === "success") {
                Swal.fire('Updated', 'Your profile has been updated successfully!!', 'success');
                navigate("/user-profile");
            } else {
                Swal.fire('Error', 'Some error occured!!', 'error');
                navigate("/user-profile");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <section className="banner_inner" id="home">
                <div className="banner_inner_overlay">
                </div>
            </section>
            <div className="container bg-blue emp-profile" id={"user-profile"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <div className="profile-head">
                                <h5 className={"mb-1"}>{user_name}</h5>
                                <h6>{user_email}</h6>
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a className="nav-link custom-active bg-blue mt-3">About</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <div className={"row mb-2"}>
                                        <div className="col-md-6">
                                            <label>User Name</label>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="user-profile-form-group mb-3">
                                                <input {...register("user_name", {
                                                    required: "You must specify your name!",
                                                    pattern: {
                                                        value: /[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/,
                                                        message: "Enter valid name"
                                                    }
                                                })} type="text" className="user-profile-form-control"/>
                                                <span className="icon fa fa-user-o"></span>
                                                <ErrorMessage name={"user_name"} errors={errors}
                                                              render={({message}) => <p
                                                                  className={"text-danger"}>{message}</p>}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row mb-2"}>
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="user-profile-form-group mb-3">
                                                <input {...register('user_email')} type="email" disabled
                                                       className="user-profile-form-control"/>
                                                <span className="icon fa fa-paper-plane-o"></span>
                                                <ErrorMessage name={"user_email"} errors={errors}
                                                              render={({message}) => <p
                                                                  className={"text-danger"}>{message}</p>}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row mb-2"}>
                                        <div className="col-md-6">
                                            <label>Mobile</label>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="user-profile-form-group mb-3">
                                                <input {...register('user_mobile', {
                                                    required: "You must specify mobile number",
                                                    pattern: {
                                                        value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                                                        message: "Enter valid mobile number"
                                                    }
                                                })} type="text" className="user-profile-form-control"/>
                                                <span className="icon fa fa-phone"></span>
                                                <ErrorMessage name={"user_mobile"} errors={errors}
                                                              render={({message}) => <p
                                                                  className={"text-danger"}>{message}</p>}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row mb-2"}>
                                        <div className="col-md-6">
                                            <label>Address</label>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="user-profile-form-group">
                                                <input {...register('user_address', {
                                                    required: "You must specify property address",
                                                    maxLength: {
                                                        value: 150,
                                                        message: "Please enter less than 150 characters"
                                                    }
                                                })} type="text"
                                                       className="user-profile-form-control"/>
                                                <span className="icon fa fa-address-book"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"col-lg-6 col-md-6 offset-md-3 offset-lg-3"}>
                                        <div className="user-form-group mt-4 pt-2">
                                            <button type="submit"
                                                    className="user-btn-form-control btn btn-primary submit px-3">Update
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}