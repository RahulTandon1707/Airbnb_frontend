import {HashLink as Link} from "react-router-hash-link";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function UserHome() {
    let navigate = useNavigate();
    let [userData, setUserData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4000/user/show-properties-to-users-limited").then((response) => {
            setUserData(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <>
            <section className="banner_w3lspvt" id="home">
                <div className="csslider infinity" id="slider1">
                    <input type="radio" name="slides" checked="checked" id="slides_1"/>
                    <input type="radio" name="slides" id="slides_2"/>
                    <input type="radio" name="slides" id="slides_3"/>
                    <input type="radio" name="slides" id="slides_4"/>
                    <ul>
                        <li>
                            <div className="banner-top">
                                <div className="overlay">
                                    <div className="container">
                                        <div className="w3layouts-banner-info">
                                            <h3 className="text-wh mb-5">Never let your memories be greater than your
                                                dreams.</h3>
                                            <div className="buttons mt-5">
                                                <Link to={"about#about-page"} className="btn mr-2">About Us</Link>
                                                <Link to={"packages#ourpackages"} className="btn">Book a Tour</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="banner-top1">
                                <div className="overlay">
                                    <div className="container">
                                        <div className="w3layouts-banner-info">
                                            <h3 className="text-wh mb-5">It is better to travel than to arrive. Let's Be
                                                Adventurers.</h3>
                                            <div className="buttons mt-5">
                                                <Link to={"about#about-page"} className="btn mr-2">About Us</Link>
                                                <Link to={"packages#ourpackages"} className="btn">Book a Tour</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="banner-top2">
                                <div className="overlay">
                                    <div className="container">
                                        <div className="w3layouts-banner-info">
                                            <h3 className="text-wh">Never let your memories be greater than your
                                                dreams.</h3>
                                            <h4 className="text-wh">tristique senectus et netus et malesuada</h4>
                                            <div className="buttons mt-4">
                                                <a href="about.html" className="btn mr-2">About Us</a>
                                                <a href="booking.html" className="btn">Book a Tour</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="banner-top3">
                                <div className="overlay1">
                                    <div className="container">
                                        <div className="w3layouts-banner-info">
                                            <h3 className="text-wh">It is better to travel than to arrive. Let's Be
                                                Adventurers.</h3>
                                            <h4 className="text-wh">tristique senectus et netus et malesuada</h4>
                                            <div className="buttons mt-4">
                                                <a href="about.html" className="btn mr-2">About Us</a>
                                                <a href="booking.html" className="btn">Book a Tour</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="arrows">
                        <label htmlFor="slides_1"></label>
                        <label htmlFor="slides_2"></label>
                        <label htmlFor="slides_3"></label>
                        <label htmlFor="slides_4"></label>
                    </div>
                </div>
            </section>
            <section className="about py-5">
                <div className="container py-lg-5 py-sm-4">
                    <div className="row">
                        <div className="col-lg-6 about-left">
                            <h3 className="mt-lg-3">Let's take you to one of the most famous places in India , <strong>Golden
                                Temple!</strong></h3>
                            <p className="mt-4">The Golden Temple (also known as the Harmandir Sahib,or the Darbār
                                Sahib), is a gurdwara located in the city of Amritsar,
                                Punjab, India. It is the preeminent spiritual site of Sikhism. It is one of the
                                holiest sites in Sikhism.</p>
                            <p className="mt-3"> The man-made pool on the site of the temple was completed by the fourth
                                Sikh Guru, Guru Ram Das, in 1577.In 1604, Guru Arjan placed a copy of the Adi
                                Granth in Harmandir Sahib.</p>
                        </div>
                        <div className="col-lg-6 about-right text-lg-right mt-lg-0 mt-5">
                            <img src="images/goldentemple.jpeg" alt="" className="img-fluid abt-image"/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="book py-5">
                <div className="container py-lg-5 py-sm-3">
                    <h2 className="heading text-capitalize text-center"> How To Plan Your Trip</h2>
                    <div className="row mt-5 text-center">
                        <div className="col-lg-4 col-sm-12">
                            <div className="grid-info">
                                <div className="icon" style={{backgroundColor: "white"}}>
                                    <span className="fa fa-map-signs"></span>
                                </div>
                                <h4>Pick Destination</h4>
                                <p className="mt-3">Select any destination of your choice in India to travel and we'll
                                    arrange that trip for you.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 mt-sm-0 mt-5">
                            <div className="grid-info">
                                <div className="icon" style={{backgroundColor: "white"}}>
                                    <span className="fa fa-calendar"></span>
                                </div>
                                <h4>Select Date</h4>
                                <p className="mt-3">Choose the dates when you want to travel and book hotels and resorts
                                    accordingly.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 mt-lg-0 mt-5">
                            <div className="grid-info">
                                <div className="icon" style={{backgroundColor: "white"}}>
                                    <span className="fa fa-gift"></span>
                                </div>
                                <h4>Enjoy the Trip</h4>
                                <p className="mt-3">Finally go to your favourite destination on your chosen dates and
                                    enjoy your trip without any worries.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="packages py-5">
                <div className="container py-lg-4 py-sm-3">
                    <h3 className="heading text-capitalize text-center">Find your dream hotels</h3>
                    <p className="text mt-2 mb-5 text-center">Discover and book various categories including hotels and
                        rental homes/apartments and feel like your own home.</p>
                    <div className="row">
                        {
                            userData.map((value, index) => {
                                let {
                                    address,
                                    amenities,
                                    category_name,
                                    no_of_days,
                                    no_of_rooms,
                                    photo,
                                    price,
                                    property_name,
                                    room_id
                                } = value;
                                return (
                                    <>
                                        <div key={index} className="col-lg-4 col-sm-6 mt-5">
                                            <div className="image-tour position-relative">
                                                <img src={photo} alt="" height={"300px"} width={"350px"}/>
                                                <p><span className="fa fa-tags"></span> <span>{price}</span></p>
                                            </div>
                                            <div className="package-info">
                                                <h5 className="mt-1">{property_name} <span
                                                    style={{marginLeft: "80px"}}>({category_name})</span></h5>
                                                <h6 className={"my-2"} style={{fontWeight: 500}}><span
                                                    className="fa fa-map-marker mr-2"></span>{address}</h6>
                                                <p className="text-dark"><span
                                                    style={{fontWeight: "bold"}}>Amenities:-</span><br/> <span
                                                    style={{fontWeight: "600"}}>{amenities}</span></p>
                                                <p className="text-dark mt-3"
                                                   style={{fontWeight: "bold"}}> {price} for {no_of_rooms} rooms</p>
                                                <ul className="listing mt-3">
                                                    <li><span className="fa fa-clock-o mr-2"></span><span
                                                        style={{fontWeight: "bold"}}>Duration</span>
                                                        : <span>{no_of_days} days</span>
                                                    </li>
                                                </ul>
                                                <div className={"text-right mt-2"}>
                                                    <button onClick={() => navigate(`cart/${room_id}`)}
                                                            className={"btn-primary"}
                                                            style={{padding: "11px", borderRadius: "8px"}}>Book Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="view-package text-center mt-4">
                        <Link to={"packages#ourpackages"}>View All Properties</Link>
                    </div>
                </div>
            </section>

            <section className="text-content">
                <div className="overlay-inner py-5">
                    <div className="container py-md-3">
                        <div className="test-info">
                            <h4 className="tittle">Enjoy The Trip</h4>
                            <p className="mt-3">Select any destination of your choice in India to travel and we'll do planning for you. Choose the dates when you want to travel and book properties
                                accordingly. Finally go to your destination on your chosen dates and
                                enjoy your trip without any worries.</p>
                            <div className="text-left mt-4">
                                <Link to={"packages#ourpackages"}>Book Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}