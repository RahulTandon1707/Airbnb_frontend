import {useEffect, useState} from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";

export default function ViewQueries() {
    let [data, setData] = useState([]);
    let [stat, setStat] = useState(false);

    function getData() {
        setStat(false);
        axios.get("http://localhost:4000/view-user-queries").then((response) => {
            setTimeout(() => {
                if (response.data !== "nodata") {
                    setData(response.data);
                    setStat(true);
                } else if (response.data === "nodata") {
                    setData([]);
                    setStat(true);
                }
            }, 2000)
        }).catch((error) => {
            console.log(error);
        })
    }

    function deleteQuery(query_id) {
        let data = {query_id};
        axios.post("http://localhost:4000/delete-query", data).then((response) => {
            if (response.data === "success") {
                getData();
            } else {
                Swal.fire("Technical Error", "Contact Your Developer", "error");
            }
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
                                        <h2 className="style-font">QUERIES</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap" style={{overflowX: "hidden"}}>
                                            <table className="table table-responsive-xl">
                                                <thead>
                                                <tr>
                                                    <th>Query_id</th>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Mobile</th>
                                                    <th>Message</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    data.map((value, index) => {
                                                        let {
                                                            query_id,
                                                            user_name,
                                                            user_email,
                                                            user_mobile,
                                                            message,
                                                            status
                                                        } = value;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{query_id}</td>
                                                                <td>{user_name}</td>
                                                                <td>{user_email}</td>
                                                                <td>{user_mobile}</td>
                                                                <td>{message}</td>
                                                                <td>{status}</td>
                                                                <td>
                                                                    <button onClick={() => {
                                                                        deleteQuery(query_id)
                                                                    }} type={"button"}
                                                                            className={"btn btn-primary"}>
                                                                        Solved?
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
                        <div className={"custom-flex"}><h1 className={"font"}>Fetching Queries</h1><ReactLoading
                            className={"d-flex justify-content-center"}
                            type={"balls"} color={"darkred"} height={800} width={90}/>
                        </div>
                    </>
            }
        </>
    )
}