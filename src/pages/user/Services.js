import {HashLink as Link} from "react-router-hash-link";

export default function Services() {
    return (
        <>
            <section className="banner_inner" id="home">
                <div className="banner_inner_overlay">
                </div>
            </section>
            <section className="services pt-5">
                <div className="container py-lg-5 py-sm-3">
                    <h2 className="heading text-capitalize text-center mb-lg-5 mb-4" id={"ourservices"}> Our
                        Services</h2>
                    <div className="row">
                        <div className="col-lg-3 main-title-text">
                            <h4 className="my-lg-4 mb-4">The journey of a thousand miles begins with a single step.</h4>
                            <img src="images/goldentemple.jpeg" alt="" className="img-fluid"/>
                        </div>
                        <div className="col-lg-9 mt-lg-0 mt-5">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-6 service-grid-wthree text-center mb-5">
                                    <div className="ser-fashion-grid">
                                        <div className="about-icon mb-md-4 mb-3">
                                            <span className="fa fa-building" aria-hidden="true"></span>
                                        </div>
                                        <div className="ser-sevice-grid">
                                            <h4 className="pb-3">Accomodation</h4>
                                            <p>We provide one of best accomodation hotels and other rented
                                                properties.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 service-grid-wthree text-center mb-5">
                                    <div className="ser-fashion-grid">
                                        <div className="about-icon mb-md-4 mb-3">
                                            <span className="fa fa-free-code-camp" aria-hidden="true"></span>
                                        </div>
                                        <div className="ser-sevice-grid">
                                            <h4 className="pb-3">Winter Tours</h4>
                                            <p>We provide special winter tour packages of hill stations in India to our
                                                clients.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 service-grid-wthree text-center mb-5">
                                    <div className="ser-fashion-grid">
                                        <div className="about-icon mb-md-4 mb-3">
                                            <span className="fa fa-users" aria-hidden="true"></span>
                                        </div>
                                        <div className="ser-sevice-grid">
                                            <h4 className="pb-3">Exp Agents</h4>
                                            <p>Talk to our expert agents by contact us queries to know about our
                                                packages.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 service-grid-wthree text-center mb-5">
                                    <div className="ser-fashion-grid">
                                        <div className="about-icon mb-md-4 mb-3">
                                            <span className="fa fa-money" aria-hidden="true"></span>
                                        </div>
                                        <div className="ser-sevice-grid">
                                            <h4 className="pb-3">Low Prices</h4>
                                            <p>Visit any destination of India in very reasonable prices and enjoy your
                                                trip.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 service-grid-wthree text-center mb-5">
                                    <div className="ser-fashion-grid">
                                        <div className="about-icon mb-md-4 mb-3">
                                            <span className="fa fa-binoculars" aria-hidden="true"></span>
                                        </div>
                                        <div className="ser-sevice-grid">
                                            <h4 className="pb-3">Easy Booking</h4>
                                            <p>Just find your destination and book property there.As Simple as that.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 service-grid-wthree text-center mb-5">
                                    <div className="ser-fashion-grid">
                                        <div className="about-icon mb-md-4 mb-3">
                                            <span className="fa fa-camera" aria-hidden="true"></span>
                                        </div>
                                        <div className="ser-sevice-grid">
                                            <h4 className="pb-3">Best Packages</h4>
                                            <p>We offer you the best packages in which you can visit any
                                                destination.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-content">
                <div className="overlay-inner py-5">
                    <div className="container py-md-3">
                        <div className="test-info">
                            <h4 className="tittle">Enjoy The Trip</h4>
                            <p className="mt-3">Select any destination of your choice in India to travel and we'll do
                                planning for you. Choose the dates when you want to travel and book properties
                                accordingly. Finally go to your destination on your chosen dates and
                                enjoy your trip without any worries.</p>
                            <div className="text-left mt-4">
                                <Link to={"/packages#ourpackages"}>Book Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="trav-grids py-5" id="desti">
                <div className="container py-xl-5 py-lg-3">
                    <h3 className="heading text-capitalize text-center mb-lg-5 mb-4">Popular Places</h3>
                    <div className="row">
                        <div className="col-lg-6 mt-4">
                            <div className="grids-tem-one">
                                <div className="row">
                                    <div className="col-sm-5 grids-img-left">
                                        <img src="images/mussorieservice.jpg" style={{height: "220px"}} alt=""
                                             className="img-fluid"/>
                                    </div>
                                    <div className="col-sm-7 right-cont">
                                        <h4 className="mb-2 let mt-sm-0 mt-2 tm-clr">Mussorie</h4>
                                        <ul className="d-flex">
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                        </ul>
                                        <p className="mt-3">Mussoorie, also known as Queen of the Hills, is among the
                                            most popular and one of the must visit hill stations of India.</p>
                                        <p className="duration mt-2"><span
                                            className="fa fa-clock-o mr-2"></span><strong>Recommended
                                            Duration</strong> : 5 Days</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                            <div className="grids-tem-one">
                                <div className="row">
                                    <div className="col-sm-5 grids-img-left">
                                        <img src="images/shimlaservice.jpg" style={{height: "220px"}} alt=""
                                             className="img-fluid"/>
                                    </div>
                                    <div className="col-sm-7 right-cont">
                                        <h4 className="mb-2 let mt-sm-0 mt-2 tm-clr">Shimla</h4>
                                        <ul className="d-flex">
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                        </ul>
                                        <p className="mt-3">One of the most stunning hill resorts, Shimla is one of the
                                            most popular must visit hill stations in northern India.</p>
                                        <p className="duration mt-2"><span
                                            className="fa fa-clock-o mr-2"></span><strong>Recommended
                                            Duration</strong> : 4 Days</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-lg-3">
                        <div className="col-lg-6 mt-4">
                            <div className="grids-tem-one">
                                <div className="row">
                                    <div className="col-sm-5 grids-img-left">
                                        <img src="images/goaservice.jpeg" style={{height: "220px"}} alt=""
                                             className="img-fluid"/>
                                    </div>
                                    <div className="col-sm-7 right-cont">
                                        <h4 className="mb-2 let mt-sm-0 mt-2 tm-clr">Goa</h4>
                                        <ul className="d-flex">
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                        </ul>
                                        <p className="mt-3">No secret that Goa is favourite beach destination visiting
                                            Goa during summer gives quite special
                                            experience.</p>
                                        <p className="duration mt-2"><span
                                            className="fa fa-clock-o mr-2"></span><strong>Recommended
                                            Duration</strong> : 5 Days</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                            <div className="grids-tem-one">
                                <div className="row">
                                    <div className="col-sm-5 grids-img-left">
                                        <img src="images/j&kservice.jpeg" style={{height: "220px"}} alt=""
                                             className="img-fluid"/>
                                    </div>
                                    <div className="col-sm-7 right-cont">
                                        <h4 className="mb-2 mt-sm-0 mt-2 let tm-clr">Jammu & Kashmir</h4>
                                        <ul className="d-flex">
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                            <li><span className="fa fa-star"></span></li>
                                        </ul>
                                        <p className="mt-3">Kashmir,'Heaven on earth' due to its breathtaking landscapes
                                            is where whole world wants to visit.</p>
                                        <p className="duration mt-2"><span
                                            className="fa fa-clock-o mr-2"></span><strong>Recommended
                                            Duration</strong> : 7 Days</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}