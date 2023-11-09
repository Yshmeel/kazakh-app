import {useContext, useEffect, useMemo} from 'react'
import {AppContext} from "../../contexts/app.context.js";
import {Link, useNavigate} from "react-router-dom";
import styles from './index.module.css'
import courses from '../../datasets/course.json'
import {Flex} from "@chakra-ui/react";
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

                </div>
            </div>
        </section>
    )
};

export default CoursesScreen;
