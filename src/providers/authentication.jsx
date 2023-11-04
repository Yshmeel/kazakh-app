import {useContext, useEffect} from 'react'
import api from "../shared/api/index.js"
import {AppContext} from "../contexts/app.context.js"

const AuthenticationProvider = (props) => {
    const {
        children
    } = props;

    const appContext = useContext(AppContext);

    useEffect(() => {
        if(localStorage['token']) {
            (async function() {
                api.setAPIToken(localStorage['token']);

                try {
                    const response = await api.userMe();

                    appContext.setUser(response.data.data);
                    appContext.setAuthorized(true);
                    appContext.setToken(localStorage['token']);
                } catch(e) {
                    localStorage.removeItem('token');
                }
            }());
        }
    }, []);

    useEffect(() => {
        api.setAPIToken(appContext.token);
    }, [appContext.token]);

    return children;
};

export default AuthenticationProvider;
