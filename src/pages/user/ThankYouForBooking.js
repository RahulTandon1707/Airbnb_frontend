import {FaCheckCircle} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";

export default function ThankYouForBooking() {
    let location = useLocation();
    let navigate = useNavigate();
    let property_name = location.state.property_name;
    let user_email = location.state.user_email;
    return (
        <>
            <section className="banner_inner" id="home">
                <div className="banner_inner_overlay">
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className={"mt-5"} style={{margin: "auto"}}>
                        <FaCheckCircle size={"5rem"} color={"green"}/>
                    </div>
                </div>
                <div style={{marginTop: "-30px"}}>
                    <h2 className={"text-center"}>THANK YOU!</h2>
                </div>
                <div>
                    <h3 className={"text-center mt-2"}>Your Booking with {property_name} is Successful</h3>
                </div>
                <div>
                    <h4 className={"text-center mt-3"}>For further details,check your email {user_email}</h4>
                </div>
                <div className="row">
                    <div style={{margin: "auto"}}>
                        <button onClick={() => {navigate("/mybookings")}} className={"btn btn-success mt-3"}
                                style={{padding: "13px 9px", marginRight: "20px"}}>Check My Bookings
                        </button>
                        <button onClick={() => {navigate("/")}} className={"btn btn-primary mt-3"} style={{padding: "13px 9px"}}>Go to Home Page
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}