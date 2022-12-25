import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {ErrorMessage} from "@hookform/error-message";

export default function ChangeOwnerPassword() {
    let {register, handleSubmit, formState: {errors}, getValues, reset} = useForm();
    let navigate = useNavigate();

    function onSubmit(data) {
        axios.post("http://localhost:4000/owner/change-owner-password", data).then((response) => {
            if (response.data === "wrongpassword") {
                Swal.fire({icon: "error", title: "Invalid old Password"});
            } else if (response.data === "failure") {
                Swal.fire({icon: "error", title: "Some error occured at backend!!"});
                reset();
            } else if (response.data === "success") {
                Swal.fire({icon: "success", title: "Password Changed Successfully"});
                navigate("/owner");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>

            <section className="contact py-5 bg-img">
                <div>
                    <div className="text-center mb-5">
                        <h3 className={"style-font"}>CHANGE PASSWORD</h3>
                    </div>
                    <div className="col-lg-6 col-md-6 offset-lg-3 offset-md-3 contact-left-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group contact-forms">
                                <input {...register('oldpassword', {
                                    required: "You must specify old password",
                                })} type="password"
                                       className="form-control" placeholder="Old Password"/>
                            </div>
                            <ErrorMessage name="oldpassword" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>

                            <div className="form-group contact-forms">
                                <input {...register('newpassword', {
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
                                       className="form-control" placeholder="New Password"/>
                            </div>
                            <ErrorMessage name="newpassword" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>
                            <div className="form-group contact-forms">
                                <input
                                    type="password" {...register('confirmnewpassword', {
                                    required: "You must confirm the password",
                                    validate: (value) => {
                                        const {newpassword} = getValues();
                                        return newpassword === value || "Passwords should match!";
                                    }
                                })}
                                    className="form-control" placeholder="Confirm new password"/>
                            </div>
                            <ErrorMessage name="confirmnewpassword" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>
                            <button className="btn btn-block mt-3 sent-butnn">Update Password</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}