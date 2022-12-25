import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import formimage from "../../images/owner/addproperty-owner.png";

export default function EditOwnerProperty() {
    let navigate = useNavigate();
    let {room_id} = useParams();
    let [roomid, setRoomid] = useState(null);
    let {register, handleSubmit, formState: {errors}, setValue, reset} = useForm();
    useEffect(() => {
        reset();
        axios.get(`http://localhost:4000/owner/get-owner-property-data-by-email${room_id}`).then((response) => {
            if (response.data === "error") {
                Swal.fire('Error!!', 'Some error occured in fetching details!!', 'error');
            } else {
                response.data.map((value, index) => {
                    let {
                        address,
                        amenities,
                        category_name,
                        contact_no,
                        no_of_days,
                        no_of_rooms,
                        owner_email,
                        photo,
                        price,
                        property_name,
                        room_id,
                        status
                    } = value;
                    setRoomid(room_id);
                    setValue("owner_email", owner_email);
                    setValue("property_name", property_name);
                    setValue("address", address);
                    setValue("photo", photo);
                    setValue("no_of_rooms", no_of_rooms);
                    setValue("no_of_days", no_of_days);
                    setValue("price", price);
                    setValue("contact_no", contact_no);
                    setValue("amenities", amenities);
                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function onSubmit(data) {
        let {
            address,
            amenities,
            category,
            contact_no,
            no_of_days,
            no_of_rooms,
            owner_email,
            photo,
            price,
            property_name
        } = data;
        let formData = new FormData();
        formData.append("address", address);
        formData.append("amenities", amenities);
        formData.append("category", category);
        formData.append("contact_no", contact_no);
        formData.append("no_of_days", no_of_days);
        formData.append("no_of_rooms", no_of_rooms);
        formData.append("owner_email", owner_email);
        formData.append("photo", photo[0]);
        formData.append("price", price);
        formData.append("property_name", property_name);
        formData.append("room_id", roomid);
        axios.post("http://localhost:4000/owner/update-owner-property-details", formData).then((response) => {
            if (response.data === "error") {
                Swal.fire('Error', 'Some technical error occured!!', 'error');
                navigate("/owner/view-property");
            } else if (response.data === "success") {
                Swal.fire('Updated', 'Details have been updated successfully!!', 'success');
                navigate("/owner/view-property");
            } else {
                Swal.fire('Error', 'Some error occured!!', 'error');
                navigate("/owner/view-property");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <div className="text-center mb-3">
                <h3 className={"style-font me-5"}>EDIT DETAILS</h3>
            </div>
            <div className={"container bg-green"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={"row col-md-12"} style={{paddingRight: "-10px"}}>
                        <div className={"col-md-5"}>
                            <img src={formimage} alt="Loading.."
                                 style={{width: "100%", height: "500px", marginTop: "10%"}}/>
                        </div>

                        <div className={"mt-5 row col-md-7"}>
                            <div className="form-group col-md-6">
                                <input disabled {...register('owner_email')} type="text" className="form-control"
                                       placeholder="Enter Owner Name"/>
                            </div>


                            <div className="form-group col-md-6">
                                <input {...register('property_name', {
                                    required: "You must specify your property name",
                                    maxLength: {
                                        value: 30,
                                        message: "Please enter less than 30 characters"
                                    }
                                })} type="text"
                                       className="form-control" placeholder="Enter Your Property Name"/>
                                <ErrorMessage name="property_name" errors={errors}
                                              render={({message}) => <p className="text-danger"
                                                                        style={{fontSize: "14px"}}>{message}</p>}/>
                            </div>

                            <div className="form-group col-md-6">
                                <input {...register('address', {
                                    required: "You must specify property address",
                                    maxLength: {
                                        value: 150,
                                        message: "Please enter less than 150 characters"
                                    }
                                })} type="text"
                                       className="form-control" placeholder="Enter Property Address"/>
                                <ErrorMessage name="address" errors={errors}
                                              render={({message}) => <p className="text-danger"
                                                                        style={{fontSize: "14px"}}>{message}</p>}/>
                            </div>

                            <div className="form-group col-md-6">
                                <input {...register('photo', {
                                    required: "You must specify property photo",
                                })}
                                       type="file"
                                       className="form-control" placeholder="Choose Property Photo"/>
                                <ErrorMessage name="photo" errors={errors}
                                              render={({message}) => <p className="text-danger"
                                                                        style={{fontSize: "14px"}}>{message}</p>}/>
                            </div>

                            <div className="form-group col-md-6">
                                <input
                                    type={"number"} {...register('no_of_rooms', {required: "You must specify no of rooms"})}
                                    className={"form-control"} placeholder={"Enter No Of Rooms"}/>
                                <ErrorMessage name="no_of_rooms" errors={errors}
                                              render={({message}) => <p className="text-danger"
                                                                        style={{fontSize: "14px"}}>{message}</p>}/>
                            </div>

                            <div className="form-group col-md-6">
                                <input
                                    type={"number"} {...register('no_of_days', {required: "You must specify default no of days"})}
                                    className={"form-control"} placeholder={"Enter No Of Days"}/>
                                <ErrorMessage name="no_of_days" errors={errors}
                                              render={({message}) => <p className="text-danger"
                                                                        style={{fontSize: "14px"}}>{message}</p>}/>
                            </div>


                            <div className="form-group  col-md-6">
                                <input
                                    type={"number"} {...register('price', {required: "You must specify property price correspond to default no of days"})}
                                    className={"form-control"} placeholder={"Enter price"}/>
                                <ErrorMessage name="price" errors={errors}
                                              render={({message}) => <p className="text-danger"
                                                                        style={{fontSize: "14px"}}>{message}</p>}/>
                            </div>

                            <div className="form-group col-md-6 ">
                                <select
                                    className={"fc-custom"} {...register('category', {required: "You must specify category name"})}>
                                    <option className={"form-control"} value="select-type"
                                            disabled>-Select type-
                                    </option>
                                    <option className={"form-control"} value="Hotel">Hotel</option>
                                    <option className={"form-control"} value="Rent">Rent</option>
                                    <option className={"form-control"} value="OYO">OYO</option>
                                </select>
                                <ErrorMessage name="category" errors={errors}
                                              render={({message}) => <p className="text-danger"
                                                                        style={{fontSize: "14px"}}>{message}</p>}/>
                            </div>

                            <div className="form-group col-md-6">
                                <input {...register('contact_no', {
                                    required: "You must specify mobile number",
                                    pattern: {
                                        value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                                        message: "Enter valid mobile number"
                                    }
                                })}
                                       type="text"
                                       className="form-control" placeholder="Enter mobile no"/>
                                <ErrorMessage name="contact_no" errors={errors}
                                              render={({message}) => <p className="text-danger"
                                                                        style={{fontSize: "14px"}}>{message}</p>}/>
                            </div>

                            <div className="form-group col-md-6">
                                <input
                                    type={"text"} {...register('amenities', {required: "You must specify ameneties"})}
                                    className={"form-control"} placeholder={"Enter amenities"}/>
                                <ErrorMessage name="amenities" errors={errors}
                                              render={({message}) => <p className="text-danger"
                                                                        style={{fontSize: "14px"}}>{message}</p>}/>
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-4 offset-md-6"}>
                        <button className={"btn sent-butnn mr-3"}>Edit Details</button>
                    </div>
                </form>
            </div>
        </>
    )
}