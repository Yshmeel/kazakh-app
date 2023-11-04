import axios from 'axios'

const _axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

const setAPIToken = (token) => {
    _axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const userMe = () => {
    return _axios.get('/v1/user/me');
};

const authenticationByName = (name) => {
    return _axios.post('/v1/authentication/by-name', {
        display_name: name,
    });
};

const getChatMessages = () => {
    return _axios.get('/v1/chat');
};

const sendChatMessage = (message) => {
    return _axios.post('/v1/chat', {
        message
    });
};

const insertToVocabulary = (pairs) => {
    return _axios.post('/v1/vocabulary', {
        pairs
    });
};

const passCourse = (courseKey, failsCount) => {
    return _axios.post('/v1/course/pass', {
        course_key: courseKey,
        fails_count: failsCount
    });
};

const api = {
    userMe,
    authenticationByName,
    getChatMessages,
    sendChatMessage,
    insertToVocabulary,
    passCourse,

    setAPIToken
};

export default api;
