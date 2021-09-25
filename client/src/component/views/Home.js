import { Grid } from "@material-ui/core";
import React from "react";
import Carouse from "../Carousel/Carouse";
import HotSearchAndComingSoon from "../HotSearchAndComingSoon/HotSearchAndComingSoon";
import BodyRowMovieHome from "../RowMovie/BodyRowMovieHome";
const Home = () => {
    return (
        <div className="main-body">
            <div className="grid">
                <div className="carousel-home-header">
                    <Carouse></Carouse>
                </div>
                <div className="body">
                    <Grid container alignItems="stretch" direction="row">
                        <Grid item md={8} xs={12} className="body-container">
                            <BodyRowMovieHome />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <div className="paddingLeft20">
                                <HotSearchAndComingSoon />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Home;
