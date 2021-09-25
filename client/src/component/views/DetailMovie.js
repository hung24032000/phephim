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
                            <Link to="/"> Phim Mới /</Link>
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
                                                Chi Tiết Phim
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
                                                        Trạng Thái :
                                                        <Typography
                                                            variant="span"
                                                            color="secondary"
                                                        >
                                                            Tập
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
                                                        Đạo Diễn :
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
                                                        Diễn Viên :
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
                                                        Quốc Gia :Nhật Bản
                                                    </Typography>
                                                </li>
                                                <li className="list-item">
                                                    <Typography className="">
                                                        Năm Phát Hành : 2017
                                                    </Typography>
                                                </li>
                                                <li className="list-item">
                                                    <Typography className="">
                                                        Thời Lượng mỗi tập : 25
                                                        Phút
                                                    </Typography>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="box">
                                            <div className="box-header">
                                                <h4 className="text-uppercase ">
                                                    Tập Mới Nhất
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
                                                            {`Tập 
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
                                                            {`Tập 
                                                            ${
                                                                chapter.currentChapter -
                                                                1
                                                            }`}
                                                        </Link>
                                                        <Link
                                                            to={`${pathname}/tap-${chapter.currentChapter}`}
                                                        >
                                                            {`Tập 
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
                        <h3 className="content-movie-header">Nội Dung Phim</h3>
                    </div>
                    <div className="box-body">
                        <div className="review-body">
                            Phim Boruto: Naruto Next Generations... Naruto là
                            một chàng Nhẫn Giả trẻ tuổi với cái tính siêu quậy
                            hết thuốc chữa. Ước mơ của cậu là trở thành Nhẫn Giả
                            vĩ đại nhất làng, và sánh vai với các vị Hokage
                            huyền thoại của làng. Nhưng đây không phải là câu
                            chuyện của cậu nữa... Thế hệ Nhẫn Giả mới đã bước
                            vào lịch sử, dẫn đầu bởi cậu quý tử nhà Uzumaki -
                            Boruto! Nhiều năm sau cuộc Đại Chiến Nhẫn Giả lần 4,
                            giờ đây, Uzumaki Naruto đã đạt được ước mơ trở thành
                            Hokage Đệ Thất, và có một gia đình hạnh phúc với
                            Hinata và 2 người con Himawari và Boruto. Nhưng cậu
                            quý tử nhà Uzumaki lúc nào cũng bất mãn vì nghĩ cha
                            mình đặt công việc lên trên gia đình, Boruto quyết
                            định đi tìm Sasuke tầm sư học đạo, để có thể học
                            được chiêu thức Rasengan cho cuộc thi Chunin sắp
                            tới, nhằm thu hút sự chú ý của cha mình dù chỉ một
                            chút. Nhưng chính vì mong muốn này của cậu đã khiến
                            cậu gian lận trong cuộc thi, và Naruto là người đã
                            lật tẩy mánh khóe của cu cậu. Giữa tình thế rối ren
                            ấy, một sự kiện kinh khủng đã xảy ra...
                        </div>
                    </div>
                </div>
                <div className="box clear">
                    <div className="box-header bg-primary">
                        <h3 className="content-movie-header">
                            Phim Cùng Thể Loại
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
