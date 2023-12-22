import words from '../../datasets/words.json'
import useSound from "use-sound";
import {Text} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {MdVolumeUp} from "react-icons/md";

const getAudioByURL = (word) => {
    const w = words.find((i) => i.word === word);
    return w?.audio_url;
};

const WordRenderer = (props) => {
    const {
        word,
    } = props;

    const [play] = useSound(getAudioByURL(word), { volume: 0.5, soundEnabled: true, html5: true });

    const onClick = () => {
        const audio = new Audio(getAudioByURL(word));
        audio.play();
    };

    return (
        <Text display={'flex'} alignItems='center' gap='3px' _hover={{
            cursor: "pointer"
        }} onClick={onClick}>
            {word}
            <Icon as={MdVolumeUp} />
        </Text>
    )
};

export default WordRenderer;
