import {useContext, useEffect, useMemo} from 'react'
import {AppContext} from "../../contexts/app.context.js";
import {Link, useNavigate} from "react-router-dom";
import styles from './index.module.css'
import courses from '../../datasets/course.json'
import {Box, Flex, Text} from "@chakra-ui/react";
import clsx from "clsx";
import CourseCard from "../../components/course-card/index.jsx";
import app from "../../App.jsx";

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

            return (
                <Link to={`/course/${c.key}`} key={`${c.key}`} >
                    <CourseCard title={c.title}
                                description={c.description}
                                disabled={disabled || passed}
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

                    {/*<div className={clsx(styles.courseSection, styles.courseSectionDisabled)}>*/}
                    {/*    <div className={styles.courseSectionHeader}>*/}
                    {/*        2. Вопросительные*/}
                    {/*    </div>*/}

                    {/*    <div className={styles.coursesList}>*/}
                    {/*        <Box p={4} bg={'gray.300'} color={"gray.900"} borderRadius={8}*/}
                    {/*             opacity={0.4}*/}
                    {/*             className={styles.coursesListFuture}>*/}
                    {/*            <Text>В будущих версиях приложения</Text>*/}
                    {/*        </Box>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    )
};

export default CoursesScreen;
