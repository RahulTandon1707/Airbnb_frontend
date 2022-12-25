import {useEffect, useState} from "react";
import axios from "axios";
import ReactLoading from "react-loading";

export default function ViewUsers() {
    let [status, setStatus] = useState(false);
    let [data, setData] = useState([]);

    function getData() {
        setStatus(false);
        setTimeout(() => {
            axios.get("http://localhost:4000/view-all-users").then((response) => {
                if (response.data !== "nodata") {
                    setData(response.data);
                    setStatus(true);
                } else if (response.data === "nodata") {
                    setData([]);
                    setStatus(true);
                }
            }).catch((error) => {
                console.log(error);
            })
        }, 2000);
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            {
                status ? data.length === 0 ? <div className={"custom-flex container bg-inactive"}><h1
                    className={"custom-flex pt-5 font height-view"}>No Data
                    Found!!</h1>
                </div> : <>
                    <section className="ftco-section">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-6 text-center mb-5">
                                    <h2 className="style-font">USER DETAILS</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="table-wrap" style={{overflowX: "hidden"}}>
                                        <table className="table table-responsive-xl">
                                            <thead>
                                            <tr>
                                                <th>User Id</th>
                                                <th>User Name</th>
                                                <th>Email</th>
                                                <th>Password</th>
                                                <th>Mobile</th>
                                                <th>Address</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                data.map((value, index) => {
                                                    let {
                                                        user_id,
                                                        user_email,
                                                        user_name,
                                                        password,
                                                        user_mobile,
                                                        user_address
                                                    } = value;
                                                    return (
                                                        <tr key={index}>
                                                            <td>{user_id}</td>
                                                            <td>{user_name}</td>
                                                            <td>{user_email}</td>
                                                            <td>{user_mobile}</td>
                                                            <td>{password}</td>
                                                            <td>{user_address}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </> : <>
                    <div className={"custom-flex"}><h1 className={"font"}>Fetching Data</h1><ReactLoading
                        className={"d-flex justify-content-center"}
                        type={"balls"} color={"darkred"} height={800} width={90}/>
                    </div>
                </>
            }
        </>
    )
}