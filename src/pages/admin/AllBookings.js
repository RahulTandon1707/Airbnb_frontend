import ReactLoading from "react-loading";
import {useEffect, useState} from "react";
import axios from "axios";

export default function AllBookings() {
    let [stat, setStat] = useState(false);
    let [paymentPending, setPaymentPending] = useState([]);
    let [paymentReceived, setPaymentReceived] = useState([]);
    const getPendingPaymentData = () => {
        setStat(false);
        setTimeout(() => {
            axios.get(`http://localhost:4000/get-pending-payments-data`).then((response) => {
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
            axios.get(`http://localhost:4000/get-received-payments-data`).then((response) => {
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
    useEffect(() => {
        getPendingPaymentData();
        getReceivedPaymentData();
    }, []);
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
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap">
                                            <table className="table table-responsive-xl">
                                                <thead>
                                                <tr>
                                                    <th>Bill id</th>
                                                    <th>Property Name</th>
                                                    <th>No of Rooms</th>
                                                    <th>Price</th>
                                                    <th>User Mobile</th>
                                                    <th>Payment Method</th>
                                                    <th>Payment Status</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    paymentPending.map((value, index) => {
                                                        let {
                                                            bill_id,
                                                            no_of_rooms,
                                                            property_name,
                                                            price,
                                                            status,
                                                            user_mobile,
                                                            payment_method
                                                        } = value;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{bill_id}</td>
                                                                <td>{property_name}</td>
                                                                <td>{no_of_rooms}</td>
                                                                <td>{price}</td>
                                                                <td>{user_mobile}</td>
                                                                <td>{payment_method}</td>
                                                                <td>{status}</td>
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
                                                    <th>Property Name</th>
                                                    <th>No of Rooms</th>
                                                    <th>Price</th>
                                                    <th>User Mobile</th>
                                                    <th>Payment Method</th>
                                                    <th>Payment Status</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    paymentReceived.map((value, index) => {
                                                        let {
                                                            bill_id,
                                                            no_of_rooms,
                                                            property_name,
                                                            price,
                                                            status,
                                                            user_mobile,
                                                            payment_method
                                                        } = value;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{bill_id}</td>
                                                                <td>{property_name}</td>
                                                                <td>{no_of_rooms}</td>
                                                                <td>{price}</td>
                                                                <td>{user_mobile}</td>
                                                                <td>{payment_method}</td>
                                                                <td>{status}</td>
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