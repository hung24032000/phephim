import {
    Container,
    Grid,
    Hidden,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { GET_ALL_TYPE_REQUEST } from "../../actions/typeAction";
import MenuMobie from "./MenuMobie";
import "./nav-bar.css";

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: "linear-gradient(to right, #d91424, #73141b)",
        maxHeight: "56px",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "absolute",
        right: 0,

        display: "flex",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: "auto",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
        },
    },
    menu: {
        position: "absolute",
        right: 0,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "10.2rem",
            "&:focus": {
                width: "16rem",
            },
        },
    },
    list: {
        display: "flex",
    },
}));
const NavBar = (props) => {
    const history = useHistory();
    // const query = new URLSearchParams(history.location.search);
    // console.log(query.get("vitri"));
    const theme = useTheme();
    const classes = useStyles();
    const isTaplet = useMediaQuery(theme.breakpoints.down("sm"));
    const [showMenu, setShowMenu] = useState(false);
    const handleClick = (e) => {
        setShowMenu(!showMenu);
    };
    const listItemCoutry = useSelector((state) => state.typeMovie.listCoutry);
    const typeMovie = useSelector((state) => state.typeMovie.listTypeMovie);
    const dispatch = useDispatch();
    useEffect(() => {
        const action = GET_ALL_TYPE_REQUEST();
        dispatch(action);
    }, []);
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Container maxWidth="lg">
                <div className="grid">
                    <Toolbar>
                        <div className="nav-logo">
                            <Hidden>
                                <div className="nav-icon-left"></div>
                            </Hidden>
                            <div className="nav-icon-right">
                                <img
                                    src="/logoWeb/logo_phe.png"
                                    alt="phephim"
                                />
                            </div>
                        </div>
                        <Hidden smDown>
                            <List className={`nav-menu ${classes.list}`}>
                                <ListItem
                                    alignItems="center"
                                    component="li"
                                    className="nav-menu_item"
                                >
                                    <Link to="/trang-chu" className="nav-link">
                                        <ListItemText
                                            primary="Trang Chủ"
                                            className="text-uppercase"
                                        />
                                    </Link>
                                </ListItem>
                                <ListItem
                                    alignItems="center"
                                    component="li"
                                    className="nav-menu_item"
                                >
                                    <Link className="nav-link dropdown">
                                        <ListItemText
                                            primary="Phim Bộ"
                                            className="text-uppercase"
                                        />
                                        <ArrowDropDownIcon fontSize="large" />
                                        <Grid
                                            container
                                            className="nav-dropdown-menu seriesMovie"
                                        >
                                            <Grid
                                                item
                                                className="explore-content"
                                                xs={3}
                                            >
                                                <div className="explore-content-header">
                                                    Quốc Gia
                                                </div>
                                                <div className="explore-content-body">
                                                    {listItemCoutry.map(
                                                        (item, index) => {
                                                            return (
                                                                <Link
                                                                    key={index}
                                                                    className="nav-dropdown-item"
                                                                    to={`/danh-sach/phim-bo/?vitri=${item.slug}`}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                className="explore-content"
                                                xs={6}
                                            >
                                                <div className="explore-content-header">
                                                    Thể Loại
                                                </div>
                                                <div className="explore-content-body">
                                                    {typeMovie.map(
                                                        (item, index) => {
                                                            return (
                                                                <Link
                                                                    key={index}
                                                                    className="nav-dropdown-item"
                                                                    to={
                                                                        item.slug
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                className="explore-content"
                                                xs={3}
                                            >
                                                <div className="explore-content-header">
                                                    Xu Hướng
                                                </div>
                                                <div className="explore-content-body">
                                                    <Link
                                                        className="nav-dropdown-item"
                                                        to="/danh-sach/phim-bo/phim-moi-nhat"
                                                    >
                                                        Phim Mới Nhất
                                                    </Link>
                                                    <Link
                                                        className="nav-dropdown-item"
                                                        to="/danh-sach/phim-bo/xem-nhieu-nhat"
                                                    >
                                                        Phim Xem Nhiều Nhất
                                                    </Link>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Link>
                                </ListItem>
                                <ListItem
                                    alignItems="center"
                                    component="li"
                                    className="nav-menu_item"
                                >
                                    <Link
                                        to="/phim-bo"
                                        className="nav-link dropdown"
                                    >
                                        <ListItemText
                                            primary="Phim Lẻ"
                                            className="text-uppercase"
                                        />
                                        <ArrowDropDownIcon fontSize="large" />
                                        <Grid
                                            container
                                            className="nav-dropdown-menu"
                                        >
                                            <Grid
                                                item
                                                className="explore-content"
                                                md={12}
                                                lg={12}
                                            >
                                                <div className="explore-content-body">
                                                    <Link
                                                        className="nav-dropdown-item"
                                                        to="/danh-sach/phim-le-moi-nhat"
                                                    >
                                                        Phim Mới Nhất
                                                    </Link>
                                                    <Link
                                                        className="nav-dropdown-item"
                                                        to="/danh-sach/phim-le-chieu-rap"
                                                    >
                                                        Phim Chiếu Rạp
                                                    </Link>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Link>
                                </ListItem>
                                <ListItem
                                    alignItems="center"
                                    component="li"
                                    className="nav-menu_item"
                                >
                                    <Link
                                        to="/hoat-hinh"
                                        className="nav-link dropdown"
                                    >
                                        <ListItemText
                                            primary="Hoạt Hình"
                                            className="text-uppercase"
                                        />
                                        <ArrowDropDownIcon fontSize="large" />
                                        <Grid
                                            container
                                            className="nav-dropdown-menu"
                                        >
                                            <Grid
                                                item
                                                className="explore-content"
                                                md={12}
                                                lg={12}
                                            >
                                                <div className="explore-content-body">
                                                    <Link
                                                        className="nav-dropdown-item"
                                                        to="\"
                                                    >
                                                        Anime Nhật
                                                    </Link>
                                                    <Link
                                                        className="nav-dropdown-item"
                                                        to="\"
                                                    >
                                                        Trung Quốc
                                                    </Link>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Link>
                                </ListItem>
                                <ListItem
                                    alignItems="center"
                                    component="li"
                                    className="nav-menu_item"
                                >
                                    <Link to="/trang-chu" className="nav-link">
                                        <ListItemText
                                            primary="Bảng Xếp Hạng"
                                            className="text-uppercase"
                                        />
                                    </Link>
                                </ListItem>
                            </List>
                        </Hidden>
                        <Hidden mdDown>
                            <div className={classes.search}>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ "aria-label": "search" }}
                                />
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                            </div>
                        </Hidden>
                        {isTaplet ? (
                            showMenu == true ? (
                                <MenuMobie
                                    listItemCoutry={listItemCoutry}
                                    typeMovie={typeMovie}
                                    show={showMenu}
                                ></MenuMobie>
                            ) : (
                                <MenuMobie
                                    listItemCoutry={listItemCoutry}
                                    typeMovie={typeMovie}
                                    show={showMenu}
                                ></MenuMobie>
                            )
                        ) : (
                            ""
                        )}
                        <Hidden mdUp>
                            <div className={classes.menu}>
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="open drawer"
                                >
                                    <MenuIcon
                                        onClick={() => {
                                            handleClick(!showMenu);
                                        }}
                                    />
                                </IconButton>
                            </div>
                        </Hidden>
                    </Toolbar>
                </div>
            </Container>
        </AppBar>
    );
};

export default withRouter(NavBar);
