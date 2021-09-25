import { Grid } from "@material-ui/core";
import { Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const RouteCustomView = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <>
                    <div className="main">
                        <Navbar />
                        <div className="main-body">
                            <div className="grid">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Component {...props} {...rest} />
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

export default RouteCustomView;
