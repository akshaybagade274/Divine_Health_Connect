import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from "./Contexts"
import PatientService from '../service/PatientService';
import axios from 'axios';



export default function DownloadReport() {

  const { cmp, setCmp, user, setUser } = useContext(UserContext)

  const [reportList, setReportsList] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  if (sessionStorage.getItem('jwt'))
    axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')

  useEffect(() => {
    PatientService.getReports(user.id, pageNo).then((result) => {
      console.log("reports list : " + result.data)
      setReportsList(result.data);
    }).catch((error) => {
      console.log("error in useEffect of download reports: " + error)
    })
  }, []);

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

  const getAppointments = () => {
    PatientService.getReports(user.id, pageNo).then((result) => {
      if (result.data.length !== 0) {

        setReportsList(result.data)
      }
      else {
        getPrevPage();
      }

    }).catch((error) => {
      console.log(error);
    })

  }


  const AppoitForPage = (value) => {
    PatientService.getReports(user.id, value).then((result) => {
      if (result.data.length !== 0) {

        setReportsList(result.data)
      }

    }).catch((error) => {
      console.log(error);
    })

  }

  useEffect(() => {
    getAppointments()
    console.log("pageNo in use effect: " + pageNo)
  }, [pageNo])


  async function downloadReport(value) {
    try {

      const respo = await PatientService.getReport(value);
      //create url string 
      let url = URL.createObjectURL(respo.data);
      // <a href='url'></a>
      const anchorTag = document.createElement('a');
      anchorTag.href = url;

      anchorTag.setAttribute(
        'download',
        `ReportFile.pdf`,
      );
      anchorTag.click();

    } catch (error) {

      console.log("error in download report: " + error);
    }

  }



  return (
    <div className="Container-fluid p-4" style={{ background: "lightblue" }}>
      <h1 className="text-center ">Download Reports</h1>
      <div className="row justify-content-center align-items-center " style={{ height: "65vh" }}>
        <div className="col-8">
          <table className="table text-center table-striped table-dark table-hover" >
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Status</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {reportList.map(function (item, index) {
                return <tr key={index}>
                  <td>{(pageNo * 7) + index + 1}</td>
                  <td >{item.date}</td>
                  <td>{item.report !== null ? 'Available' : 'Not Available'}</td>
                  <td>{item.report !== null ? <button class="btn btn-success show" onClick={() => { downloadReport(item.id) }} style={{ marginLeft: "-3vh" }}><i className="fa fa-download" ></i> Download</button> : <></>}</td>
                </tr>
              })}</tbody></table>
        </div>
        <div className='row justify-content-md-center'>
          <div className='col-3'>

            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" onClick={getPrevPage} > Prev</a></li>
                <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(0)}>1</a></li>
                <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(1)}>2</a></li>
                <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(2)}>3</a></li>
                <li class="page-item"><a class="page-link active" onClick={getNextPage}>Next</a></li>
              </ul>
            </nav>
          </div>
        </div >

      </div>
    </div>
  )
}
