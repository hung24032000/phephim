import {
    List,
    ListItem,
    ListItemText,
    makeStyles,
    useTheme,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));
const MenuMobie = (props) => {
    const { show } = props;
    const theme = useTheme();
    const classes = useStyles();
    const { DanhSachTheLoai, listItemCoutry } = props;
    const [showMenu, setShowMenu] = useState(show);
    const [showSubMenuSeries, setShowSubMenuSeries] = useState(false);
    const [showSubMenuOddFilm, setShowSubMenuOddFilm] = useState(false);
    const handleShowSubMenu = () => {
        setShowSubMenuSeries(!showSubMenuSeries);
    };
    const handleShowSubMenuOddFilm = () => {
        setShowSubMenuOddFilm(!showSubMenuOddFilm);
    };
    useEffect(() => {
        setShowMenu(show);
    }, [show]);
    return (
        <div className={`mobileMenu ${showMenu ? "showMenu" : "hide"}`}>
            <List className="nav-menu-mobie">
                <ListItem
                    alignItems="center"
                    component="li"
                    className="nav-menu-mobie_item"
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
                    className="nav-menu-mobie_item"
                >
                    <Link
                        className="nav-link"
                        onClick={() => {
                            handleShowSubMenu();
                        }}
                    >
                        <ListItemText
                            alignItems="center"
                            component="li"
                            primary="Phim Bộ"
                        />
                        <ArrowDropDownIcon fontSize="large" />
                    </Link>
                    <List
                        className={`dropdown-mobie  subSeries ${
                            showSubMenuSeries == true ? "show" : "hide"
                        }`}
                    >
                        <ListItem item className="dropdown-mobie-item">
                            <div className="dropdown-mobie-header">
                                Quốc Gia
                            </div>
                            <div className="dropdown-mobie-body">
                                {listItemCoutry.map((item) => {
                                    return (
                                        <Link
                                            to={`/danh-sach/phim-bo/?vitri=${item.slug}`}
                                        >
                                            <ListItemText
                                                primary={item.name}
                                                className="text-uppercase  dropdown-mobie-body-item"
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        </ListItem>
                        <ListItem item className="dropdown-mobie-item">
                            <div className="dropdown-mobie-header">
                                Thể Loại
                            </div>
                            <div className="dropdown-mobie-body">
                                {listItemCoutry.map((item) => {
                                    return (
                                        <Link
                                            to={`/danh-sach/phim-bo/${item.slug}`}
                                        >
                                            <ListItemText
                                                primary={item.name}
                                                className="text-uppercase  dropdown-mobie-body-item"
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem
                    alignItems="center"
                    component="li"
                    className="nav-menu-mobie_item"
                >
                    <Link
                        className="nav-link"
                        onClick={() => {
                            handleShowSubMenuOddFilm();
                        }}
                    >
                        <ListItemText
                            alignItems="center"
                            component="li"
                            primary="Phim Lẻ"
                        />
                        <ArrowDropDownIcon fontSize="large" />
                    </Link>
                    <List
                        className={`dropdown-mobie  oddFilm ${
                            showSubMenuOddFilm == true ? "show" : "hide"
                        }`}
                    >
                        <ListItem item className="dropdown-mobie-item">
                            <div className="dropdown-mobie-header">
                                Quốc Gia
                            </div>
                            <div className="dropdown-mobie-body">
                                {listItemCoutry.map((item) => {
                                    return (
                                        <Link to="/trang-chu">
                                            <ListItemText
                                                primary={item.name}
                                                className="text-uppercase  dropdown-mobie-body-item"
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        </ListItem>
                        <ListItem item className="dropdown-mobie-item">
                            <div className="dropdown-mobie-header">
                                Thể Loại
                            </div>
                            <div className="dropdown-mobie-body">
                                {listItemCoutry.map((item) => {
                                    return (
                                        <Link to="/trang-chu">
                                            <ListItemText
                                                primary={item.name}
                                                className="text-uppercase  dropdown-mobie-body-item"
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        </ListItem>
                    </List>
                </ListItem>
            </List>
        </div>
    );
};

export default MenuMobie;
