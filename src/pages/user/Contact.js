import {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {HashLink as Link} from "react-router-hash-link";

export default function Contact() {
    let [userSession, setUserSession] = useState({});
    let {register, handleSubmit, formState: {errors}, setValue} = useForm();
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:4000/user/send-user-session").then((response) => {
            setUserSession(response.data);
            setValue("user_email", response.data.user_email);
            setValue("user_name", response.data.user_name);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function onSubmit(data) {
        axios.post("http://localhost:4000/user/contactus-queries", data).then((response) => {
            if (response.data === "success") {
                Swal.fire("Query Sent", "We'll contact you soon to solve your query", "success");
                navigate("/");
            } else {
                Swal.fire("Technical Error!", "Please Try Again Later", "error");
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
            <section className="contact py-5">
                <div className="container py-lg-5 py-sm-3">
                    <h2 id={"contact-page"} className="heading text-capitalize text-center mb-sm-5 mb-4"> Get In Touch
                        with us</h2>
                    <ul className="list-unstyled row text-center mt-lg-5 mt-4 px-lg-5">
                        <li className="col-md-4 col-sm-6 adress-w3pvt-info">
                            <div className=" adress-icon">
                                <span className="fa fa-map-marker"></span>
                            </div>
                            <h6>Location</h6>
                            <p>Voyage Ventures
                                <br/>Near Kesar Da Dhaba, ASR.</p>
                        </li>

                        <li className="col-md-4 col-sm-6 adress-w3pvt-info mt-sm-0 mt-4">
                            <div className="adress-icon">
                                <span className="fa fa-envelope-open-o"></span>
                            </div>
                            <h6>Phone & Email</h6>
                            <p>+(91) 9876466448</p>
                            <a href="mailto:rahultandon99028@gmail.com" className="mail">rahultandon99028@gmail.com</a>
                        </li>
                        <li className="col-md-4 col-sm-6 adress-w3pvt-info mt-md-0 mt-4">

                            <div className="adress-icon">
                                <span className="fa fa-comments-o"></span>
                            </div>

                            <h6>Stay In Touch</h6>
                            <ul className="social_section_1info mt-2">
                                <li className="mb-2 facebook"><Link to={"/"}><span
                                    className="fa fa-facebook"></span></Link>
                                </li>
                                <li className="mb-2 twitter"><Link to={"/"}><span
                                    className="fa fa-twitter"></span></Link>
                                </li>
                                <li className="google"><Link to={"/"}><span className="fa fa-google-plus"></span></Link>
                                </li>
                                <li className="linkedin"><Link to={"/"}><span className="fa fa-linkedin"></span></Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="contact-grids mt-5">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 contact-left-form">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {
                                        Object.keys(userSession).length === 0 ?
                                            <>
                                                <div className=" form-group contact-forms">
                                                    <input  {...register("user_name", {
                                                        required: "This field is required",
                                                        pattern: {
                                                            value: /[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/,
                                                            message: "Enter valid name"
                                                        }
                                                    })}
                                                            type="text"
                                                            className="form-control" placeholder="Name"
                                                    />
                                                    <ErrorMessage name={"user_name"} errors={errors}
                                                                  render={({message}) => <p
                                                                      className={"text-danger"}>{message}</p>}/>
                                                </div>
                                                <div className="form-group contact-forms">
                                                    <input {...register("user_email", {
                                                        required: "This field is required",
                                                        pattern: {
                                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                            message: "Enter valid Email"
                                                        }
                                                    })}
                                                           type="email"
                                                           className="form-control" placeholder="Email"
                                                    />
                                                    <ErrorMessage name={"user_email"} errors={errors}
                                                                  render={({message}) => <p
                                                                      className={"text-danger"}>{message}</p>}/>
                                                </div>
                                            </>
                                            : <>
                                                <div className=" form-group contact-forms">
                                                    <input disabled {...register("user_name")} type="text"
                                                           className="form-control"
                                                    />
                                                </div>
                                                <div className="form-group contact-forms">
                                                    <input {...register("user_email")} disabled type="email"
                                                           className="form-control"
                                                    />
                                                </div>
                                            </>
                                    }
                                    <div className="form-group contact-forms">
                                        <input {...register("user_mobile", {
                                            required: "You must specify mobile number",
                                            pattern: {
                                                value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                                                message: "Enter valid mobile number"
                                            }
                                        })} type="text" className="form-control"
                                               placeholder="Phone"/>
                                        <ErrorMessage name={"user_mobile"} errors={errors} render={({message}) => <p
                                            className={"text-danger"}>{message}</p>}/>
                                    </div>
                                    <div className="form-group contact-forms">
                                        <textarea {...register("message", {required: "You must specify your query"})}
                                                  className="form-control"
                                                  placeholder="Message" rows="3"
                                        ></textarea>
                                        <ErrorMessage name={"message"} errors={errors} render={({message}) => <p
                                            className={"text-danger"}>{message}</p>}/>
                                    </div>
                                    <button className="btn btn-block sent-butnn">Send</button>
                                </form>
                            </div>
                            <div className="col-lg-6 col-md-6 contact-right pl-lg-5">
                                <h4>Do you have any questions about us? write to us.</h4>
                                <p className="mt-md-4 mt-2">It's been 5 years that we have been serving our
                                    customers . All these 5 five years we have had some amazing memories with our
                                    customers . Their feedback and queries have helped us build a brand that we are
                                    today.We would
                                    love and encourage queries and feedback that you have!</p>
                                <h5 className="mt-lg-5 mt-3">Office Hours</h5>
                                <p className="mt-3">Monday to Friday : 09 am to 06 pm</p>
                                <p>Saturday and Sunay : 10 am to 04 pm</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="map p-2">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2017.0729245294192!2d74.8733432639257!3d31.62499128548148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39197caa7727941f%3A0xfcde6f886bfa4e16!2sKesar%20Da%20Dhaba!5e0!3m2!1sen!2sin!4v1669962194280!5m2!1sen!2sin"
                    width="800" height="600"></iframe>
            </div>
        </>
    )
}