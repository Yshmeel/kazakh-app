import LogotypeImage from '../../assets/logotype.png'

const Logotype = () => {
    return (
        <img src={LogotypeImage} alt={'logo'} style={{
            width: "100%",
            height: "100%"
        }}/>
    );
};

export default Logotype;
