import {useContext, useEffect, useMemo} from 'react'
import {AppContext} from "../../contexts/app.context.js";
import {Link, useNavigate} from "react-router-dom";
import styles from './index.module.css'
import courses from '../../datasets/course.json'
import {Box, Flex, Text} from "@chakra-ui/react";
import CourseCard from "../../components/course-card/index.jsx";

const CoursesScreen = () => {
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!appContext.authorized) {
            navigate('/create');
        }
    }, []);

    const coursesList = useMemo(() => {
        if(!appContext.user) {
            return null;
        }

        return courses.map((c) => {
            const disabled = appContext.user.passed_courses.filter(
                (v) => c.locked_by.includes(v.course_key)
            ).length !== c.locked_by.length;

            const passed = appContext.user.passed_courses.some((v) => v.course_key === c.key);

            const isDisabled = disabled || passed;

            return (
                <Link to={!isDisabled ? `/course/${c.key}` : null} key={`${c.key}`} >
                    <CourseCard title={c.title}
                                description={c.description}
                                disabled={isDisabled}
                                />
                </Link>
            );
        });
    }, [courses]);

    return (
        <section className={styles.courses}>
            <div className="container">
                <div className={styles.coursesInner}>
                    <div className={styles.courseSection}>
                        <div className={styles.courseSectionHeader}>
                            1. Знакомство
                        </div>

                        <Flex direction='column' gap={2} className={styles.coursesList}>
                            {coursesList}
                        </Flex>
                    </div>

                    {appContext.user.passed_courses.length === 3 && (
                        <Box mt={4} color={'#fff'}>
                            <Text>Вы прошли все демонстрационное знакомство, php.cats очень рады!</Text>
                            <Text>Еще мы будем рады, если вы подпишетесь на наш Instagram:</Text>
                            <Text textDecoration={'underline'} as={'a'} target={'_blank'}
                                  href={"https://instagram.com/php.cats"}>@php.cats (кликабельно)</Text>
                        </Box>
                    )}

                </div>
            </div>
        </section>
    )
};

export default CoursesScreen;
