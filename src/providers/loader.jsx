import {useContext, useEffect} from 'react'
import {AppContext} from "../contexts/app.context.js";

const LoaderProvider = (props) => {
    const {
        children
    } = props;

    const appContext = useContext(AppContext);

    useEffect(() => {
        if(appContext.authorized && appContext.user) {
            appContext.setLoaded(true);
        } else if(!appContext.authorized && !localStorage['token']) {
            appContext.setLoaded(true);
        } else {
            appContext.setLoaded(false);
        }
    }, [appContext.user, appContext.authorized])

    return children;
};

export default LoaderProvider;
