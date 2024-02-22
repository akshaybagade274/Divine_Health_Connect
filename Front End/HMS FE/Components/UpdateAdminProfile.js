
import React from "react";

import "../CSS/ProfileAdmin.css"


function UpdateAdminProfile() {

    return (
        <div>

            <hr className="border-light m-0" />
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                    <div className="card-body">
                        <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h4 className="mb-2 text-primary">Update Details</h4>
                                <h6 className="mb-2 text-primary">Personal Details</h6>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="fullName">First Name</label>
                                    <input type="text" className="form-control" id="fullName" defaultValue="{admin.firstName}" placeholder="Enter First name" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="fullName">Last Name</label>
                                    <input type="text" className="form-control" id="fullName" defaultValue="{admin.lastName}" placeholder="Enter Last name" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="phone">Phone</label>
                                    <input type="text" className="form-control" id="phone" defaultValue="{admin.phoneNo}" placeholder="Enter Phone No." />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="dob">Dob</label>
                                    <input type="date" className="form-control" id="dob" defaultValue="{admin.dob}" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="adhaar">Adhaar No.</label>
                                    <input type="text" className="form-control" id="adhaar" defaultValue="{admin.aadharNo}" placeholder="Enter Adhaar No." />
                                </div>
                            </div>
                        </div>
                        <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 className="mt-3 mb-2 text-primary">Address</h6>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="adrLine1">Address Line 1</label>
                                    <input type="name" className="form-control" id="adrLine1" defaultValue="{admin.addressLine1}" placeholder="Address Line 1" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="adrLine2">Address Line 2</label>
                                    <input type="name" className="form-control" id="adrLine2" defaultValue="{admin.addressLine2}" placeholder="Address Line 2" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="city">City</label>
                                    <input type="text" className="form-control" id="city" defaultValue="{admin.city}" placeholder="Enter City" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="state">State</label>
                                    <input type="text" className="form-control" id="state" defaultValue="{admin.state}" placeholder="Enter State" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="country">Country</label>
                                    <input type="text" className="form-control" id="country" defaultValue="{admin.country}" placeholder="Enter Country" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="pin">Pin Code</label>
                                    <input type="text" className="form-control" id="pin" defaultValue="{admin.pinCode}" placeholder="Pin Code" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right mt-3">
                <button type="button" className="btn btn-primary" href="*" >Submit</button>&nbsp;
                <button type="button" className="btn btn-default" href="*">Cancel</button>
            </div>
        </div>

    )
}

export default UpdateAdminProfile;