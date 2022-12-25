import {useEffect} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

// Import the package
import useRazorpay from "react-razorpay";

export default function CheckOut() {
    const Razorpay = useRazorpay();

    const bookOrder = (response) => {
        let payment_id = response.razorpay_payment_id;
        if (payment_id !== "") {
            saveOrder("Payment Done");
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

    const location = useLocation();
    let navigate = useNavigate();
    let price = location.state.price;
    let no_of_rooms = location.state.no_of_rooms;
    let checkin_date = location.state.checkin_date;
    let checkout_date = location.state.checkout_date;
    let property_name = location.state.property_name;
    let owner_email = location.state.owner_email;
    let gst = price * (18 / 100);
    let grandTotal = price + gst;

    let {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm();

    useEffect(() => {
        axios
            .get("http://localhost:4000/user/get-user-data-in-checkout")
            .then((response) => {
                response.data.map((value, index) => {
                    let {user_id, user_address, user_email, user_mobile, user_name} =
                        value;
                    setValue("user_id", user_id);
                    setValue("user_address", user_address);
                    setValue("user_email", user_email);
                    setValue("user_mobile", user_mobile);
                    setValue("user_name", user_name);
                    setValue("checkin_date", checkin_date);
                    setValue("checkout_date", checkout_date);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const saveOrder = (payment_status) => {
        let data = JSON.parse(localStorage.getItem("userInfo"));
        let {
            user_city,
            payment_method,
            user_state,
            user_email,
            user_mobile,
            user_name,
            user_room_needs,
        } = data;

        let finalData = {
            user_city,
            user_state,
            user_email,
            user_name,
            grandTotal,
            property_name,
            owner_email,
            no_of_rooms,
            checkin_date,
            checkout_date,
            payment_method,
            user_mobile,
            user_room_needs,
            status: payment_status,
        };

        axios
            .post("http://localhost:4000/user/save-billing-details", finalData)
            .then((response) => {
                if (response.data === "success") {
                    navigate("/booking-done", {state: {property_name, user_email}});
                } else {
                    Swal.fire("OOPS!!", "Some Error Occured", "error");
                }
            });
    };

    function OnSubmit(data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        let {
            payment_method,
            user_email,
            user_mobile,
        } = data;

        if (payment_method === "cod") {
            saveOrder("Payment Pending");
        } else {
            options.amount = grandTotal * 100;
            options.prefill.email = user_email;
            options.prefill.contact = user_mobile;
            let rzp = new Razorpay(options);
            rzp.open();
        }
    }

    return (
        <>
            <section className="banner_inner" id="home">
                <div className="banner_inner_overlay"></div>
            </section>
            <div>
                <div className="py-3">
                    <div className="container">
                        <h1 className="text-light-primary my-2 text-center bg-dark col-6 rounded fw-bold text-light mx-auto">
                            Checkout
                        </h1>
                    </div>
                </div>
                <div className="py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Basic Information</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit(OnSubmit)}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="user_id">Id Number</label>
                                                        <input
                                                            {...register("user_id")}
                                                            type={"text"}
                                                            disabled
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="user_name">User Name</label>
                                                        <input
                                                            {...register("user_name")}
                                                            disabled
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="user_email">Email</label>
                                                        <input
                                                            {...register("user_email")}
                                                            disabled
                                                            type="email"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="user_mobile">Mobile</label>
                                                        <input
                                                            {...register("user_mobile")}
                                                            disabled
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="checkin_date">Checkin Date</label>
                                                        <input
                                                            disabled
                                                            {...register("checkin_date")}
                                                            type="date"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="checkout_date">Checkout Date</label>
                                                        <input
                                                            disabled
                                                            {...register("checkout_date")}
                                                            type="date"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="user_city">City</label>
                                                        <input
                                                            {...register("user_city", {
                                                                required: "This field is required",
                                                            })}
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="user_state">State</label>
                                                        <input
                                                            {...register("user_state", {
                                                                required: "This field is required",
                                                            })}
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group mb-3">
                            <textarea
                                {...register("user_room_needs")}
                                style={{resize: "none"}}
                                rows="2"
                                className="form-control"
                                placeholder="Write Message..."
                            />
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className="col-md-12 mb-1">
                                                    <b>Payment Methods : </b>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="Cod" className="me-1">
                                                        Cash On Delivery
                                                    </label>
                                                    <input
                                                        {...register("payment_method")}
                                                        type="radio"
                                                        value="cod"
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <label htmlFor="Online" className="me-1">
                                                        Online Payment
                                                    </label>
                                                    <input
                                                        {...register("payment_method")}
                                                        type="radio"
                                                        value="online"
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor=""></label>
                                                        <button className="btn btn-primary col-12 mt-4">
                                                            Place Order
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <table className="table table-bordered reset_table">
                                    <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>Rooms</th>
                                        <th>Price(inc. of days)</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <h6>{property_name}</h6>
                                        </td>
                                        <td style={{textAlign: "center", fontWeight: "bold"}}>
                                            {no_of_rooms}
                                        </td>
                                        <td style={{textAlign: "center"}}>
                                            Rs.{price / no_of_rooms}
                                        </td>
                                        <td>Rs.{price}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={"2"}>
                                            <h6>Taxes(in GST 18%):-</h6>
                                        </td>
                                        <td style={{textAlign: "center"}}>
                                            Rs.{gst.toFixed(2)}
                                        </td>
                                        <td>Rs.{gst.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="text-end fw-bold">
                                            Grand total
                                        </td>
                                        <td colSpan="2" className="text-end fw-bold">
                                            Rs.{grandTotal}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
