import React, { useState, useEffect, useCallback } from 'react'
import swal from 'sweetalert';
import StaffService from '../service/StaffService'
import axios from 'axios';
export default function UploadReports() {
  if (sessionStorage.getItem('jwt'))
    axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
  const [list, setList] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [report, setReport] = useState([])
  const [aptId, setAptId] = useState()
  const [checkId, setCheckId] = useState()
  const [flag, setFlag] = useState(true)
  let [temp, setTemp] = useState([]);



  useEffect(() => {

    getAllApppintments();

  }, [])

  const getAllApppintments = () => {
    StaffService.getListForReportUpload(0).then((result) => {
      setList(result.data)
      console.log(result.data)
    }).catch((error) => {
      console.log(error);
    })
  }

  const getAppointments = () => {
    StaffService.getListForReportUpload(pageNo).then((result) => {
      if (result.data.length !== 0) {

        setList(result.data)
      }
      else {
        getPrevPage();
      }

    }).catch((error) => {
      console.log(error);
    })

  }

  const AppoitForPage = (value) => {
    StaffService.getListForReportUpload(value).then((result) => {
      if (result.data.length !== 0) {

        setList(result.data)
      }

    }).catch((error) => {
      console.log(error);
    })

  }

  useEffect(() => {
    getAppointments()
    console.log("pageNo in use effect: " + pageNo)
    setReport([])
    setAptId()
  }, [pageNo])

  const getPrevPage = () => {
    if (pageNo > 0) {
      setPageNo(pageNo - 1)
    }
    //console.log("in prev pageNo: " + pageNo)

  }

  const getNextPage = () => {
    setPageNo(pageNo + 1)
    // console.log("in next pageNo: " + pageNo)
  }

  const upload = (id) => {

    if (temp[id]) {
      console.log(id)
      const formData = new FormData();
      ///uploadReport/{aptId}
      formData.append('reportFile', temp[id]);
      StaffService.uploadReport(id, formData).then((res) => {
        swal("Info", res.data, "success")
        setFlag(false);
        getAllApppintments();
      }
      ).catch((err) => {
        console.log("error")
      })
    }
    swal("Please attached File")

  }



  return (


    <div className="container text-center">
      <div className='row justify-content-md-center'>
        <div className='col'>
          <h1 style={{ color: "#0A7685" }}>Upload Reports</h1>
        </div>
      </div>
      <div className='row  justify-content-md-center'>
        <div className='col-11'>
          <table className="table table-dark table-hover table-striped " >
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Time Slot</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>File</th>
                <th>Upload</th>
              </tr>
            </thead>
            <tbody>



              {list.filter(i => i.report === null).map((item, index) => {
                return <tr key={index}>
                  <td>{(pageNo * 6) + index + 1}</td>
                  <td >{item.patientId.firstName} {item.patientId.lastName}</td>

                  <td>{item.timeSlot}</td>
                  <td>{item.doctor.firstName} {item.doctor.lastName}</td>
                  <td>{item.date}</td>
                  <td><input type='file' onChange={(e) => {
                    temp[item.id] = e.target.files[0];
                  }} /></td>
                  <td> <button type='file' className='btn btn-primary show btn-sm' style={{ marginLeft: "-5vh" }} onClick={(e) => { upload(item.id); item.report = temp[item.id] }}>Upload</button></td>

                </tr>
              })}
            </tbody></table>
        </div>
      </div>
      <div className='row justify-content-md-center'>
        <div className='col-3'>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item active"><a class="page-link" onClick={getPrevPage} > Prev</a></li>
              <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(0)}>1</a></li>
              <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(1)}>2</a></li>
              <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(2)}>3</a></li>
              <li class="page-item active"><a class="page-link" onClick={getNextPage}>Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
