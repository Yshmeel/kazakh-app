import styles from './index.module.css'
import Logotype from "../logotype"

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loader__inner}>
                <Logotype />
            </div>
        </div>
    )
};

export default Loader;
