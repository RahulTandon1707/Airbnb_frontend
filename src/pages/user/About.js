export default function About() {
    return (
        <>
            <section className="banner_inner" id="home">
                <div className="banner_inner_overlay">
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

            <section className="choose" id="choose">
                <div className="overlay-all py-5">
                    <div className="container py-lg-5 py-sm-4">
                        <h2 id={"about-page"} className="heading text-capitalize text-center mb-lg-5 mb-4"> Why Choose
                            Us</h2>
                        <div className="edu-exp-grids">
                            <div className="tab-main">
                                <input id="tab1" type="radio" name="tabs" className="w3pvt-sm" checked/>
                                <label htmlFor="tab1">We Offer</label>
                                <input id="tab2" type="radio" className="w3pvt-sm" name="tabs"/>
                                <label htmlFor="tab2">We provide</label>
                                <section id="content1">
                                    <div className="row text-center">
                                        <div className="col-lg-4 col-md-6 inner-w3pvt-wrap">
                                            <div className="inner-sec-grid">
                                                <span className="fa fa-gift"></span>
                                                <h4 className="mt-md-4 mt-2">Winter Tours</h4>
                                                <p className="mt-3">We provide special winter tour packages of hill
                                                    stations in India to our
                                                    clients.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 inner-w3pvt-wrap">
                                            <div className="inner-sec-grid">
                                                <span className="fa fa-gift"></span>
                                                <h4 className="mt-md-4 mt-2">Accomodation</h4>
                                                <p className="mt-3">We provide one of best accomodation hotels and other
                                                    rented
                                                    properties.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 inner-w3pvt-wrap">
                                            <div className="inner-sec-grid">
                                                <span className="fa fa-gift"></span>
                                                <h4 className="mt-md-4 mt-2">Low Prices</h4>
                                                <p className="mt-3">Visit any destination of India in very reasonable
                                                    prices and enjoy your trip.</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section id="content2">
                                    <div className="row text-center">
                                        <div className="col-lg-4 col-md-6 inner-w3pvt-wrap">
                                            <div className="inner-sec-grid">
                                                <span className="fa fa-gift"></span>
                                                <h4 className="mt-md-4 mt-2">Easy Bookings</h4>
                                                <p className="mt-3">Just find your dream destination in India and book
                                                    property
                                                    there.As Simple as that.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 inner-w3pvt-wrap">
                                            <div className="inner-sec-grid">
                                                <span className="fa fa-gift"></span>
                                                <h4 className="mt-md-4 mt-2">Exp Agents</h4>
                                                <p className="mt-3">Talk to our expert agents by contact us queries to
                                                    know about our
                                                    packages</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 inner-w3pvt-wrap">
                                            <div className="inner-sec-grid">
                                                <span className="fa fa-gift"></span>
                                                <h4 className="mt-md-4 mt-2">Best Packages</h4>
                                                <p className="mt-3">We offer you one of the best packages in which you
                                                    can
                                                    visit any
                                                    destination.</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="testimonials py-5" id="testi">
                <div className="container py-lg-5 py-md-3">
                    <h3 className="heading text-capitalize text-center mb-lg-5 mb-4"> What Our Customers Say</h3>
                    <div className="row pt-xl-4">
                        <div className="col-md-4 test-grid px-lg-4">
                            <div className="testi-info text-center">
                                <p className="text-li">"It was great pleasure using Voyage Ventures, As all process
                                    being online it was really hassle free experience."</p>
                                <div className="test-img text-center mt-4">
                                    <img src="images/review1.jpg" width={"130"} height={"140px"} alt="user-image"/>
                                </div>
                                <h3 className="mt-md-4 mt-3">Priya Mehta</h3>
                            </div>
                        </div>
                        <div className="col-md-4 test-grid px-lg-4 my-md-0 my-5">
                            <div className="testi-info text-center">
                                <p className="text-li">"I have stayed in V&V properties across India. Staying in their
                                    properties you get to know
                                    the local culture well."</p>
                                <div className="test-img text-center mt-4">
                                    <img src="images/review2.jpg" width={"130"} height={"140px"} alt="user-image"/>
                                </div>
                                <h3 className="mt-md-4 mt-3">Rahul Tandon</h3>
                            </div>
                        </div>
                        <div className="col-md-4 test-grid px-lg-4">
                            <div className="testi-info text-center">
                                <p className="text-li">"Select your destination.Choose properties and Pay. The V&V
                                    booking process is as simple as this."</p>
                                <div className="test-img text-center mt-4">
                                    <img src="images/te3.jpg" width={"130"} height={"140px"} alt="user-image"/>
                                </div>
                                <h3 className="mt-md-4 mt-3">Elizabeth</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}