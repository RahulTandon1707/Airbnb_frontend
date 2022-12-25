import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import CountUp from "react-countup";

export default function OwnerHome() {
    let [earning, setEarning] = useState(0);
    useEffect(() => {
        axios.get("http://localhost:4000/owner/get-earnings").then((response) => {
            let total = parseInt(response.data[0].total_earning);
            setEarning((total / 100) * 30);

        })
    }, []);
    return (
        <>
            <h1 align="center" className={"style-font mt-4"}>Owner Dashboard</h1>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-4 col-md-4">
                        <div className="card h200 bg-pinkred">
                            <div className="card-body">
                                <h3 className={"text-center style-text mt-4"}>Add Properties</h3>
                            </div>
                            <NavLink to={"/owner/add-property"} className="card-footer text-center"
                                     style={{backgroundColor: "black", color: "wheat"}}><p> Add
                                Properties</p><i
                                className="fa fa-arrow-right text-light"></i></NavLink>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4">
                        <div className="card h200 bg-lightblue">
                            <div className="card-body">
                                <h3 className={"text-center style-text mt-4"}>View
                                    Properties</h3>
                            </div>
                            <NavLink to={"/owner/view-property"} className="card-footer text-center"
                                     style={{backgroundColor: "black", color: "wheat"}}><p>View
                                Properties</p><i
                                className="fa fa-arrow-right text-light"></i></NavLink>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4">
                        <div className="card h200 bg-lightgreen">
                            <div className="card-body">
                                <h3 className={"text-center style-text"}>Change Password</h3>
                            </div>
                            <NavLink to={"/owner/change-owner-password"}
                                     className="card-footer text-center"
                                     style={{backgroundColor: "black", color: "wheat"}}><p>Change Password</p> <i
                                className="fa fa-arrow-right text-light"></i></NavLink>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4 mt-5">
                        <div className="card h200 bg-lightgreen">
                            <div className="card-body">
                                <h3 className={"text-center style-text"}>View Bookings</h3>
                            </div>
                            <NavLink to={"/owner/view-all-bookings"}
                                     className="card-footer text-center"
                                     style={{backgroundColor: "black", color: "wheat"}}><p>View Bookings</p> <i
                                className="fa fa-arrow-right text-light"></i></NavLink>
                        </div>
                    </div>
                    <div className="col-sm-8 col-md-8 mt-5">
                        <div className="card h200 bg-pinkred">
                            <NavLink to={"/owner/view-all-bookings"}>
                            <div className="card-body">
                                <h3 className={"text-center style-text"}>Total Earnings</h3>
                                <h1 id={"earnings"} className={"text-center style-text mt-4"}>&#8377; <CountUp start={0} end={earning}
                                                                                               duration={1}
                                                                                               delay={0}/></h1>

                            </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}