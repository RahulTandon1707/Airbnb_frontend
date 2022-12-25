import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";

export default function ViewBookings() {
    let {property_name} = useParams();
    let [stat, setStat] = useState(false);
    let [paymentPending, setPaymentPending] = useState([]);
    let [paymentReceived, setPaymentReceived] = useState([]);
    const getPendingPaymentData = () => {
        setStat(false);
        setTimeout(() => {
            axios.get(`http://localhost:4000/owner/get-pending-payments${property_name}`).then((response) => {
                if (response.data !== "nodata") {
                    setPaymentPending(response.data)
                    setStat(true);
                } else if (response.data === "nodata") {
                    setPaymentReceived([]);
                    setStat(true);
                }
            }).catch((error) => {
                console.log(error);
            })
        }, 2000);

    }

    const getReceivedPaymentData = () => {
        setStat(false);
        setTimeout(() => {
            axios.get(`http://localhost:4000/owner/get-received-payments${property_name}`).then((response) => {
                console.log(response.data);
                if (response.data !== "nodata") {
                    setPaymentReceived(response.data);
                    setStat(true);
                } else if (response.data === "nodata") {
                    setPaymentReceived([]);
                    setStat(true);
                }
            }).catch((error) => {
                console.log(error);
            })
        }, 2000);
    }

    function changePaymentStatus(bill_id) {
        let data = {bill_id};
        axios.post("http://localhost:4000/owner/change-payment-status", data).then((response) => {
            if (response.data === "success") {
                window.location.reload();
            } else {
                Swal.fire("Technical Error!", "Please Try Again later", "error");
            }
        })
    }

    useEffect(() => {
        getPendingPaymentData();
        getReceivedPaymentData();
    }, [property_name]);
    return (
        <>
            <h2 className="style-font text-center">COD Bookings</h2>
            {
                stat ?
                    paymentPending.length === 0 ?
                        <div className={"custom-flex container bg-inactive"}><h1
                            className={"custom-flex pt-5 font sm-height-view"}>No Bookings
                            Found!!</h1>
                        </div> :
                        <section className="ftco-section">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-center">
                                        <h2 className="style-font">COD Bookings</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap">
                                            <table className="table table-responsive-xl">
                                                <thead>
                                                <tr>
                                                    <th>Bill id</th>
                                                    <th>No of Rooms</th>
                                                    <th>Price</th>
                                                    <th>User Mobile</th>
                                                    <th>Status</th>
                                                    <th>Payments Received</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    paymentPending.map((value, index) => {
                                                        let {
                                                            bill_id,
                                                            no_of_rooms,
                                                            price,
                                                            status,
                                                            user_mobile
                                                        } = value;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{bill_id}</td>
                                                                <td>{no_of_rooms}</td>
                                                                <td>{price}</td>
                                                                <td>{user_mobile}</td>
                                                                <td>{status}</td>

                                                                <td>
                                                                    <button onClick={() => changePaymentStatus(bill_id)}
                                                                            className={"btn btn-primary"}
                                                                            type={"button"}>Payment Received
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
                        <div className={"custom-flex"}><h1 className={"font"}>Fetching Bookings</h1><ReactLoading
                            className={"d-flex justify-content-center"}
                            type={"balls"} color={"darkred"} height={300} width={90}/>
                        </div>
                    </>
            }
            <hr/>
            <h2 className="style-font text-center">Online Payment Bookings</h2>
            {
                stat ?
                    paymentReceived.length === 0 ?
                        <div className={"custom-flex container bg-inactive"}><h1
                            className={"custom-flex pt-5 font sm-height-view"}>No Bookings
                            Found!!</h1>
                        </div> :
                        <section className="mt-2">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-center mb-5">
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap">
                                            <table className="table table-responsive-xl">
                                                <thead>
                                                <tr>
                                                    <th>Bill id</th>
                                                    <th>No of Rooms</th>
                                                    <th>Price</th>
                                                    <th>User Mobile</th>
                                                    <th>Status</th>
                                                    <th>Payments Received</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    paymentReceived.map((value, index) => {
                                                        let {
                                                            bill_id,
                                                            no_of_rooms,
                                                            price,
                                                            status,
                                                            user_mobile
                                                        } = value;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{bill_id}</td>
                                                                <td>{no_of_rooms}</td>
                                                                <td>{price}</td>
                                                                <td>{user_mobile}</td>
                                                                <td>{status}</td>

                                                                <td>
                                                                    {status}
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
                        <div className={"custom-flex"}><h1 className={"font"}>Fetching Bookings</h1><ReactLoading
                            className={"d-flex justify-content-center"}
                            type={"balls"} color={"darkred"} height={800} width={90}/>
                        </div>
                    </>
            }
        </>
    )
}