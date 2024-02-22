import React from "react";
import "../CSS/Profile.css";


function ChangePassword() {

    return (

        <div>
            <div className="card-body pb-2">
                <div className="form-group">
                    <label className="form-label">Current password</label>
                    <input type="password" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="form-label">New password</label>
                    <input type="password" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="form-label">Repeat new password</label>
                    <input type="password" className="form-control" />
                </div>
            </div>
            <div className="text-right mt-3">
                <button type="button" className="btn btn-primary" href="*" >Submit</button>&nbsp;
                <button type="button" className="btn btn-default" href="*">Cancel</button>
            </div>
        </div>
    )
}

export default ChangePassword;