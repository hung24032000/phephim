import { Grid } from "@material-ui/core";
import { Route } from "react-router-dom";
import Filter from "../Filter/Filter";
import Navbar from "../Navbar/Navbar";

const RouteCustomList = ({ component: Component, ...rest }) => {
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
                                        <Filter />
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

export default RouteCustomList;
