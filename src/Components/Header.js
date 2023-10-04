function Header() {

    return (
        <div>

            <nav>

                <ul className="nav ">
                    <li><img src={process.env.PUBLIC_URL + '/bds logo.webp'} alt="logo" style={{ height: "70px" }}></img></li>
                    <li className="nav-item">
                        <a className="nav-link" href="/"><strong><h1 >Blood Donor System</h1></strong></a>
                    </li>


                </ul>
            </nav>

            <nav className=""><div className=" nav  justify-content-end">
                <ul className="col-3 nav justify-content-evenly">
                    <li className="nav-item">
                        <a className="nav-link" href="register" style={{ color: "#2C75A6" }}><strong>Register</strong></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="login" style={{ color: "#2C75A6" }}><strong>Login</strong></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="contactus" style={{ color: "#2C75A6" }}><strong>Contact us</strong></a>
                    </li>

                </ul>
            </div>
            </nav>
        </div>

    );
}

export default Header;