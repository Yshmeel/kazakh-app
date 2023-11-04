import {Box, Button, Flex, Text} from "@chakra-ui/react";
import Kyz1 from '../../../assets/kyz1.png'
import styles from '../index.module.css'
import {useEffect, useState} from "react";

const CourseCheerFirst = (props) => {
    const {
        onComplete
    } = props;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 250);
    }, []);

    return (
        <Flex direction={'column'} justifyContent={'center'} mt={2} p={3} py={0} opacity={loaded ? 1 : 0}>
            <Text fontSize={'lg'} color={'gray.300'} className={styles.cheerFirstText} mb={4}>
                У тебя неплохо получается, продолжай в том же темпе!
            </Text>

            <Button bg={'orange.500'} display={'inline-block'} onClick={onComplete}>
                Продолжить
            </Button>

            <img src={Kyz1} className={styles.cheerFirstImage} />
        </Flex>
    )
};

export default CourseCheerFirst;
