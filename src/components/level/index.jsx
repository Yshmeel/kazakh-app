import {Text} from '@chakra-ui/react'

const Level = (props) => {
    const {
        value
    }  = props;

    return (
        <div className={'level'}>
            <Text bg={'gray.300'} color={'gray.900'} p={1} px={3} borderRadius={64} fontWeight={'bold'}>{value}</Text>
        </div>
    );
};

export default Level;
