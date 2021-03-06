import {
    Button,
    createStyles,
    Grid,
    Hidden,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import "./detail.css";
import CardItem from "../Card/CardItem";
import MovieAPI from "../../api/movieAPI";

const useStyles = makeStyles((theme) =>
    createStyles({
        button: {
            width: "100%",
            margin: "0.5rem 0",
            borderRadius: 0,
            lineHeight: "1.2",
            padding: "12px 20px",
            fontWeight: 700,
            color: "#fff",
            backgroundColor: "#d43f3a",
            borderColor: "#c9302c",
            "&:hover": {
                filter: "brightness(110%)",
                backgroundColor: "#d43f3a",
            },
        },
    })
);
const DetailMovie = () => {
    const [listSameKindType, setListSameKindType] = useState([]);
    const classes = useStyles();
    let { slug } = useParams();
    const history = useHistory();
    const { pathname } = history.location;

    const [movie, setMovie] = useState();
    const [type, setType] = useState([]);
    const [cat, setCat] = useState({});
    const [lastThreeChapter, setLastThreeChapter] = useState([]);
    const [chapter, setChapter] = useState({});

    useEffect(() => {
        const fetchBySlug = async () => {
            let result = await MovieAPI.getBySlug(slug);
            setType(result.data.type);
            setCat(result.data.catMovie);
            setMovie(result.data.movie);
        };
        const fetchBySlugLastThreeChapters = async () => {
            let result = await MovieAPI.lastThreeChapter(slug);
            console.log(result.data.chapter);
            setChapter(result.data.chapter);
        };
        fetchBySlug();
        fetchBySlugLastThreeChapters();
    }, []);

    return movie == null ? null : (
        <div className="movie-detail-body">
            <Hidden smDown>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/"> Phim M???i /</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/${cat.slug}`}>{cat.name}/</Link>
                        </li>
                        <li className="breadcrumb-item">{movie.name}</li>
                    </ol>
                </nav>
            </Hidden>
            <div className="movie-detail-container">
                <div className="box">
                    <div className="box-header box-navbar">
                        <h1 className="film-title">
                            <Link to={pathname}>{movie.name}</Link>
                        </h1>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="box-body">
                        <Grid container>
                            <Grid item xs={12} sm={4}>
                                <div className="film-cover cover">
                                    <Link to={pathname}>
                                        <div
                                            className="big-poster"
                                            style={{
                                                backgroundImage: `url(
                                                    "https://i0.wp.com/img.media3s.xyz/image/2021/04/thanh-thach-rave.jpg"
                                                )`,
                                            }}
                                        ></div>
                                    </Link>
                                    <Link to={`${pathname}/xem-phim`}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<PlayCircleFilledIcon />}
                                        >
                                            Xem Phim
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <div className="show-detailsxx">
                                    <div className="box">
                                        <div className="box-header">
                                            <h3 className="text-uppercase">
                                                Chi Ti???t Phim
                                            </h3>
                                        </div>
                                        <div className="box-body pre-scrollable">
                                            <ul className="list">
                                                <li className="list-item genre-tags">
                                                    {type.map((item, index) => {
                                                        return (
                                                            <Link
                                                                to={`/${item.slug}`}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        );
                                                    })}
                                                </li>
                                            </ul>
                                            <ul className="list">
                                                <li className="list-item">
                                                    <Typography className="">
                                                        Tr???ng Th??i :
                                                        <Typography
                                                            variant="span"
                                                            color="secondary"
                                                        >
                                                            T???p
                                                            {movie.chapter
                                                                .totalChapter ===
                                                            0
                                                                ? ` ${movie.chapter.currentChapter} `
                                                                : ` ${movie.chapter.currentChapter}/${movie.chapter.totalChapter} `}
                                                            VietSub
                                                        </Typography>
                                                    </Typography>
                                                </li>
                                                <li className="list-item">
                                                    <Typography className="">
                                                        ?????o Di???n :
                                                        <Link
                                                            to="/dien-vien/hiroyuki-yamashita"
                                                            className="text-primary"
                                                        >
                                                            Hiroyuki Yamashita
                                                        </Link>
                                                    </Typography>
                                                </li>
                                                <li className="list-item">
                                                    <Typography className="">
                                                        Di???n Vi??n :
                                                        <Link
                                                            to="/dien-vien/hiroyuki-yamashita"
                                                            className="text-primary"
                                                        >
                                                            Hiroyuki Yamashita
                                                        </Link>
                                                        <Link
                                                            to="/dien-vien/hiroyuki-yamashita"
                                                            className="text-primary"
                                                        >
                                                            Hiroyuki Yamashita
                                                        </Link>
                                                        <Link
                                                            to="/dien-vien/hiroyuki-yamashita"
                                                            className="text-primary"
                                                        >
                                                            Hiroyuki Yamashita
                                                        </Link>
                                                    </Typography>
                                                </li>
                                                <li className="list-item">
                                                    <Typography className="">
                                                        Qu???c Gia :Nh???t B???n
                                                    </Typography>
                                                </li>
                                                <li className="list-item">
                                                    <Typography className="">
                                                        N??m Ph??t H??nh : 2017
                                                    </Typography>
                                                </li>
                                                <li className="list-item">
                                                    <Typography className="">
                                                        Th???i L?????ng m???i t???p : 25
                                                        Ph??t
                                                    </Typography>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="box">
                                            <div className="box-header">
                                                <h4 className="text-uppercase ">
                                                    T???p M???i Nh???t
                                                </h4>
                                            </div>
                                            <div className="box-body chap-latest">
                                                {chapter && (
                                                    <>
                                                        <Link
                                                            to={`${pathname}/tap-${
                                                                chapter.currentChapter -
                                                                2
                                                            }`}
                                                        >
                                                            {`T???p 
                                                            ${
                                                                chapter.currentChapter -
                                                                2
                                                            }`}
                                                        </Link>
                                                        <Link
                                                            to={`${pathname}/tap-${
                                                                chapter.currentChapter -
                                                                1
                                                            }`}
                                                        >
                                                            {`T???p 
                                                            ${
                                                                chapter.currentChapter -
                                                                1
                                                            }`}
                                                        </Link>
                                                        <Link
                                                            to={`${pathname}/tap-${chapter.currentChapter}`}
                                                        >
                                                            {`T???p 
                                                            ${chapter.currentChapter}`}
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="box clear">
                    <div className="box-header bg-primary">
                        <h3 className="content-movie-header">N???i Dung Phim</h3>
                    </div>
                    <div className="box-body">
                        <div className="review-body">
                            Phim Boruto: Naruto Next Generations... Naruto l??
                            m???t ch??ng Nh???n Gi??? tr??? tu???i v???i c??i t??nh si??u qu???y
                            h???t thu???c ch???a. ?????c m?? c???a c???u l?? tr??? th??nh Nh???n Gi???
                            v?? ?????i nh???t l??ng, v?? s??nh vai v???i c??c v??? Hokage
                            huy???n tho???i c???a l??ng. Nh??ng ????y kh??ng ph???i l?? c??u
                            chuy???n c???a c???u n???a... Th??? h??? Nh???n Gi??? m???i ???? b?????c
                            v??o l???ch s???, d???n ?????u b???i c???u qu?? t??? nh?? Uzumaki -
                            Boruto! Nhi???u n??m sau cu???c ?????i Chi???n Nh???n Gi??? l???n 4,
                            gi??? ????y, Uzumaki Naruto ???? ?????t ???????c ?????c m?? tr??? th??nh
                            Hokage ????? Th???t, v?? c?? m???t gia ????nh h???nh ph??c v???i
                            Hinata v?? 2 ng?????i con Himawari v?? Boruto. Nh??ng c???u
                            qu?? t??? nh?? Uzumaki l??c n??o c??ng b???t m??n v?? ngh?? cha
                            m??nh ?????t c??ng vi???c l??n tr??n gia ????nh, Boruto quy???t
                            ?????nh ??i t??m Sasuke t???m s?? h???c ?????o, ????? c?? th??? h???c
                            ???????c chi??u th???c Rasengan cho cu???c thi Chunin s???p
                            t???i, nh???m thu h??t s??? ch?? ?? c???a cha m??nh d?? ch??? m???t
                            ch??t. Nh??ng ch??nh v?? mong mu???n n??y c???a c???u ???? khi???n
                            c???u gian l???n trong cu???c thi, v?? Naruto l?? ng?????i ????
                            l???t t???y m??nh kh??e c???a cu c???u. Gi???a t??nh th??? r???i ren
                            ???y, m???t s??? ki???n kinh kh???ng ???? x???y ra...
                        </div>
                    </div>
                </div>
                <div className="box clear">
                    <div className="box-header bg-primary">
                        <h3 className="content-movie-header">
                            Phim C??ng Th??? Lo???i
                        </h3>
                    </div>
                    <div className="box-body">
                        <Grid container direction="row">
                            {listSameKindType.map((item, index) => {
                                return (
                                    <Grid item xs={4} sm={4} lg={3} xl={3}>
                                        <CardItem movie={item} key={index} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailMovie;
