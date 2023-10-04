import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import swal from 'sweetalert'
import AdminService1 from '../service/AdminService1'
import axios from 'axios'

export default function Schedule() {

  const [list, setList] = useState([])
  const [pageNo, setPageNo] = useState(0);
  const [updatedList, setUpdatedList] = useState({})
  const [flag, setFlag] = useState(true)
  if (sessionStorage.getItem('jwt'))
    axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
  useEffect(() => {

    AdminService1.getStaffList(0).then((res) => {
      setList(res.data)
    }).catch((err) => {
      swal("Error")
    })


  }, [])
  const getStaffList = () => {
    AdminService1.getStaffList(pageNo).then((result) => {
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

  const listForPage = (value) => {
    AdminService1.getStaffList(value).then((result) => {
      if (result.data.length !== 0) {

        setList(result.data)
      }

    }).catch((error) => {
      console.log(error);
    })

  }

  useEffect(() => {
    if (flag)
      setFlag(false)
    console.log("getting updated list ")
  }, [flag])

  useEffect(() => {
    getStaffList()
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

  const updateList = () => {

    console.log(list)
  }

  const updateShifts = () => {
    console.log("In update shifts")
    AdminService1.updateSchedule(list).then((res) => {
      setFlag(true)
      swal("Shifts Updated Successfully", "Info", "success")
    }).catch((err) => {
      swal("Updation Failed", "Please try again", "error")
    })

  }


  return (
    <div className="Container" style={{ background: "lightblue" }}>
      <h1 className="text-center ">Schedule</h1>
      <div className="row justify-content-center " style={{ height: "70vh" }}>
        <div className="col-8  ">
          <table className="table text-center table-striped table-hover table-dark" >
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Post</th>
                <th>Current Shift</th>
                <th>Change Shift</th>
              </tr>
            </thead>
            <tbody>
              {list.map(function (item, index) {

                return <tr key={index}>
                  <td>{(pageNo * 6) + index + 1}</td>
                  <td >{item.firstName} {item.lastName}</td>
                  <td>{item.category}</td>
                  <td>{item.shift}</td>
                  <td><select defaultValue={item.shift} onChange={(e) => { item.shift = e.target.value; updateList() }}>
                    <option>I</option>
                    <option>II</option>
                    <option>III</option>
                  </select></td>
                </tr>
              })}</tbody>
          </table>
          <div className='row justify-content-md-center'>
            <div className='col-3'>

              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" onClick={getPrevPage} > Prev</a></li>
                  <li class="page-item"><a class="page-link" onClick={() => listForPage(0)}>1</a></li>
                  <li class="page-item"><a class="page-link" onClick={() => listForPage(1)}>2</a></li>
                  <li class="page-item"><a class="page-link" onClick={() => listForPage(2)}>3</a></li>
                  <li class="page-item"><a class="page-link active" onClick={getNextPage}>Next</a></li>
                </ul>
              </nav>
            </div>
          </div >
          <button className='btn btn-success show' onClick={updateShifts}>Update Now</button></div>
      </div>
    </div>
  )
}
