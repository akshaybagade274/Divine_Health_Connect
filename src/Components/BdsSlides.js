import React from 'react'

export default function BdsSlides() {
  return (
    <div id="carouselExampleControls" className="carousel slide my-5" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" style={{ height: "75vh" }}>
      <img src={process.env.PUBLIC_URL + '/blood1.jpg'} style={{ height:'500px' ,width:'100px' }} className="d-block w-100" alt="..."/>
    
    </div>
    <div className="carousel-item" style={{ height: "75vh" }}>
      <img src={process.env.PUBLIC_URL + '/blood2.webp'} style={{ height:'500px' ,width:'100px' }} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={process.env.PUBLIC_URL + '/blood3.jpg'} style={{ height:'500px' ,width:'200px' }} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={process.env.PUBLIC_URL + '/blood4.webp'} style={{ height:'500px' ,width:'200px' }} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
}
