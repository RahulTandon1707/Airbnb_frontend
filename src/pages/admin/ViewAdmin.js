import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import ReactLoading from 'react-loading';
import {FaUserEdit} from "react-icons/fa";

export default function ViewAdmin() {
    let navigate = useNavigate();
    let [data, setData] = useState([]);
    let [stat, setStat] = useState(false);

    function getData() {
        setStat(false);
        axios.get("http://localhost:4000/getadmindetails").then((response) => {
            setTimeout(() => {
                if (response.data !== "nodata") {
                    setData(response.data);
                    setStat(true);
                } else if (response.data === "nodata") {
                    setData([]);
                    setStat(true);
                }
            }, 3000)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            {
                stat ?
                    data.length === 0 ?
                        <div className={"custom-flex container bg-inactive"}><h1
                            className={"custom-flex pt-5 font height-view"}>No Data
                            Found!!</h1>
                        </div> :
                        <section className="ftco-section">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-center mb-5">
                                        <h2 className="style-font">ADMIN DETAILS</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap" style={{overflowX: "hidden"}}>
                                            <table className="table table-responsive-xl">
                                                <thead>
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Username</th>
                                                    <th>Fullname</th>
                                                    <th>Password</th>
                                                    <th>Phone</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Edit</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    data.map((value, index) => {
                                                        let {
                                                            email,
                                                            fullname,
                                                            password,
                                                            phoneno,
                                                            status,
                                                            type,
                                                            username
                                                        } = value;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{email}</td>
                                                                <td>{username}</td>
                                                                <td>{fullname}</td>
                                                                <td>{password}</td>
                                                                <td>{phoneno}</td>
                                                                <td>{type}</td>
                                                                {
                                                                    status === "active" ? <td className={"status"}><span
                                                                        className="active">{status}</span>
                                                                    </td> : <td className={"status"}><span
                                                                        className="inactive">{status}</span>
                                                                    </td>
                                                                }
                                                                <td>
                                                                    <button onClick={() => {
                                                                        navigate(`/admin/edit-admin/${username}`)
                                                                    }} type={"button"} className={"btn btn-warning"}>
                                                                        <FaUserEdit/>
                                                                    </button>
                                                                </td>
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
                        </section> :
                    <>
                        <div className={"custom-flex"}><h1 className={"font"}>Fetching Data</h1><ReactLoading
                            className={"d-flex justify-content-center"}
                            type={"balls"} color={"darkred"} height={800} width={90}/>
                        </div>
                    </>
            }
        </>
    )
}