import styles from '../index.module.css'
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {useContext, useEffect, useId, useMemo, useRef, useState,} from "react";
import {AppContext} from "../../../contexts/app.context.js";
import useSound from "use-sound";
import {MdVolumeUp} from "react-icons/md";
import {Icon} from "@chakra-ui/icons";
import clsx from "clsx";

const CourseTaskComplete = (props) => {
    const {
        dataset,
        onCompleteTask,
        onFailTask
    } = props;

    const [play] = useSound(dataset.sound);

    const [loaded, setLoaded] = useState(false);
    const [selectedWords, setSelectedWords] = useState([]);
    const appContext = useContext(AppContext);

    const timeoutRef = useRef(() => null);

    const id = useId();

    const selectWord = (word) => () => {
        setSelectedWords((prev) => {
            if(!prev.includes(word)) {
                return [
                    ...prev,
                    word
                ];
            } else {
                return prev.filter((w) => w !== word);
            }
        });
    };

    const unselectWord = (word) => () => {
        setSelectedWords((prev) => {
            if(prev.includes(word)) {
                return prev.filter((w) => w !== word);
            }

            return prev;
        });
    };

    const renderedSelectedWords = useMemo(() => {
        return selectedWords.map((word) => {
            return (
                <Text p={3} borderRadius={16} color={'gray.200'} bg={'gray.700'}
                      cursor={'pointer'}
                      onClick={unselectWord(word)} key={`selected-word-${word}`}>
                    {word}
                </Text>
            );
        });
    }, [selectedWords, unselectWord]);

    const renderedAvailableWords = useMemo(() => {
        return dataset.payload.available_words.map((word) => {
            return (
                <Text p={3} borderRadius={16} color={'gray.200'} bg={selectedWords.includes(word) ? 'gray.500' : 'gray.700'}
                      cursor={'pointer'}
                      onClick={selectWord(word)} key={`available-word-${word}`}>
                    {word}
                </Text>
            );
        });
    }, [selectedWords, dataset.payload.available_words, selectWord]);

    useEffect(() => {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if(dataset.payload.correct_sentence.length === selectedWords.length) {
                if(JSON.stringify(selectedWords.map((v) => v.toString().toLowerCase())) ===
                    JSON.stringify(dataset.payload.correct_sentence.map((v) => v.toLowerCase()))) {
                    onCompleteTask();
                } else {
                    onFailTask();
                }
            }
        }, 450);
    }, [selectedWords]);

    useEffect(() => {
        play();

        setTimeout(() => {
            setLoaded(true);
        }, 250);

        return () => {
            setLoaded(false);
        };
    }, [play]);

    return (
        <Box className={clsx(loaded ? styles.loaded : '', styles.task, styles.complete)} mt={3} key={id}>
            <Flex direction={'row'} mb={2} color='#fff' justifyContent={'space-between'} className={styles.completeHeader}>
                <Box>
                    <Text fontSize={'md'} opacity={0.7}>
                        Переведите предложение
                    </Text>
                    <Text fontSize={'lg'}>
                        {dataset.payload.sentence}
                    </Text>
                </Box>

                <Box>
                    <Button bg={'orange.500'} onClick={play}>
                        <Icon as={MdVolumeUp} />
                    </Button>
                </Box>
            </Flex>

            <Flex gap={1} mb={4} height={120} alignItems={'center'} wrap={'wrap'}>
                {renderedSelectedWords}
            </Flex>

            <Flex gap={2} wrap={'wrap'}>
                {renderedAvailableWords}
            </Flex>
        </Box>
    )
};

export default CourseTaskComplete;
