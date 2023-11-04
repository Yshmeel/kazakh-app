import MobileMenu from "../../components/mobile-menu/index.jsx";
import {Outlet} from "react-router-dom";

const MobileLayout = (props) => {
    return (
        <main>
            <div className="container">
                <Outlet />
                <MobileMenu />
            </div>
        </main>
    );
};

export default MobileLayout;
