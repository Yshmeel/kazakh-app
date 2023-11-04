import styles from './index.module.css'
import {Box, Flex, Text} from "@chakra-ui/react";
import {useContext, useMemo} from "react";
import {AppContext} from "../../contexts/app.context.js";
import WordRenderer from "../../components/word-renderer/index.jsx";

const VocabularyScreen = () => {
    const appContext = useContext(AppContext);

    const renderedVocabulary = useMemo(() => {
        return appContext.user.vocabulary.map((v) => {
            return (
                <Flex direction={'row'} gap={2} key={`${v.left_word} - ${v.right_word} - ${v.id}`} alignItems={'center'}>
                    <Text bg={'gray.500'} p={2} flex={1} borderRadius={8} color={'gray.200'}>
                        <WordRenderer word={v.left_word} />
                    </Text>

                    <Text color={'gray.200'}>
                        /
                    </Text>

                    <Text bg={'gray.500'} p={2} flex={1} borderRadius={8} color={'gray.200'}>
                        {v.right_word}
                    </Text>
                </Flex>
            );
        })
    }, []);

    return (
        <section className={styles.vocabulary}>
            <div className="container">
                <Box className={styles.vocabularyInner} mt={3}>
                    <Text fontSize={'xl'} fontWeight={'bold'} color={'gray.200'}>Изученные слова</Text>

                    <Box className={styles.vocabularyList} mt={3}>
                        {renderedVocabulary.length === 0 ? (
                            <Text color={'gray.200'}>Вы еще не изучили ни одно слово. Приступайте к изучению!</Text>
                        ) : renderedVocabulary}
                    </Box>
                </Box>
            </div>
        </section>
    );
};

export default VocabularyScreen;
