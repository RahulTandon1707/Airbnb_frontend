import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useRazorpay from "react-razorpay";

export default function MyBookings() {
    let [billid, setBillid] = useState(0);
    const Razorpay = useRazorpay();
    const bookOrder = (response) => {
        let payment_id = response.razorpay_payment_id;
        if (payment_id !== "") {
            changeStatus("Payment Done");
        } else {
            alert("Payment Failed. Try again...");
        }
    };
    /* RAZORPAY Options */
    let options = {
        key: "rzp_test_A3RM3Asww6uWvF",
        currency: "INR",
        amount: 0,
        name: "Voyage Ventures",
        description: "Airbnb",
        image:
            "https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg",
        handler: bookOrder,
        prefill: {
            name: "",
            email: "",
            contact: "",
        },
        theme: {
            color: "#F46432",
        },
    };
    let [data, setData] = useState([]);
    const getData = () => {
        axios.get("http://localhost:4000/user/show-user-my-bookings").then((response) => {
            setData(response.data);

        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getData();
    }, []);


    //Payment Gateway
    function confirmPayment({price, user_mobile, user_email, bill_id}) {
        setBillid(() => bill_id);
        options.amount = price * 100;
        options.prefill.email = user_email;
        options.prefill.contact = user_mobile;
        let rzp = new Razorpay(options);
        rzp.open();
    }

    function changeStatus(payment_status) {
        let finalData = {payment_status, bill_id: billid}
        axios.post("http://localhost:4000/user/change-payment-status", finalData).then((response) => {
            if (response.data === "success") {
                Swal.fire("Completed!", "You've completed your payment successfully", "success");
            } else {
                Swal.fire("Error!", "Some Error at backend.You'll get your refund within 3-4 business days", "error");
            }
        }).catch((error) => {
            console.log(error);
        })
    }


    function cancelBooking(bill_id) {
        let data = {bill_id};
        Swal.fire({
            title: 'Are you sure to cancel booking?',
            text: "You will get your refund in 3-4 business days if you've paid already!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:4000/user/cancel-booking", data).then((response) => {
                    if (response.data === "success") {
                        Swal.fire("Booking Cancelled", "Your Booking Has Been Cancelled", "success");
                        getData();
                    } else {
                        Swal.fire("OOPS!", "Technical Error.Try again later", "error");
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        })


    }

    return (
        <>
            <section className="banner_inner" id="home">
                <div className="banner_inner_overlay">
                </div>
            </section>
            <div className="container" style={{marginTop: "4rem"}}>
                <div className="text-center">
                    <h3 className="alert alert-info">My Bookings</h3>
                </div>

                <div className="row">
                    <div className="col-md-12" style={{border: "1px solid #000"}}>
                        <div className="table-responsive" style={{overflowX: "scroll"}}>
                            <table className="table">
                                <tr>
                                    <th>Sr No.</th>
                                    <th colSpan={"2"} className={"text-center"}><h4>Booking Details</h4></th>
                                </tr>

                                {
                                    data.map((value, index) => {
                                        let {
                                            bill_id,
                                            user_email,
                                            price,
                                            property_name,
                                            no_of_rooms,
                                            checkin_date,
                                            checkout_date,
                                            payment_method,
                                            user_mobile,
                                            status,
                                        } = value;
                                        return (
                                            <>
                                                <tr>
                                                    <td className="text-danger"
                                                        style={{fontWeight: "bold"}}>{index + 1}</td>
                                                    <td>
                                                        <table className="table">
                                                            <tr className="bg-info">
                                                                <th>Booking ID</th>
                                                                <td>{bill_id}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>User Email</th>
                                                                <td>{user_email}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Price</th>
                                                                <td>&#8377;{price}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Property Name</th>
                                                                <td>{property_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>No Of Rooms</th>
                                                                <td>{no_of_rooms}</td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td>
                                                        <table className="table">
                                                            <tr>
                                                                <th>Checkin Date</th>
                                                                <td>{new Date(checkin_date).getDate() + "-" + new Date(checkin_date).getMonth() + "-" + new Date(checkin_date).getFullYear()}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Checkout Date</th>
                                                                <td>{new Date(checkout_date).getDate() + "-" + new Date(checkout_date).getMonth() + "-" + new Date(checkout_date).getFullYear()}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Payment Method</th>
                                                                <td>{payment_method}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>User Mobile</th>
                                                                <td>{user_mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Payment Status</th>
                                                                {status === "Payment Pending" ?
                                                                    <>
                                                                        <div>
                                                                            <td>{status}</td>
                                                                            <button onClick={() => confirmPayment({
                                                                                price,
                                                                                user_mobile,
                                                                                user_email, bill_id
                                                                            })}
                                                                                    className={"btn btn-success"}>Pay
                                                                                Now
                                                                            </button>
                                                                            <button
                                                                                onClick={() => cancelBooking(bill_id)}
                                                                                className={"btn btn-danger"}
                                                                                style={{marginLeft: "10px"}}>Cancel
                                                                                Booking
                                                                            </button>
                                                                        </div>
                                                                    </> :
                                                                    <div>
                                                                        <p className={"text font-weight-bold text-success mt-2"}>{status}</p>
                                                                        <button onClick={() => cancelBooking(bill_id)}
                                                                                className={"btn btn-danger"}>Cancel
                                                                            Booking
                                                                        </button>
                                                                    </div>
                                                                }
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}