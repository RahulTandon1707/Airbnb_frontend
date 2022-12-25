import {NavLink, Outlet} from "react-router-dom";
import {FaEdit, FaHome} from "react-icons/fa";
import {HiUserAdd} from "react-icons/hi";
import {AiOutlineFolderView} from "react-icons/ai";
import {RiLogoutBoxLine} from "react-icons/ri";
import axios from "axios";
import {HashLink as Link} from "react-router-hash-link";

export default function OwnerLayout() {
    function logOutOwner() {
        axios.post("http://localhost:4000/owner/logoutowner").then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <header>
                <div className="container">
                    <nav className="py-md-4 py-3 d-lg-flex">
                        <div id="logo">
                            <h1 className="mt-md-0 mt-2"><NavLink to="/owner"><span
                                className="fa fa-map-signs"></span> Voyage Ventures </NavLink></h1>
                        </div>
                        <label htmlFor="drop" className="toggle font-verdana"><span
                            className="fa fa-bars"></span></label>
                        <input type="checkbox" id="drop"/>
                        <ul className="menu ml-auto mt-1">
                            <li className="active dd-hover font-verdana"><NavLink to="/owner">Home<FaHome
                                size={"1.1rem"}/></NavLink></li>
                            <li className="dropdown font-verdana dd-hover">
                                <button type="button" className="btn-transparent cursor-pointer dropdown-toggle"
                                        data-bs-toggle="dropdown">Manage Property <FaEdit size={"1.1rem"}/>
                                </button>
                                <ul className="dd-menu bg-blur font-verdana">
                                    <NavLink className="bg-custom" to="/owner/add-property">Add Property<HiUserAdd
                                        size={"1.1rem"}/></NavLink>
                                    <NavLink className="bg-custom" to="/owner/view-property">View
                                        Property <AiOutlineFolderView size={"20px"}/></NavLink>
                                </ul>
                            </li>
                            <li className="dd-hover font-verdana"><NavLink to="/owner/change-owner-password">Change
                                Password <FaEdit fontSize={"1.1rem"}/></NavLink></li>
                            <li className="dd-hover font-verdana"><NavLink
                                to="/owner/owner-login" role={"button"} onClick={logOutOwner}>Logout<RiLogoutBoxLine
                                size={"1.1rem"}/></NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className={"bg-admin"}>
                <div className="height-50-blur">
                    <div className="container">
                        <div className="w3layouts-banner-info">
                            <h3 className="text-wh">It is better to travel than to arrive. Let's Be Adventurers.</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"mt-5"}>
                <Outlet/>
            </div>
            <footer className={"mt-5"}>
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
                                </div>
                                <ul className="social_section_1info">
                                    <li className="mb-2 facebook"><Link to={"/owner"}><span
                                        className="fa fa-facebook"></span></Link></li>
                                    <li className="mb-2 twitter"><Link to={"/owner"}><span
                                        className="fa fa-twitter"></span></Link>
                                    </li>
                                    <li className="google"><Link to={"/owner"}><span
                                        className="fa fa-google-plus"></span></Link>
                                    </li>
                                    <li className="linkedin"><Link to={"/owner"}><span
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