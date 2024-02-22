function Header() {
  return (
    <div
      className="container-fluid position-sticky"
      style={{ backgroundColor: "#87c955" }}
    >
      <div className="row justify-content-center" style={{ height: "12vh" }}>
        <div className="col-1 ">
          <img
            src={process.env.PUBLIC_URL + "/divinehealth1.jpg"}
            alt="logo"
            style={{ height: "95px",width:"150px"}}
          ></img>
        </div>
        <div
          className="col align-self-center"
          style={{ marginLeft: "6%", color: "#4D94C4" }}
        >
          <h1 className="display-8">
            <strong>DivineHealth Connect</strong>
          </h1>
        </div>
        <div className="col-3 ">
          <img
            src={process.env.PUBLIC_URL + "/helpLine.png"}
            alt="helpLine"
            style={{ height: "95px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
