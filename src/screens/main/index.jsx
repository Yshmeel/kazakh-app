import {useContext, useEffect} from "react";
import {AppContext} from "../../contexts/app.context.js";
import {useNavigate} from "react-router-dom";
import Loader from "../../providers/loader.jsx";

const MainScreen = () => {
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(appContext.authorized) {
            navigate('/courses');
        } else {
            navigate('/create');
        }
    }, []);

    return (
        <Loader />
    );
};

export default MainScreen;
