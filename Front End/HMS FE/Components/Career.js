import React from 'react'
import { useState } from 'react'
import swal from 'sweetalert'
import AdminService1 from '../service/AdminService1'
import NavBar from './NavBar'
export default function Career() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [post, setPost] = useState()
    const [resume, setResume] = useState([])

    function sendApplication(e) {
        if (name && email && post && resume.length !== 0) {
            const formData = new FormData()
            const applnDto = {
                name,
                email,
                post
            }

            const json1 = JSON.stringify(applnDto)
            const blob1 = new Blob([json1], {
                type: 'application/json'
            });
            formData.append('resumeFile', resume)
            formData.append('applnDto', blob1);
            AdminService1.apply(formData).then((res) => {
                swal(res.data.message, "", "success")
                // window.location.reload();
            }).catch(err => console.log(err))

        }
        //swal("Select all fields")
    }
    return (
        <div><NavBar />
            <div className="container-fluid" style={{ background: "linear-gradient(to left, yellow, skyblue,white)" }}>
                <div className="row align-items-center justify-content-evenly" style={{ height: " 97vh" }}>
                    <div className="col-5  text-content">
                        <span className="display-5 fw-bold " style={{ color: "black" }}>Join Us </span> <br />
                        <span className="display-4 fw-bold " style={{ color: "black" }}>To Save Lives</span> <br />
                        <span className="display-6 fw-bold " style={{ color: "black" }}>Share your Resume with Us</span> <br />
                    </div>
                    <div className="col-6  p-4 contact-block">
                        <div className="container-fluid  ">
                            <div className="row ">

                            </div>
                            <form>
                                <div >
                                    <div className="col-6 mb-3">
                                        <label htmlFor="name" className="label">Your name</label>
                                        <input type="text" id="name" name='name' className="form-control input-box" placeholder="Enter Your Name" onChange={(e) => { setName(e.target.value) }} required />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label htmlFor="email" className="label">Your Email</label>
                                        <input type="email" id="email" name='email' className="form-control input-box"
                                            placeholder="Enter Your Email Adress" onChange={(e) => { setEmail(e.target.value) }} required />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label htmlFor="role" className="label">Role applying for</label>
                                        <select className="form-control my-3" onChange={(e) => setPost(e.target.value)} name="role" id='role' required>
                                            <option value="">---Select Role---</option>
                                            <option value='DOCTOR'>Doctor</option>
                                            <option value='ASSISTANT'>Assistant</option>
                                            <option value='NURSE'>Nurse</option>
                                            <option value=' WARD_CLERK'>Ward Clerk</option>

                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label htmlFor="role" className="label"><b>Upload your CV</b></label>
                                        <input type="file" id="role" className="form-control input-box"
                                            placeholder="Enter role" onChange={(e) => setResume(e.target.files[0])} required />
                                    </div>


                                    <div className="row ">
                                        <div className="mb-5">
                                            <button className="btn btn-primary rounded-pill shadow btn-lg show" onClick={(e) => sendApplication(e)} >Apply </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
