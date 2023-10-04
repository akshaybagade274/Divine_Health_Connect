import NavBar from "./NavBar";
import Slides from "./Slides";
import { Switch, Route } from 'react-router-dom';
function Home(props) {

    return (
        <div>
            <NavBar />
            <Slides></Slides>

        </div>
    )
}


export default Home;