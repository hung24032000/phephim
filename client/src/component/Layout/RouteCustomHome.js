import { Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const RouteCustomHome = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <>
                    <div className="main">
                        <Navbar />
                        <Component {...props} {...rest} />
                    </div>
                </>
            )}
        />
    );
};

export default RouteCustomHome;
