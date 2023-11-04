import {Link, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useMemo, useState} from "react";
import courses from '../../datasets/course.json'
import styles from './index.module.css'
import {Box, Button, Flex, Text, useToast} from "@chakra-ui/react";
import CourseTaskVocabulary from "./tasks/vocabulary.jsx";
import CourseTaskComplete from "./tasks/complete.jsx";
import CourseTaskGather from "./tasks/gather.jsx";
import {getToast} from "../../shared/toast/index.js";
import CourseCheerFirst from "./cheerings/cheerFirst.jsx";
import api from "../../shared/api/index.js";
import {AppContext} from "../../contexts/app.context.js";
import Kyz2 from '../../assets/kyz2.png'

const CourseScreen = (props) => {
    const [course, setCourse] = useState(null);
    const [currentTask, setCurrentTask] = useState([null, null]);
    const [failedTasks, setFailedTasks] = useState([]);
    const [cheeringID, setCheeringID] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [completed, setCompleted] = useState(false);
    const params = useParams();

    const navigate = useNavigate();
    const toast = useToast();

    const appContext = useContext(AppContext);

    useEffect(() => {
        if(!appContext.authorized) {
            navigate('/create');
        }
    }, []);

    useEffect(() => {
        const co = courses.find((c) => c.key === params.key);

        if(co === null) {
            navigate('/');
        } else {
            setCurrentTask( [0, co.tasks_dataset[0]]);
            setCourse(co);

            setLoaded(true);
        }
    }, []);

    const completeCourse = () => {
        setCompleted(true);

        (async function() {
            try {
                const response = await api.passCourse(course.key, failedTasks.length);
                appContext.updatePassedCourses(response.data.data);
            } catch(e) {
                // toast(getToast('Что-то пошло не так при сохранении результата', 'danger'));
                console.error(e);
            }
        }());
    };

    const onCompleteTask = () => {
        const nextIndex = currentTask[0] + 1;
        const nextTask = course.tasks_dataset[nextIndex];

        if(!nextTask) {
            completeCourse();
            return;
        }

        if(nextIndex % 5 === 0 && nextIndex !== 0) {
            setCheeringID(1);
        }

        setCurrentTask([nextIndex, nextTask]);
    };

    const onFailTask = () => {
        if(!failedTasks.includes(currentTask[0])) {
            toast(getToast('Неверный ответ', 'danger'));
        }

        setFailedTasks((prev) => {
            if(!prev.includes(currentTask[0])) {
                return [
                    ...prev,
                    currentTask[0]
                ];
            }

            return prev;
        });
    };

    const onClearCheeringID = () => {
        setCheeringID(null);
    };

    const renderedCurrentTask = useMemo(() => {
        if(cheeringID !== null) {
            switch(cheeringID) {
                case 1:
                    return (
                        <CourseCheerFirst onComplete={onClearCheeringID} />
                    );
            }
        }

        if(!currentTask[1]) {
            return null;
        }

        switch(currentTask[1].type) {
            case 'vocabulary':
                return (
                    <CourseTaskVocabulary dataset={currentTask[1]}
                                          onCompleteTask={onCompleteTask} />
                );
            case 'complete':
                return (
                    <CourseTaskComplete dataset={currentTask[1]}
                                        key={`current-task-${currentTask[0]}-complete`}
                                        onCompleteTask={onCompleteTask}
                                        onFailTask={onFailTask}/>
                );
            case 'gather':
                return (
                    <CourseTaskGather dataset={currentTask[1]}
                                        key={`current-task-${currentTask[0]}`}
                                        onCompleteTask={onCompleteTask}
                                        onFailTask={onFailTask}/>
                );
        }
    }, [currentTask, currentTask[0], cheeringID]);

    if(!loaded) {
        return null;
    }

    if(completed) {
        return (
            <section className={styles.course}>
                <div className="container">
                    <Flex bg={'gray.800'} color={'gray.200'} p={4} justifyContent='space-between' className={styles.header}>
                        <Box>
                            <Text fontSize={'md'} opacity={'.7'}>Задание пройдено</Text>
                            <Text fontSize={'lg'} fontWeight={'bold'}>{course.title}</Text>
                        </Box>
                        <Box>
                            <Text fontSize={'lg'}>{course.tasks_dataset.length}/{course.tasks_dataset.length}</Text>
                        </Box>
                    </Flex>

                    <Flex className={styles.taskWrapper} mt={2}
                         p={4}
                         py={4}
                         justifyContent={'center'}
                         direction={'column'}
                         color={'gray.200'}>
                        <Text fontSize={'xl'} fontWeight={'bold'} mb={2}>Ты умница!</Text>
                        <Text fontSize={'md'} mb={4}>Поздравляем с прохождением занятия, это было восхитительно! Пойдем еще?</Text>
                        <Button as={Link} to={'/courses'} bg={'orange.500'} color={'gray.200'}>
                            Пойдем
                        </Button>

                        <img src={Kyz2} className={styles.completedImage} />
                    </Flex>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.course}>
            <div className="container">
                <Flex bg={'gray.800'} color={'gray.200'} p={4} justifyContent='space-between' className={styles.header}>
                    <Box>
                        <Text fontSize={'md'} opacity={'.7'}>Текущее задание</Text>
                        <Text fontSize={'lg'} fontWeight={'bold'}>{course.title}</Text>
                    </Box>
                    <Box>
                        <Text fontSize={'lg'}>{(currentTask[0] + 1)}/{course.tasks_dataset.length}</Text>
                    </Box>
                </Flex>

                <Box className={styles.taskWrapper} mt={2}
                     p={3}
                     py={0}
                     key={`current-task-${currentTask[0]}-wrapper`}>
                    {renderedCurrentTask}
                </Box>
            </div>
        </section>
    )
};

export default CourseScreen;
