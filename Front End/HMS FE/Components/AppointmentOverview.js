import React from 'react'

export default function AppointmentOverview() {

  if (sessionStorage.getItem('jwt'))
    axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
  var arr = [
    { Date: "21-09-2022", Morning: 4, Afternoon: 8, Evening: 10, Night: 12 },
    { Date: "21-09-2022", Morning: 4, Afternoon: 8, Evening: 10, Night: 12 },
    { Date: "21-09-2022", Morning: 4, Afternoon: 8, Evening: 10, Night: 12 }
  ]
  return (
    <div className="Container-fluid p-4" style={{ background: "linear-gradient(to left, skyblue, yellow)" }}>
      <h1 className="text-center ">Appointment Overview</h1>
      <div className="row justify-content-center align-items-center " style={{ height: "96vh" }}>
        <div className="col-6  border border-primary shadow">
          <table className="table table-primary " >

            <tr>
              <th>No.</th>
              <th> Date</th>
              <th>Morning</th>
              <th>Afternoon</th>
              <th>Evening</th>
              <th>Night</th>
            </tr>
            {arr.map(function (item, index) {
              return <tr><td>{++index}</td><td >{item["Date"]}</td>
                <td>{item["Morning"]}</td>
                <td>{item["Afternoon"]}</td>
                <td>{item["Evening"]}</td>
                <td>{item["Night"]}</td>
              </tr>
            })}</table>
        </div>

      </div>

    </div>

  )
}
