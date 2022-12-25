import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export default function UserChangePassword() {
    let {register, handleSubmit, formState: {errors}, getValues, reset} = useForm();
    let navigate = useNavigate();

    function onSubmit(data) {
        axios.post("http://localhost:4000/user/change-user-password", data).then((response) => {
            if (response.data === "wrongpassword") {
                Swal.fire({icon: "error", title: "Invalid old Password"});
            } else if (response.data === "failure") {
                Swal.fire({icon: "error", title: "Some error occured at backend!!"});
                reset();
            } else if (response.data === "success") {
                Swal.fire({icon: "success", title: "Password Changed Successfully"});
                navigate("/");
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
                                <h2 className={"mb-5 text-center"} style={{color: "#5f666c"}}>Change Password</h2>
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
                                            <label>Old Password</label>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="user-profile-form-group mb-3">
                                                <input {...register('oldpassword', {
                                                    required: "You must specify old password",
                                                })} type="password" className="user-profile-form-control border-dark"/>
                                                <span className="icon fa fa-lock"></span>
                                                <ErrorMessage name={"oldpassword"} errors={errors}
                                                              render={({message}) => <p
                                                                  className={"text-danger"}>{message}</p>}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row mb-2"}>
                                        <div className="col-md-6">
                                            <label>New Password</label>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="user-profile-form-group mb-3">
                                                <input {...register('newpassword', {
                                                    required: "You must specify new password",
                                                })} type="password" className="user-profile-form-control border-dark"/>
                                                <span className="icon fa fa-lock"></span>
                                                <ErrorMessage name={"newpassword"} errors={errors}
                                                              render={({message}) => <p
                                                                  className={"text-danger"}>{message}</p>}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row mb-2"}>
                                        <div className="col-md-6">
                                            <label>Confirm New Password</label>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <div className="user-profile-form-group mb-3">
                                                <input {...register('confirmnewpassword', {
                                                    required: "You must confirm the password",
                                                    validate: (value) => {
                                                        const {newpassword} = getValues();
                                                        return newpassword === value || "Passwords should match!";
                                                    }
                                                })} type="password" className="user-profile-form-control border-dark"/>
                                                <span className="icon fa fa-lock"></span>
                                                <ErrorMessage name={"confirmnewpassword"} errors={errors}
                                                              render={({message}) => <p
                                                                  className={"text-danger"}>{message}</p>}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"col-lg-6 col-md-6 offset-md-3 offset-lg-3"}>
                                        <div className="user-form-group mt-4 pt-2">
                                            <button type="submit"
                                                    className="user-btn-form-control btn btn-dark submit px-3">Update
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