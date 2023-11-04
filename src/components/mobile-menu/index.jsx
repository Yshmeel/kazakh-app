import styles from './index.module.css'
import {Link, useLocation} from "react-router-dom";
import {CalendarIcon, ChatIcon, ChevronRightIcon, InfoIcon} from "@chakra-ui/icons";
import {Box} from "@chakra-ui/react";
import clsx from "clsx";

const MobileMenu = () => {
    const location = useLocation();
    const ph = location.pathname;

    return (
        <Box className={styles.menu} mt={2} bg={'gray.900'}>
            <div className={styles.menuInner}>
                <Link to={'/vocabulary'} className={clsx(styles.menuItem, ph === '/vocabulary' ? styles.menuItemSpecial : null)}>
                    <CalendarIcon />
                </Link>

                <Link to={'/courses'} className={clsx(styles.menuItem, ph === '/courses' ? styles.menuItemSpecial : null)}>
                    <ChevronRightIcon />
                </Link>

                <Link to={'/chat'} className={clsx(styles.menuItem, ph === '/chat' ? styles.menuItemSpecial : null)}>
                    <ChatIcon />
                </Link>

                <Link to={'/profile'} className={clsx(styles.menuItem, ph === '/profile' ? styles.menuItemSpecial : null)}>
                    <InfoIcon />
                </Link>
            </div>
        </Box>
    )
};

export default MobileMenu;
