import {
    Button,
    createStyles,
    Hidden,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
// import ReactPlayer from "react-player";
import YouTube from "react-youtube";
import "./view.css";
const ViewMovie = () => {
    const useStyles = makeStyles((theme) =>
        createStyles({
            inputNext: {
                color: "#fff",
                border: "1px solid #1675b6",
                fontSize: "1rem",
                float: "right",
            },
            chappers: {
                color: "#fff",
                border: "1px solid #1675b6",
                fontSize: "1rem",
                "&:hover": {
                    color: "#fff",
                    backgroundColor: "#1675b6",
                    opacity: "1.2",
                },
            },

            active: {
                color: "#fff",
                backgroundColor: "#1675b6",
            },
            // root: {
            //     "& > *": {
            //         margin: theme.spacing(1),
            //     },
            // },
        })
    );
    const classes = useStyles();

    let { type, slug } = useParams();
    const [movie, setMovie] = useState({
        _id: 1,
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!",
        chap: "Tron Bo Tap 24",
        slug: "random-name-#1",
    });
    const [movies, setMovies] = useState([
        {
            _id: 1,
            videoId: "W1EywtvRYe8",
        },
        {
            _id: 2,
            videoId: "_nBlN9yp9R8",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },

        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
        {
            _id: 3,
            videoId: "eR1gu3p2m-M",
        },
    ]);
    const [indexVideo, setIndexVideo] = useState(0);
    const [playingVideo, setPlayingVideo] = useState(
        movies[indexVideo].videoId
    );
    const opts = {
        height: "500",
        width: "100%",
        position: "absolute",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 1,
            rel: 0,
            start: 0,
            iv_load_policy: 3,
            modestbranding: 1, //off logo
        },
    };
    // const onStateChange = (event) => {
    //     console.log(event.target);
    // };
    const onEnd = (event) => {
        if (indexVideo < movies.length - 1) {
            playNextVideo();
        }
    };
    const playNextVideo = () => {
        let index = parseInt(indexVideo, 10);
        setIndexVideo(index + 1);
        setPlayingVideo(movies[index + 1].videoId);
    };
    const playVideo = (index) => {
        let indexMap = parseInt(index, 10);
        setIndexVideo(indexMap);
        setPlayingVideo(movies[indexMap].videoId);
    };
    useEffect(() => {
        let index = parseInt(indexVideo, 10);
        setPlayingVideo(movies[index].videoId);
    }, [indexVideo]);
    return (
        <div className="movie-detail-body">
            <Hidden smDown>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/"> Phim Mới /</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/${type}`}>
                                {type === "phim-bo"
                                    ? " Phim Bộ /"
                                    : type === "phim-le"
                                    ? "Phim Lẻ /"
                                    : "Phim /"}
                            </Link>
                        </li>
                        <li className="breadcrumb-item">{movie.name}</li>
                    </ol>
                </nav>
            </Hidden>
            <div className="react-player-container">
                <YouTube videoId={playingVideo} opts={opts} onEnd={onEnd} />
            </div>
            <div className="pull-right">
                {movies.length - 1 > indexVideo ? (
                    <Button
                        endIcon={<ArrowRightAltIcon />}
                        onClick={playNextVideo}
                        variant="outlined"
                        className={classes.inputNext}
                    >
                        Tập Tiếp Theo {indexVideo + 2}
                    </Button>
                ) : (
                    ""
                )}
                {/* <Button endIcon={<QuestionAnswerIcon />}>Bình Luận</Button> */}
                <div className="clear"></div>
            </div>
            <div className="box">
                <div className="box-header bg-primary">
                    <h3>Danh sách tập phim</h3>
                </div>
                <div className="box-body scrollable-content-chap">
                    {movies.map((item, index) => {
                        return (
                            <Button
                                key={index}
                                onClick={() => {
                                    playVideo(index);
                                }}
                                variant="outlined"
                                className={`${classes.chappers} ${
                                    indexVideo === index ? classes.active : ""
                                }`}
                            >
                                Tập {index + 1}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ViewMovie;
