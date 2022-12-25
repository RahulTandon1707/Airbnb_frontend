import {NavLink} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AdminContext} from "./AdminProtectedRoute";
import axios from "axios";
import CountUp from "react-countup";

export default function AdminHome() {
    let [users, setUsers] = useState(0);
    let [earnings, setEarnings] = useState(0);
    const adminSession = useContext(AdminContext);
    useEffect(() => {
        axios.get("http://localhost:4000/count-users").then((response) => {
            setUsers(response.data[0].totalusers);
        })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:4000/admin-earnings").then((response) => {
            let total = parseInt(response.data[0].admin_earnings);
            setEarnings((total / 100) * 70);

        })
    }, [])
    return (
        <>
            <div>
                <h1 align="center" className={"style-font mt-4"}>Admin Dashboard</h1>
                {
                    adminSession.type === "admin" ?
                        <>
                            <div className="container mt-5">
                                <div className="row">
                                    <div className="col-sm-4 col-md-4">
                                        <div className="card h200 bg-pinkred">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text mt-4"}>Add Admins</h3>
                                            </div>
                                            <NavLink to={"/admin/add-admin"} className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p> Add
                                                Admins</p><i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4">
                                        <div className="card h200 bg-lightblue">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text mt-4"}>View Admins</h3>
                                            </div>
                                            <NavLink to={"/admin/view-admin"} className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>View
                                                Admins</p><i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4">
                                        <div className="card h200 bg-lightgreen">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text"}>Pending Owners</h3>
                                            </div>
                                            <NavLink to={"/admin/view-pending-owner"}
                                                     className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>Pending
                                                Owners</p> <i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <div className="card h200 bg-lightgreen">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text"}>View Activated Owners</h3>
                                            </div>
                                            <NavLink to={"/admin/actions-owner"} className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>View
                                                Activated Owners</p><i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <div className="card h200 bg-pinkred">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text"}>Pending Owner Properties</h3>
                                            </div>
                                            <NavLink to={"/admin/pending-owner-properties"}
                                                     className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>View Pending
                                                Owner Properties</p><i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <div className="card h200 bg-lightblue">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text"}>Activated Owner Properties</h3>
                                            </div>

                                            <NavLink to={"/admin/activated-owner-properties"}
                                                     className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>View
                                                Activated Owner Properties</p>
                                                <i className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <div className="card h200 bg-lightblue">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text mt-4"}>View Bookings</h3>
                                            </div>
                                            <NavLink to={"/admin/all-bookings"} className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>View All
                                                Bookings</p><i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <div className="card h200 bg-pinkred">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text"}>View User Queries</h3>
                                            </div>
                                            <NavLink to={"/admin/view-queries"}
                                                     className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>View
                                                Queries</p><i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <NavLink to={"/admin/view-users"}>
                                            <div className="card h200 bg-lightgreen">
                                                <div className="card-body">
                                                    <h3 className={"text-center style-text mt-4"}>View All Users</h3>
                                                    <h1 className={"text-center style-text"}><CountUp start={0}
                                                                                                      end={users}
                                                                                                      delay={0}
                                                                                                      duration={1}/>
                                                    </h1>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                    <div className="col-sm-12 col-md-12 mt-5">
                                        <NavLink to={"/admin/all-bookings"}>
                                            <div className="card h200 bg-pinkred">
                                                <div className="card-body">
                                                    <h3 className={"text-center style-text mt-4"}>Total Earnings</h3>
                                                    <h1 className={"text-center style-text"}>&#8377;<CountUp start={0}
                                                                                                             end={earnings}
                                                                                                             delay={0}
                                                                                                             duration={1}/>
                                                    </h1>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </> :
                        <>
                            <div className="container mt-2">
                                <div className="row">
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <div className="card h200 bg-lightgreen">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text"}>Pending Owners</h3>
                                            </div>
                                            <NavLink to={"/admin/view-pending-owner"}
                                                     className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>Pending
                                                Owners</p> <i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <div className="card h200 bg-lightblue">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text mt-4"}>Activated Owners</h3>
                                            </div>
                                            <NavLink to={"/admin/actions-owner"} className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>View
                                                Owners</p><i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <div className="card h200 bg-pinkred">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text"}>Pending Properties</h3>
                                            </div>
                                            <NavLink to={"/admin/pending-owner-properties"}
                                                     className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>View Pending
                                                Owner Properties</p><i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <div className="card h200 bg-pinkred">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text"}>Activated Properties</h3>
                                            </div>

                                            <NavLink to={"/admin/activated-owner-properties"}
                                                     className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>View
                                                properties</p>
                                                <i className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <div className="card h200 bg-lightgreen">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text mt-4"}>View Bookings</h3>
                                            </div>
                                            <NavLink to={"/admin/all-bookings"} className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>View
                                                Bookings</p><i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <div className="card h200 bg-lightblue">
                                            <div className="card-body">
                                                <h3 className={"text-center style-text"}>View User Queries</h3>
                                            </div>
                                            <NavLink to={"/admin/view-queries"}
                                                     className="card-footer text-center"
                                                     style={{backgroundColor: "black", color: "wheat"}}><p>View
                                                Queries</p><i
                                                className="fa fa-arrow-right text-light"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-4 mt-5">
                                        <NavLink to={"/admin/view-users"}>
                                            <div className="card h200 bg-lightgreen">
                                                <div className="card-body">
                                                    <h3 className={"text-center style-text mt-4"}>View All Users</h3>
                                                    <h1 className={"text-center style-text"}><CountUp start={0}
                                                                                                      end={users}
                                                                                                      delay={0}
                                                                                                      duration={1}/>
                                                    </h1>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                    <div className="col-sm-8 col-md-8 mt-5">
                                        <NavLink to={"/admin/all-bookings"}>
                                            <div className="card h200 bg-pinkred">
                                                <div className="card-body">
                                                    <h3 className={"text-center style-text mt-4"}>Total Earnings</h3>
                                                    <h1 className={"text-center style-text"}>&#8377;<CountUp start={0}
                                                                                                             end={earnings}
                                                                                                             delay={0}
                                                                                                             duration={1}/>
                                                    </h1>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )
}