
import { Switch, Route } from 'react-router-dom';
import BdsSlides from "./BdsSlides";
function Home(props) {

    const loginRedirect = () => {
        props.history.push("/login")


    }

    return (
        <div>
        <BdsSlides/>

        </div>
    )
}


export default Home;