import NavBar from "./NavBar";

function NotFound() {
    return (<div style={{
        backgroundImage: `url('https://img.freepik.com/premium-vector/404-error-page-found-ufo-tiny-people-updates-system-installation-programs_501813-780.jpg?w=2000')`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '80vh'
    }}>

        <NavBar />

        <h1 className="display-3" style={{ color: 'darkblue' }}>404 Page Not found</h1>



    </div>)
}

export default NotFound;