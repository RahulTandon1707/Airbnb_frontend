import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function UserProfile() {
    let [user_email, setuseremail] = useState("");
    let [user_mobile, setusermobile] = useState("");
    let [user_address, setuseraddress] = useState("");
    let [user_name, setusername] = useState("");
    let [user_id, setuserid] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/user/get-user-profile").then((response) => {
            response.data.map((value, index) => {
                let {user_id, user_address, user_email, user_mobile, user_name} = value;
                setuseraddress(user_address);
                setuseremail(user_email);
                setusermobile(user_mobile);
                setusername(user_name);
                setuserid(user_id);
            })
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <>
            <section className="banner_inner" id="home">
                <div className="banner_inner_overlay">
                </div>
            </section>
            <div className="container bg-blue emp-profile" id={"user-profile"}>
                <form method="post">
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
                        <div className="col-md-2">
                            <input type="button" className="profile-edit-btn"
                                   onClick={() => navigate(`/edit-profile/${user_id}`)}
                                   value="Edit Profile"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <label>User Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user_name}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user_email}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <label>Mobile</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user_mobile}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <label>Address</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user_address}</p>
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