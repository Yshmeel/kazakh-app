import styles from './index.module.css'
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import api from "../../shared/api/index.js";
import {Box, Flex, Textarea, useToast, Text, Spinner, Button} from "@chakra-ui/react";
import {getToast} from "../../shared/toast/index.js";
import Level from "../../components/level/index.jsx";
import {AppContext} from "../../contexts/app.context.js";
import {useNavigate} from "react-router-dom";
import {Icon} from "@chakra-ui/icons";
import {MdSend} from "react-icons/md";

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [message, setMessage] = useState('');

    const intervalRef = useRef(null);
    const appContext = useContext(AppContext);

    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if(!appContext.authorized) {
            navigate('/create');
        }
    }, []);

    const loadMessages = async () => {
        try {
            const response = await api.getChatMessages();
            setMessages(response.data.data);
            setLoaded(true);
        }  catch(e) {
            console.error(e);
            toast(getToast('Что-то пошло не так при загрузке чата', 'error'));
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        if(message.length > 3000) {
            return;
        }

        try {
            await api.sendChatMessage(message);
            setMessage('');
        } catch(e) {
            console.error(e);
            toast(getToast('Что-то пошло не так при отправке сообщения в чат', 'error'));
        }
    }

    useEffect(() => {
        loadMessages();
        intervalRef.current = setInterval(loadMessages, 500);

        return () => {
            window.clearInterval(intervalRef.current);
        };
    }, []);

    const renderedChatMessages = useMemo(() => {
        return messages.map((m) => {
            return (
                <Box p={3} bg={'gray.700'} display={'flex'}
                     m={2}
                     width={'50%'}
                     justifyContent={m.user.id === appContext.user.me.id ? 'flex-end' : 'flex-start'}
                     flexDirection={'column'}
                     key={`message-${m.id}`}>
                    <Flex direction={'row'} mb={1} gap={2} alignItems={'center'}>
                        <Level value={m.user.level} />
                        <Text color='gray.300' fontWeight='bold' fontSize={'lg'}>{m.user.display_name}</Text>
                    </Flex>

                    <Text fontSize={'md'} color='gray.300' >{m.message}</Text>
                </Box>
            );
        });
    }, [messages, appContext.user.me.id]);

    return (
        <section className={styles.chat}>
            <div className="container">
                <Box bg={'gray.800'} className={styles.chatInner}>
                    {!loaded ? (
                        <Spinner />
                    ) : renderedChatMessages}
                </Box>
                <Flex bg={'gray.800'} p={3} m={2} borderRadius={16} direction={'row'} className={styles.chatForm}>
                    <form onSubmit={sendMessage}>
                        <Flex direction={'column'}>
                            <Text color={'gray.300'} mb={2}>
                                В чате вы можете общаться с учащийся вашего уровня
                            </Text>

                            <Box mb={2}>
                                <Textarea placeholder='Напишите что-то в чат'
                                          color={'gray.200'}
                                          value={message}
                                          onChange={(e) => {
                                              setMessage(e.target.value);
                                          }} />
                            </Box>

                            <Button bg='orange.600' color='white.300'
                                    type={'submit'}
                                    isDisabled={message.trim().length === 0}>
                                <Icon as={MdSend} color={'#fff'}/>
                            </Button>
                        </Flex>
                    </form>
                </Flex>
            </div>
        </section>
    );
};

export default ChatScreen;
