import React from "react";
import "../CSS/ProfileAdmin.css"
import { useContext } from "react";
import { UserContext } from "./Contexts";
import ImageService from "../service/ImageService";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
function AdminFirstPage() {

    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const admin = useContext(UserContext)
    const id = sessionStorage.getItem('id')
    const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const [newImg, setNewImg] = useState([])
    const formData = new FormData();

    useEffect(() => {
        async function getImage() {
            let imageBlob
            let promise
            try {
                // imageBlob = (await axios.get(`/patient/${id}/image`, { responseType: 'blob' })).data
                promise = await ImageService.fetchUserImage(id);
                imageBlob = promise.data

            } catch (err) {

                return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            return URL.createObjectURL(imageBlob)
        }
        async function getImages() {
            setImage(await getImage())
        }


        getImages()
    }, [])

    const uploadImage = (e) => {

        formData.append("imgFile", newImg)

        ImageService.uploadImage(id, formData).then(
            (res) => {
                swal("Image Upload Info", "Images Upadted Successfully", "success")
            }
        ).catch(swal("Image Upload Info", "Images Upadted Failed", "error"));


    }

    return (<div>

        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
                <div className="card-body">
                    <div className="row gutters">
                        <div className="card-body media align-items-center" style={{ marginLeft: "70vh" }}>

                            <img src={image} alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="img-fluid rounded border shadow" style={{ marginLeft: "18vh", width: "20vh", height: "15vh" }} />


                            <br />
                            &nbsp;



                            <input type="file" name="imgFile" className="form-control" onChange={(e) => { setImage(URL.createObjectURL(e.target.files[0])); setNewImg(e.target.files[0]) }} />
                            <button className="btn btn-primary show" onClick={uploadImage}>Save</button>




                        </div>
                        <div className="info col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 className="heading mb-2 text-primary">Personal Details</h6>
                        </div>
                        <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label className="heading" htmlFor="fullName">First Name : </label>
                                <span> {admin.firstName}</span>
                            </div>
                        </div>
                        <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label className="heading" htmlFor="fullName">Last Name : </label>
                                <span>  {admin.lastName}</span>
                            </div>
                        </div>
                        <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label className="heading" htmlFor="eMail">Email : </label>
                                <span>  {admin.email}</span>
                            </div>
                        </div>
                        <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label className="heading" htmlFor="phone">Phone No.</label>
                                <span>  {admin.phone}</span>
                            </div>
                        </div>
                        <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label className="heading" htmlFor="dob">Dob</label>
                                <span>  {admin.dob}</span>
                            </div>
                        </div>
                        <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label className="heading" htmlFor="adhaar">Adhaar No.</label>
                                <span>  {admin.adharNo}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >)
}

export default AdminFirstPage;