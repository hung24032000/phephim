import React, { useEffect, useState } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ItemTabMovie from "./ItemTabMovie";
import MovieAPI from "../../api/movieAPI";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const StyledTabs = withStyles({
    root: {
        fontSize: "1.3rem",
        minHeight: "3.2rem",
        borderBottom: "0.8px solid #4A4B4B",
        borderTop: "0.8px solid #4A4B4B",
    },
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#1675b6",
        "& > span": {
            maxWidth: 40,
            width: "100%",
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        color: "#fff",
        minWidth: "33%",
        fontSize: "1.3rem",
        minHeight: "3.2rem",
        // "&:hover": {
        //     backgroundImage: "linear-gradient(180deg, transparent 0, #cecfcf)",
        // },
        "&$selected": {
            backgroundColor: "#004C9B",
            color: "white",
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
    selected: {},
}))((props) => <Tab {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#242526",
    },
}));
export default function TabMovie() {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const [seriesMovies, setSeriesMovies] = useState([]);
    const [oddFilms, setOddFilms] = useState([]);
    const [captions, setCaptions] = useState([]);

    useEffect(() => {
        const fetchsortViewMovies = async () => {
            try {
                let resultSeries = await MovieAPI.sortViewMovies("phim-bo");
                let resultOdd = await MovieAPI.sortViewMovies("phim-le");
                let resultCartoon = await MovieAPI.sortViewMovies(
                    "phim-hoat-hinh"
                );
                setSeriesMovies(resultSeries);
                setOddFilms(resultOdd);
                setCaptions(resultCartoon);
            } catch (error) {
                console.log(error);
            }
        };
        fetchsortViewMovies();
    }, []);

    return (
        <div className="box-hotserach">
            <div className="box-hotserach-header">
                <h2>Quan Tâm Nhiều Nhất</h2>
            </div>
            <div className={classes.root}>
                <div>
                    <StyledTabs value={value} onChange={handleChange}>
                        <StyledTab label="Phim Bộ" />
                        <StyledTab label="Phim Lẻ" />
                        <StyledTab label="Hoạt Hình" />
                    </StyledTabs>
                </div>
                <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                    <TabPanel value={value} index={0}>
                        {seriesMovies.map((item, index) => {
                            return (
                                <ItemTabMovie
                                    movie={item}
                                    index={index}
                                    key={index}
                                />
                            );
                        })}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {oddFilms.map((item, index) => {
                            return (
                                <ItemTabMovie
                                    movie={item}
                                    index={index}
                                    key={index}
                                />
                            );
                        })}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {captions.map((item, index) => {
                            return (
                                <ItemTabMovie
                                    movie={item}
                                    index={index}
                                    key={index}
                                />
                            );
                        })}
                    </TabPanel>
                </SwipeableViews>
            </div>
        </div>
    );
}
