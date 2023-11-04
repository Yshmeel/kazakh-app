import {BrowserRouter, Route, Routes} from "react-router-dom"
import {useState} from "react";
import {AppContext} from "./contexts/app.context.js";
import AuthenticationProvider from "./providers/authentication.jsx";
import './main.css'
import Loader from "./providers/loader.jsx";
import LoaderProvider from "./providers/loader.jsx";
import CreateScreen from "./screens/create/index.jsx";
import {ChakraProvider} from "@chakra-ui/react";
import MainScreen from "./screens/main/index.jsx";
import CoursesScreen from "./screens/courses/index.jsx";
import MobileLayout from "./containers/mobile-layout/index.jsx";
import VocabularyScreen from "./screens/vocabulary/index.jsx";
import ChatScreen from "./screens/chat/index.jsx";
import ProfileScreen from "./screens/profile/index.jsx";
import CourseScreen from "./screens/course/index.jsx";

const App = () => {
    const [token, setToken] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    /**
     * @type {{
     *     me: Object,
     *     vocabulary: Array,
     * }}
     */
    const [user, setUser] = useState(null);

    const updateVocabulary = (value) => {
        setUser((prev) => {
            return {
                ...prev,
                vocabulary: value,
            };
        });
    }

    const updatePassedCourses = (value) => {
        setUser((prev) => {
            return {
                ...prev,
                passed_courses: value,
            };
        });
    };

    const shake = () => {
        document.querySelector('body').classList.add('shake');

        setTimeout(() => {
            document.querySelector('body').classList.remove('shake');
        }, 100);
    };

    const contextValue = {
        token,
        authorized,
        user,
        setToken,
        setAuthorized,
        setUser,
        setLoaded,
        updateVocabulary,
        updatePassedCourses,
        shake
    };

    return (
        <AppContext.Provider value={contextValue}>
            <ChakraProvider>
                <AuthenticationProvider>
                    <LoaderProvider>
                        {loaded ? (
                            <BrowserRouter>
                                <Routes>
                                    <Route path={'/'} element={<MainScreen />} />
                                    <Route path={'/create'} element={<CreateScreen />} />

                                    <Route element={<MobileLayout />}>
                                        <Route path={'/course/:key'} element={<CourseScreen />} />
                                        <Route path={'/courses'} element={<CoursesScreen />} />
                                        <Route path={'/vocabulary'} element={<VocabularyScreen />} />
                                        <Route path={'/chat'} element={<ChatScreen />} />
                                        <Route path={'/profile'} element={<ProfileScreen />} />
                                    </Route>
                                </Routes>
                            </BrowserRouter>
                        ) : (
                            <Loader />
                        )}
                    </LoaderProvider>
                </AuthenticationProvider>
            </ChakraProvider>
        </AppContext.Provider>
    )
};

export default App;
