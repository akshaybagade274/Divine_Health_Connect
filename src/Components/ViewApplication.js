import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import swal from 'sweetalert'
import axios from 'axios'
import AdminService1 from '../service/AdminService1'
export default function ViewApplication() {

  const [list, setList] = useState([])
  const [applnId, setApplnId] = useState()
  const [pageNo, setPageNo] = useState(0);
  const [flag, setFlag] = useState(false)

  if (sessionStorage.getItem('jwt'))
    axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
  useEffect(() => {

    AdminService1.getApplicantsList(0).then((res) => {
      setList(res.data)
    }).catch(err => console.log(err))

  }, [])

  useEffect(() => {
    AdminService1.getApplicantsList(pageNo).then((res) => {
      setList(res.data)
    }).catch(err => console.log(err))
  }, [flag])




  const getApplications = () => {
    AdminService1.getApplicantsList(pageNo).then((result) => {
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

  const ApplnForPage = (value) => {
    AdminService1.getApplicantsList(value).then((result) => {
      if (result.data.length !== 0) {

        setList(result.data)
      }

    }).catch((error) => {
      console.log(error);
    })

  }

  useEffect(() => {
    getApplications()
    console.log("pageNo in use effect: " + pageNo)
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

  const updateStatus = (id) => {

    AdminService1.updateApplStatus(id).then(res => {
      swal("Info", "Status marked as Seen", "success")
      setFlag(true)
    }).catch(err =>
      swal("Info", "Something went wrong", "error"))


  }

  async function downloadResume(value) {
    try {

      const response = await AdminService1.getResume(value);
      //create url string 
      let url = URL.createObjectURL(response.data);
      // <a href='url'></a>
      const anchorTag = document.createElement('a');
      anchorTag.href = url;

      anchorTag.setAttribute(
        'download',
        `ResumeFile.pdf`,
      );
      anchorTag.click();

    } catch (error) {

      console.log("error in download report: " + error);
    }

  }


  return (
    <div className="Container" style={{ background: "lightblue" }}>
      <h1 className="text-center ">Job Applications</h1>
      <div className="row justify-content-center" style={{ height: "70vh" }}>
        <div className="col-8 ">
          <table className="table table text-center table-striped table-hover table-dark " >
            <thead>
              <tr>
                <th>No.</th>
                <th>Applicant Name</th>
                <th>Email</th>
                <th>Post</th>
                <th>Download</th>
                <th>Status</th>

              </tr>
            </thead>
            <tbody>
              {list.map(function (item, index) {
                return <tr><td>{(pageNo * 6) + index + 1}</td>
                  <td >{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.post}</td>
                  <td><button class="btn btn-success show" style={{ marginLeft: "-1vh" }} onClick={(e) => downloadResume(item.id)}><i className="fa fa-download" ></i> Download</button></td>
                  <td><button className='btn btn-primary show' style={{ marginLeft: "-1vh" }} onClick={(e) => { console.log(item.id); updateStatus(item.id); }}>Mark as seen</button></td>
                </tr>
              })}</tbody>

          </table>

          <div className='row justify-content-md-center'>
            <div className='col-3'>

              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" onClick={getPrevPage} > Prev</a></li>
                  <li class="page-item"><a class="page-link" onClick={() => ApplnForPage(0)}>1</a></li>
                  <li class="page-item"><a class="page-link" onClick={() => ApplnForPage(1)}>2</a></li>
                  <li class="page-item"><a class="page-link" onClick={() => ApplnForPage(2)}>3</a></li>
                  <li class="page-item"><a class="page-link active" onClick={getNextPage}>Next</a></li>
                </ul>
              </nav>
            </div>
          </div >
        </div>
      </div>
    </div>
  )
}
