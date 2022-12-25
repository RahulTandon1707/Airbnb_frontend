import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import SearchFilter from "react-filter-search";

export default function Packages() {
    const [searchInput, setSearchInput] = useState("");
    let [userData, setUserData] = useState([]);
    const [noOfData, setNoOfData] = useState(13);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:4000/user/show-properties-to-users").then((response) => {
            setUserData(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function handleViewMore() {
        setNoOfData(noOfData + noOfData);
    }

    return (
        <>
            <section className="banner_inner" id="home">
                <div className="banner_inner_overlay">
                </div>
            </section>
            <section className="packages pt-5">
                <div className="container py-lg-4 py-sm-3">
                    <h2 className="heading text-capitalize text-center" id={"ourpackages"}>Find your dream hotels</h2>
                    <p className="text mt-2 mb-5 text-center">Discover and book various categories including hotels and
                        rental homes/apartments and feel like your own home.</p>
                    <div className="container">
                        <br/>
                        <div className="row">
                            <div className="col-9 mx-auto">
                                <input
                                    style={{padding: "0.9rem"}}
                                    className="form-control"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type="text"
                                    placeholder="Search Hotels ..."
                                />
                            </div>
                        </div>

                        <SearchFilter
                            value={searchInput}
                            data={userData}
                            renderResults={(results) => (
                                <div className="mt-5">
                                    <div className="row">
                                        {
                                            results.slice(0, noOfData).map((value, index) => {
                                                let {
                                                    address,
                                                    amenities,
                                                    category_name,
                                                    no_of_days,
                                                    no_of_rooms,
                                                    photo,
                                                    price,
                                                    property_name,
                                                    room_id,
                                                } = value;
                                                return (
                                                    <>
                                                        <div key={index} className="col-lg-4 col-sm-6 mt-5">
                                                            <div className="image-tour position-relative">
                                                                <img src={photo} alt="" height={"300px"}
                                                                     width={"350px"}/>
                                                                <p><span className="fa fa-tags"></span>
                                                                    <span>&#8377;{price}</span></p>
                                                            </div>
                                                            <div className="package-info"
                                                                 style={{height: "20em"}}>
                                                                <h5 className="mt-1">{property_name} <span
                                                                    style={{marginLeft: "70px"}}>({category_name})</span>
                                                                </h5>
                                                                <h6 className={"my-2"}
                                                                    style={{fontWeight: 500}}><span
                                                                    className="fa fa-map-marker mr-1"></span>{address}
                                                                </h6>
                                                                <span className="text-dark"><span
                                                                    style={{fontWeight: "bold"}}>Amenities:-</span><br/>
                                                                    <span
                                                                        style={{fontWeight: "600"}}>{amenities}</span>
                                                                </span>
                                                                <p className="text-dark mt-3"
                                                                   style={{fontWeight: "bold"}}> &#8377;{price} for {no_of_rooms} rooms</p>
                                                                <ul className="listing mt-3">
                                                                    <li><span
                                                                        className="fa fa-clock-o mr-2"></span><span
                                                                        style={{fontWeight: "bold"}}>Duration</span>
                                                                        : <span>{no_of_days} days</span>
                                                                    </li>
                                                                </ul>
                                                                <div className={"text-right mt-2"}>
                                                                    <button
                                                                        onClick={() => navigate(`/cart/${room_id}`)}
                                                                        className={"btn-primary"}
                                                                        style={{
                                                                            padding: "11px",
                                                                            borderRadius: "8px"
                                                                        }}>Book Now
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        noOfData > userData.length ? "" : <>
                                            <div className="row col-md-12 mt-4" style={{justifyContent: "center"}}>
                                                <button disabled={noOfData > userData.length}
                                                        onClick={() => handleViewMore()}
                                                        className="col-md-6 btn btn-outline-primary font-weight-bold"
                                                        style={{padding: "15px 9px"}}>View More..
                                                </button>
                                            </div>
                                        </>
                                    }
                                </div>
                            )}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}