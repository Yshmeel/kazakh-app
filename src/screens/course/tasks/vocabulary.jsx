import styles from '../index.module.css'
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {useContext, useEffect, useMemo, useState} from "react";
import WordRenderer from "../../../components/word-renderer/index.jsx";
import api from "../../../shared/api/index.js";
import {AppContext} from "../../../contexts/app.context.js";
import clsx from "clsx";
import {MdWarning} from "react-icons/md";
import {Icon} from "@chakra-ui/icons";

const CourseTaskVocabulary = (props) => {
    const {
        dataset,
        onCompleteTask,
    } = props;

    const appContext = useContext(AppContext);
    const [loaded, setLoaded] = useState(false);

    const renderedWords = useMemo(() => {
        return dataset.payload.words.map((v) => {
            return (
                <Flex direction={'row'} gap={2} key={`${v[0]} - ${v[1]}`} alignItems={'center'}>
                    <Text bg={'gray.600'} p={2} flex={1} borderRadius={8} color={'gray.200'}>
                        <WordRenderer word={v[0]} />
                    </Text>

                    <Text color={'gray.200'}>
                        /
                    </Text>

                    <Text bg={'gray.600'} p={2} flex={1} borderRadius={8} color={'gray.200'}>
                        {v[1]}
                    </Text>
                </Flex>
            );
        });
    }, [dataset]);

    useEffect(() => {
        setLoaded(true);

        (async function() {
            try {
                const response = await api.insertToVocabulary(dataset.payload.words);
                appContext.updateVocabulary(response.data.data);
            } catch(e) {
                console.error(e);
            }
        }());
    }, []);

    return (
        <Box className={clsx(styles.task, loaded ? styles.loaded : '', styles.vocabulary)} mt={3}>
            <Text color={'gray.300'} fontSize={'md'}>
                {dataset.title}
            </Text>

            <Flex direction={'column'} mt={3} mb={3} gap={3} className={styles.vocabularyScrolling}>
                {renderedWords}
            </Flex>

            <Box p={3} bg={'gray.800'} color={'gray.300'} gap={2} mb={2} borderRadius={16}>
                <Icon as={MdWarning} size={48}/>
                <Text fontSize={'md'}>Все изученные слова будут доступны в разделе "Сөздік" (1 иконка в меню).</Text>
            </Box>

            <Box>
                <Button bg={'orange.500'} color={'gray.300'} onClick={onCompleteTask}>
                    Слова выучил. Приступаем к заданиям
                </Button>
            </Box>
        </Box>
    );
};

export default CourseTaskVocabulary;
