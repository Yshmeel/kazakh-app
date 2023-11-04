const getToast = (description, status) => {
    return {
        title: '',
        description,
        status,
        position: `top-center`,
        duration: 3000,
        isClosable: true
    };
};

export {
    getToast
};
