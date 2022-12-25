import ReactLoading from "react-loading";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function SetOwnerPropertyActions() {
    let [data, setData] = useState([]);
    let [stat, setStat] = useState(false);

    function getData() {
        setStat(false);
        let status = {activatestatus: "activated"};
        axios.post("http://localhost:4000/getownerspendingproperty", status).then((response) => {
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

    function activateAccount(room_id) {
        Swal.fire({
            title: 'Are you sure to unblock this account?',
            text: "You can block it later!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Unblock!'
        }).then((result) => {
            if (result.isConfirmed) {
                let status = {room_id: room_id, accountstatus: "pending"};
                axios.post("http://localhost:4000/owner-property-actions", status).then((response) => {
                    if (response.data === "activated") {
                        Swal.fire("Unblocked", "Owner's property has been unblocked successfully!", "success");
                        getData();
                    } else if (response.data === "error") {
                        Swal.fire("Technical Error", "Some error occured at backend", "error");
                        getData();
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        })


    }

    function deactivateAccount(room_id) {
        Swal.fire({
            title: 'Are you sure to block this account?',
            text: "You can unblock it later!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Block!'
        }).then((result) => {
            if (result.isConfirmed) {
                let status = {room_id: room_id, accountstatus: "activated"};
                axios.post("http://localhost:4000/owner-property-actions", status).then((response) => {
                    if (response.data === "blocked") {
                        Swal.fire("Blocked", "Owner's property has been blocked successfully", "success");
                        getData();
                    } else if (response.data === "error") {
                        Swal.fire("Technical Error", "Some error occured at backend", "error");
                        getData();
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        })
    }

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
                                        <h2 className="style-font">OWNER PROPERTY DETAILS</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap">
                                            <table className="table table-responsive-xl">
                                                <thead>
                                                <tr>
                                                    <th>Property id</th>
                                                    <th>Owner name</th>
                                                    <th>Property name</th>
                                                    <th>Address</th>
                                                    <th>Photo</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th>No of Rooms</th>
                                                    <th>No of Days</th>
                                                    <th>Category</th>
                                                    <th>Amenities</th>
                                                    <th>Price</th>
                                                    <th>Contact no</th>
                                                    <th>Status</th>
                                                    <th colSpan={"2"} className={"text-center"}>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    data.map((value, index) => {
                                                        let {
                                                            address,
                                                            amenities,
                                                            category_name,
                                                            contact_no,
                                                            no_of_days,
                                                            no_of_rooms,
                                                            owner_email,
                                                            photo,
                                                            price,
                                                            property_name,
                                                            room_id,
                                                            status
                                                        } = value;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{room_id}</td>
                                                                <td>{owner_email}</td>
                                                                <td>{property_name}</td>
                                                                <td>{address}</td>
                                                                <td colSpan={"3"}><img src={photo} width={"300px"}
                                                                                       height={"150px"}
                                                                                       alt="Loading.."/></td>
                                                                <td>{no_of_rooms}</td>
                                                                <td>{no_of_days}</td>
                                                                <td>{category_name}</td>
                                                                <td>{amenities}</td>
                                                                <td>{price}</td>
                                                                <td>{contact_no}</td>
                                                                {
                                                                    status === "activated" ?
                                                                        <td className={"status"}><span
                                                                            className="active">{status}</span>
                                                                        </td> : <td className={"status"}><span
                                                                            className="inactive">{status}</span>
                                                                        </td>
                                                                }
                                                                <td>
                                                                    {
                                                                        status === "activated" ? <button
                                                                            onClick={() => deactivateAccount(room_id)}
                                                                            type={"button"}
                                                                            className={"btn btn-danger"}>Block
                                                                        </button> : <button
                                                                            onClick={() => activateAccount(room_id)}
                                                                            type={"button"}
                                                                            className={"btn btn-success"}>Unblock
                                                                        </button>
                                                                    }
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