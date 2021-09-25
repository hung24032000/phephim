import { Grid } from "@material-ui/core";
import { Route } from "react-router-dom";
import HotSearchAndComingSoon from "../HotSearchAndComingSoon/HotSearchAndComingSoon";
import Navbar from "../Navbar/Navbar";

const RouteCustom = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <>
                    <div className="main">
                        <Navbar />
                        <div className="main-body">
                            <div className="grid">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={8}>
                                        <Component {...props} {...rest} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <HotSearchAndComingSoon />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </>
            )}
        />
    );
};

export default RouteCustom;
