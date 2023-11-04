import {Box, Text} from "@chakra-ui/react";

const CourseCard = (props) => {
    const {
        title,
        description,
        disabled,
    } = props;

    return (
        <Box p={3} bg={'gray.700'} color={'gray.200'} opacity={disabled ? 0.3 : 1}
             borderRadius={8}
             _hover={{
                 cursor: disabled ? 'not-allowed' : 'pointer'
             }}
           >
            <Text fontSize={'lg'} fontWeight={'bold'}>{title}</Text>
            <Text fontSize={'sm'}>{description}</Text>
        </Box>
    );
};

export default CourseCard
