import styles from './index.module.css'
import {Box, Flex, Text} from "@chakra-ui/react";
import {useContext, useEffect, useMemo} from "react";
import {AppContext} from "../../contexts/app.context.js";
import Level from "../../components/level/index.jsx";
import CourseCard from "../../components/course-card/index.jsx";
import courses from '../../datasets/course.json'

const ProfileScreen = () => {
    const appContext = useContext(AppContext);

    useEffect(() => {
        if(!appContext.authorized) {
            navigate('/create');
        }
    }, []);

    const renderedPassedCourses = useMemo(() => {
        return appContext.user.passed_courses.map((c) => {
            const course = courses.find((co) => co.key === c.course_key);

            return (
                <CourseCard title={course.title}
                            description={course.description}
                            key={c}
                />
            );
        })
    }, []);

    return (
        <Box className={styles.profile} mt={4}>
            <div className="container">
                <Flex direction={'row'} gap={4} alignItems={'center'} p={3} bg={'gray.800'} mb={3}>
                    <Level value={appContext.user.me.level} />

                    <Box>
                        <Text fontSize={'sm'} color={'gray.300'} opacity={0.5}>Ваше имя</Text>
                        <Text fontSize={'lg'} color={'gray.300'} opacity={1}>{appContext.user.me.display_name}</Text>
                    </Box>
                </Flex>

                <Box>
                    <Text fontSize={'md'} color={'gray.300'} mb={2}>Пройденные задания:</Text>

                    {renderedPassedCourses.length === 0 ? (
                        <Text fontSize={'md'} color={'red.300'} mb={2}>Еще нет пройденных заданий, учитесь!</Text>

                    ) : renderedPassedCourses}
                </Box>
            </div>
        </Box>
    );
};

export default ProfileScreen;
