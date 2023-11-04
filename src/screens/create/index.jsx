import {AppContext} from "../../contexts/app.context.js";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, FormControl, FormLabel, Input, useToast} from "@chakra-ui/react";
import Logotype from "../../containers/logotype/index.jsx";
import styles from './index.module.css'
import api from "../../shared/api/index.js";
import {getToast} from "../../shared/toast/index.js";

const CreateScreen = () => {
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [disabled, setDisabled] = useState(false);

    const toast = useToast();

    useEffect(() => {
        if(appContext.authorized) {
            navigate('/courses');
        }
    }, []);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        setDisabled(true);

        try {
            const response = await api.authenticationByName(displayName);
            appContext.setToken(response.data.data.token);
            appContext.setUser(response.data.data.user);
            appContext.setAuthorized(true);

            localStorage.setItem('token', response.data.data.token);
            navigate('/courses');

            toast(getToast('Вы успешно вошли в приложение', 'success'));
        } catch (e) {
            console.error(e);
            toast(getToast(`Что-то пошло не так. Попробуйте снова. Тип ошибки: ${e?.response?.data?.type}`, 'error'));
        } finally {
            setDisabled(false);
        }
    };

    return (
        <section className={styles.create}>
            <div className={styles.createContainer}>
                <div className={styles.createLogotype}>
                    <Box bg={'gray.800'} className={styles.createLogotypeInner}>
                        <Logotype />
                    </Box>
                </div>

                <Box bg={'gray.800'} className={styles.createForm} p={4}>
                    <form onSubmit={onSubmitForm} className={styles.createFormInner}>
                        <FormControl>
                            <FormLabel>Введите ваше имя</FormLabel>
                            <Input type='text' bg={'gray.700'} borderColor={'gray.900'}
                                   onChange={(e) => {
                                setDisplayName(e.target.value);
                            }} />
                        </FormControl>

                        <Button bg='orange.600' color='white.300' mt={3}
                                type={'submit'}
                                isDisabled={displayName === '' || disabled}>Войти</Button>
                    </form>
                </Box>
            </div>
        </section>
    );
};

export default CreateScreen;
