import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import ReactLoading from 'react-loading';
import {FaUserEdit, FaTrashAlt} from "react-icons/fa";
import Swal from "sweetalert2";

export default function ViewProperty() {
    let navigate = useNavigate();
    let [data, setData] = useState([]);
    let [stat, setStat] = useState(false);

    function getData() {
        setStat(false);
        axios.get("http://localhost:4000/owner/getownerpropertydetails").then((response) => {
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

    useEffect(() => {
        getData();
    }, []);


    function deleteProperty(room_id) {
        Swal.fire({
            title: 'Are you sure to delete property?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:4000/owner/deleteownerproperty", {'room_id': room_id}).then((response) => {
                    if (response.data === "success") {
                        Swal.fire(
                            'Deleted',
                            'Your property has been deleted',
                            'success'
                        )
                        getData();
                    } else {
                        Swal.fire(
                            'Error',
                            'Property cannot be deleted. Please try again after sometime!',
                            'error'
                        )
                    }
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
                                        <h2 className="style-font">PROPERTY DETAILS</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap">
                                            <table className="table table-responsive-xl">
                                                <thead>
                                                <tr>
                                                    <th>Property id</th>
                                                    <th>Owner Email</th>
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
                                                    <th colSpan={"2"} className={"text-center"}>View</th>
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
                                                                        </td> : status === "blocked" ?
                                                                            <td className={"status"}><span
                                                                                className="inactive">{status}</span>
                                                                            </td> : <td className={"status"}><span
                                                                                className="waiting">{status}</span>
                                                                            </td>
                                                                }
                                                                <td>
                                                                    <button onClick={() => {
                                                                        navigate(`/owner/edit-property/${room_id}`)
                                                                    }} type={"button"} className={"btn btn-warning"}>
                                                                        <FaUserEdit/>
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    <button type={"button"}
                                                                            onClick={() => deleteProperty(room_id)}
                                                                            className={"btn btn-danger"}>
                                                                        <FaTrashAlt/>
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    <button id={"view-bookings"}
                                                                            className={"btn btn-primary"}
                                                                            type={"button"}
                                                                            onClick={() => navigate(`/owner/view-bookings/${property_name}`)}>View
                                                                        Bookings
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