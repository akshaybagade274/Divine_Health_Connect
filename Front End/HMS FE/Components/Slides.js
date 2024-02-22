function Slides() {
    return (
        <div className="container-fluid" style={{ marginBottom: "32vh" }}>
            <div className="row" style={{ height: "40vh" }}>

                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="3000">
                            <div className="container">
                                <div className="row" style={{ height: "75vh" }}>
                                    <img src={process.env.PUBLIC_URL + "appointment.png"} className="d-block w-100" alt="..." />
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item " data-bs-interval="3000">
                            <div className="container">
                                <div className="row" style={{ height: "75vh" }}>
                                    <img src={process.env.PUBLIC_URL + "treatment.jpg"} className="d-block w-100" alt="..." />
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item " data-bs-interval="3000">
                            <div className="container">
                                <div className="row" style={{ height: "75vh" }}>
                                    <img src={process.env.PUBLIC_URL + "nurse.jpg"} className="d-block w-100" alt="..." />
                                </div>
                            </div>
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
            </div>
        </div>
    )
}

export default Slides;