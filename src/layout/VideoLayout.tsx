import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const VideoLayout = () => {
    return (
        <>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
                <Header sidebarOpen={false} setSidebarOpen={() => { }}></Header>
                <main>
                    <div className="mx-auto max-w-screen-2xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
};

export default VideoLayout;