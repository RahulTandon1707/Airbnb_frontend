import {NavLink, Outlet} from "react-router-dom";
import {
    FaEdit,
    FaHome,
    FaUser,
    FaSignOutAlt,
    FaInfoCircle,
    FaServicestack,
    FaPhoneAlt,
    FaSignInAlt, FaBook
} from "react-icons/fa";
import {BiPackage} from "react-icons/bi";
import axios from "axios";
import {HashLink as Link} from "react-router-hash-link";
import {useEffect, useState} from "react";

export default function UserLayout() {
    let [userSession, setUserSession] = useState({});

    function logOutUser() {
        axios.post("http://localhost:4000/user/logoutuser").then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        axios.get("http://localhost:4000/user/send-user-session").then((response) => {
            setUserSession(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <>
            {
                Object.keys(userSession).length > 0 &&
                <header>
                    <div className="container">
                        <nav className="py-md-4 py-3 d-lg-flex">
                            <div id="logo">
                                <h1 className="mt-md-0 mt-2"><NavLink to={"/"}><span
                                    className="fa fa-map-signs"></span> Voyage Ventures</NavLink></h1>
                            </div>
                            <label htmlFor="drop" className="toggle"><span className="fa fa-bars"></span></label>
                            <input type="checkbox" id="drop"/>
                            <ul className="menu margin-auto mt-1">
                                <li className="active dd-hover"><NavLink
                                    to="/"><FaHome size={"1.2rem"}/>Home</NavLink></li>
                                <li className="dd-hover"><Link to={"/about#about-page"}> <FaInfoCircle
                                    size={"1.1rem"}/> About Us</Link>
                                </li>
                                <li className="dd-hover"><Link to={"services#ourservices"}><FaServicestack
                                    size={"1.1rem"}/>Services</Link></li>
                                <li className="dd-hover"><Link to={"packages#ourpackages"}><BiPackage
                                    size={"1.1rem"}/>Packages</Link>
                                </li>
                                <li className="dd-hover"><Link to={"/contact#contact-page"}><FaPhoneAlt
                                    size={"1.1rem"}/>Contact</Link>
                                </li>
                                <li className="dropdown text-light font-verdana dd-hover">
                                    <FaUser size={"1.1rem"}/>
                                    <button type="button" className="btn-transparent cursor-pointer dropdown-toggle"
                                            data-bs-toggle="dropdown">{userSession.user_name}
                                    </button>
                                    <ul className="dd-menu bg-blur font-verdana">
                                        <Link className="bg-custom dropdown-item"
                                              to="/user-profile#user-profile">My
                                            Profile<FaUser
                                                size={"1.2rem"}/></Link>
                                        <NavLink className="bg-custom dropdown-item" to="/mybookings">My Bookings<FaBook
                                            className={"mt-1"} size={"1.2rem"}/></NavLink>
                                        <NavLink className="bg-custom dropdown-item" to="/change-user-password">Change
                                            Password<FaEdit className={"mt-1"} size={"1.2rem"}/></NavLink>
                                        <NavLink role={"button"} onClick={logOutUser}
                                                 className="bg-custom dropdown-item"
                                                 to="/user-login">Log
                                            Out<FaSignOutAlt className={"mt-1"} size={"1.2rem"}/></NavLink>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            }
            {
                Object.keys(userSession).length === 0 &&
                <header>
                    <div className="container">
                        <nav className="py-md-4 py-3 d-lg-flex">
                            <div id="logo">
                                <h1 className="mt-md-0 mt-2"><NavLink to={"/"}><span
                                    className="fa fa-map-signs"></span> Voyage Ventures</NavLink></h1>
                            </div>
                            <label htmlFor="drop" className="toggle"><span className="fa fa-bars"></span></label>
                            <input type="checkbox" id="drop"/>
                            <ul className="menu margin-auto mt-1">
                                <li className="active dd-hover"><NavLink
                                    to="/"><FaHome size={"1.2rem"}/>Home</NavLink></li>
                                <li className="dd-hover"><Link to={"/about#about-page"}> <FaInfoCircle
                                    size={"1.1rem"}/> About Us</Link>
                                </li>
                                <li className="dd-hover"><Link to={"services#ourservices"}><FaServicestack
                                    size={"1.1rem"}/>Services</Link></li>
                                <li className="dd-hover"><Link to={"packages#ourpackages"}><BiPackage
                                    size={"1.1rem"}/>Packages</Link>
                                </li>
                                <li className="dd-hover"><Link to={"/contact#contact-page"}><FaPhoneAlt
                                    size={"1.1rem"}/>Contact</Link>
                                </li>
                                <li className="dd-hover"><NavLink to={"/user-login"}><FaSignInAlt size={"1.1rem"}/>Signin</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            }
            <div>
                <Outlet/>
            </div>
            <footer className={"mt-3"}>
                <section className="footer footer_w3layouts_section_1its py-5">
                    <div className="container py-lg-4 py-3">
                        <div className="row footer-top">
                            <div className="col-lg-4 col-sm-4">
                                <div className="footer-title">
                                    <h3>Address</h3>
                                </div>
                                <div className="footer-text">
                                    <p>Location : H no 613/1, Near Kesar Da Dhaba, Chowk Passian, Amritsar</p>
                                    <p>Phone : +91 9876466448</p>
                                    <p>Email : <NavLink to="mailto:rtandon139@gmail.com">rtandon139@gmail.com</NavLink>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-4 footer-grid_section mt-sm-0 mt-4">
                                <div className="footer-title">
                                    <h3>About Us</h3>
                                </div>
                                <div className="footer-text">
                                    <p>We work to make your stays dreamy and ensure you take you around the best parts
                                        of India with most comfortable stay ever!!! </p>
                                    <p><h4 style={{color: "white"}}>Work with us?</h4><NavLink
                                        to={"/owner/owner-signup"}>Add your property</NavLink></p>
                                </div>
                                <ul className="social_section_1info">
                                    <li className="mb-2 facebook"><Link to={"/"}><span
                                        className="fa fa-facebook"></span></Link></li>
                                    <li className="mb-2 twitter"><Link to={"/"}><span className="fa fa-twitter"></span></Link>
                                    </li>
                                    <li className="google"><Link to={"/"}><span
                                        className="fa fa-google-plus"></span></Link>
                                    </li>
                                    <li className="linkedin"><Link to={"/"}><span
                                        className="fa fa-linkedin"></span></Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-4 col-sm-4 mt-lg-0 mt-4 footer-grid_section_1its_w3">
                                <div className="footer-title">
                                    <h3>Travel Contract</h3>
                                </div>
                                <div className="row" style={{color: "#707070"}}>
                                    <ul className="col-6 links">
                                        <li className={"hover-white"}>Jammu & Kashmir</li>
                                        <li className={"hover-white"}>Kerala</li>
                                        <li className={"hover-white"}>Amritsar</li>
                                        <li className={"hover-white"}>Goa</li>
                                        <li className={"hover-white"}>Sikkim</li>
                                    </ul>
                                    <ul className="col-6 links">
                                        <li className={"hover-white"}>Dehradun</li>
                                        <li className={"hover-white"}>Delhi</li>
                                        <li className={"hover-white"}>Chandigarh</li>
                                        <li className={"hover-white"}>Assam</li>
                                        <li className={"hover-white"}>Shimla</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        </>
    )
}