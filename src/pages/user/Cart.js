import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";

export default function Cart() {
  let navigate = useNavigate();
  let [noOfRooms, setNoOfRooms] = useState(null);
  let [noOfDays, setNoOfDays] = useState(null);
  let [Propertyprice, setPropertyPrice] = useState(null);
  let [ownerMail, setOwnermail] = useState(null);
  let [cartPhoto, setCartPhoto] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  let { room_id } = useParams();
  let [userData, setUserData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/show-data-at-checkout${room_id}`)
      .then((response) => {
        setUserData(response.data);
        response.data.map((value, index) => {
          let {
            no_of_days,
            no_of_rooms,
            photo,
            price,
            property_name,
            owner_email,
          } = value;
          setNoOfRooms(no_of_rooms);
          setNoOfDays(no_of_days);
          setCartPhoto(photo);
          setPropertyPrice(price);
          setOwnermail(owner_email);
          setValue("property_name", property_name);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [room_id, setValue]);

  //Calculation of Price w.r.t Dates
  function calculateDateAndPrice() {
    var { checkin_date } = getValues();
    var { checkout_date } = getValues();
    var checkinday = new Date(checkin_date).getTime();
    var checkoutday = new Date(checkout_date).getTime();
    var timediff = checkoutday - checkinday;
    var daysbooked = timediff / (1000 * 3600 * 24);
    userData.map((value, index) => {
      let { price } = value;
      setPropertyPrice((price / noOfDays) * daysbooked * noOfRooms);
    });
  }

  //Calculation of Price w.r.t Rooms Increasing
  function addRoom() {
    var { checkin_date } = getValues();
    var { checkout_date } = getValues();
    var checkinday = new Date(checkin_date).getTime();
    var checkoutday = new Date(checkout_date).getTime();
    var timediff = checkoutday - checkinday;
    var daysbooked = timediff / (1000 * 3600 * 24);
    userData.map((value, index) => {
      let { price } = value;
      setPropertyPrice((price / noOfDays) * daysbooked * (noOfRooms + 1));
    });
  }

  // Calculation of Price w.r.t Rooms Decreasing
  function removeRoom() {
    var { checkin_date } = getValues();
    var { checkout_date } = getValues();
    var checkinday = new Date(checkin_date).getTime();
    var checkoutday = new Date(checkout_date).getTime();
    var timediff = checkoutday - checkinday;
    var daysbooked = timediff / (1000 * 3600 * 24);
    userData.map((value, index) => {
      let { price } = value;
      let rooms = noOfRooms - 1 >= 1 ? noOfRooms - 1 : noOfRooms;
      setPropertyPrice((price / noOfDays) * daysbooked * rooms);
    });
  }

  // Sending Data to check-out page
  function onSubmit(data) {
    let { property_name, checkin_date, checkout_date } = data;
    navigate("/checkout", {
      state: {
        property_name,
        checkin_date,
        checkout_date,
        no_of_rooms: noOfRooms,
        price: Propertyprice,
        owner_email: ownerMail,
      },
    });
  }

  return (
    <>
      <section className="banner_inner" id="home">
        <div className="banner_inner_overlay"></div>
      </section>
      <section className="contact py-5">
        <div className="container py-lg-5 py-sm-4">
          <h2 className="heading text-capitalize text-center mb-lg-5 mb-4">
            {" "}
            Book Your Room
          </h2>
          <div className="contact-grids">
            <div className="row">
              <div className="col-lg-8 contact-left-form">
                <form onSubmit={handleSubmit(onSubmit)} className="row">
                  <div className="col-sm-6 form-group contact-forms">
                    <label
                      className="label"
                      htmlFor="property_name"
                      style={{ fontWeight: "500", fontSize: "19px" }}
                    >
                      Property Name
                    </label>
                    <input
                      disabled
                      {...register("property_name")}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-sm-6 form-group contact-forms">
                    <label
                      className="label"
                      htmlFor="price"
                      style={{ fontWeight: "500", fontSize: "19px" }}
                    >
                      Price
                    </label>
                    <input
                      value={Propertyprice}
                      disabled
                      type="text"
                      className="form-control"
                      placeholder="Price"
                    />
                  </div>
                  <div className="col-sm-6 form-group contact-forms">
                    <label
                      className="label"
                      htmlFor="check_in"
                      style={{ fontWeight: "500", fontSize: "19px" }}
                    >
                      Check In
                    </label>
                    <input
                      {...register("checkin_date", {
                        required: "You must specify Checkin Date",
                      })}
                      type="date"
                      className="form-control"
                      placeholder="Check In"
                    />
                    <ErrorMessage
                      name="checkin_date"
                      errors={errors}
                      render={({ message }) => (
                        <p className="text-danger">{message}</p>
                      )}
                    />
                  </div>
                  <div className="col-sm-6 form-group contact-forms">
                    <label
                      className="label"
                      htmlFor="check_out"
                      style={{ fontWeight: "500", fontSize: "19px" }}
                    >
                      Check Out
                    </label>
                    <input
                      onInput={() => {
                        setTimeout(calculateDateAndPrice, 2000);
                      }}
                      {...register("checkout_date", {
                        required: "You must specify Checkout Date",
                        validate: (value) => {
                          let { checkin_date } = getValues();
                          return (
                            new Date(checkin_date) < new Date(value) ||
                            "It must be greater than Check In Date"
                          );
                        },
                      })}
                      type="date"
                      className="form-control"
                      placeholder="Check Out"
                    />
                    <ErrorMessage
                      name="checkout_date"
                      errors={errors}
                      render={({ message }) => (
                        <p className="text-danger">{message}</p>
                      )}
                    />
                  </div>
                  {/*Cart Logic*/}
                  <div className="container col-md-12">
                    <div className="d-flex justify-content-center row">
                      <div className="col-md-12">
                        <div
                          style={{ backgroundColor: "#f0f0f0" }}
                          className=" mb-4 d-flex flex-row justify-content-between align-items-center p-2 mt-2 px-3 rounded"
                        >
                          <div className="mr-1">
                            <img
                              className="rounded"
                              src={cartPhoto}
                              alt={""}
                              width="70"
                            />
                          </div>
                          <div className="d-flex flex-column align-items-center product-details">
                            <span
                              className="mx-5"
                              style={{
                                fontSize: "23px",
                                fontFamily: "verdana",
                                fontWeight: "700",
                              }}
                            >
                              No Of Rooms
                            </span>
                          </div>

                          <div className="d-flex flex-row align-items-center qty">
                            <p
                              onClick={() => {
                                noOfRooms > 1
                                  ? setNoOfRooms(noOfRooms - 1)
                                  : setNoOfRooms(noOfRooms);
                                removeRoom();
                              }}
                              style={{ backgroundColor: "#d73a44" }}
                              className={"btn"}
                            >
                              <i className="fa fa-minus text-light"></i>
                            </p>
                            <h5 className="text-grey mr-1 ml-1">{noOfRooms}</h5>
                            <p
                              onClick={() => {
                                setNoOfRooms(noOfRooms + 1);
                                addRoom();
                              }}
                              style={{ backgroundColor: "#57a5ef" }}
                              className={"btn"}
                            >
                              <i className="fa fa-plus text-light"></i>
                            </p>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 booking-button">
                    <button className="btn btn-block sent-butnn">
                      Book Now
                    </button>
                  </div>
                </form>
              </div>
              {userData.map((value, index) => {
                let { address, amenities, photo, price, property_name } = value;
                return (
                  <>
                    <div className="col-lg-4 contact-right pl-lg-5">
                      <div className="image-tour position-relative">
                        <img
                          src={photo}
                          alt="Loading.."
                          width={"500px"}
                          height={"300px"}
                        />
                        <p>
                          <span className="fa fa-tags"></span>{" "}
                          <span>&#8377;{price}</span>
                        </p>
                      </div>

                      <h3 style={{ fontSize: "30px" }} className={"mt-2"}>
                        {property_name}
                      </h3>
                      <h5 className={"my-2"} style={{ fontWeight: 500 }}>
                        <span className="fa fa-map-marker mr-2"></span>
                        {address}
                      </h5>
                      <p className="text-dark">
                        <h4 style={{ fontWeight: "bold", fontSize: "25px" }}>
                          Amenities:-
                        </h4>
                        <span style={{ fontWeight: "600" }}>
                          {amenities.toUpperCase()}
                        </span>
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
