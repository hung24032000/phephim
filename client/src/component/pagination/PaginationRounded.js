import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { MemoryRouter, Route, useHistory } from "react-router";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            color: "#fff",
            marginTop: theme.spacing(2),
        },
    },
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff",
        },
    },
}));
const PaginationRounded = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { location } = history;
    const { pathname } = history.location;
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    console.log(totalPage);
    const query = new URLSearchParams(location.search);
    const pageCurrent = parseInt(query.get("page") || 1, 10);
    useEffect(() => {
        setPage(pageCurrent);
    }, []);
    const handleChange = (event, pageCurrent) => {
        const link = `${pathname}?page=${pageCurrent}`;
        setPage(pageCurrent);
        history.push(link);
    };
    return (
        <MemoryRouter initialIndex={0}>
            <Route>
                <Pagination
                    page={page}
                    count={totalPage}
                    boundaryCount={2}
                    classes={{ ul: classes.ul }}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`${pathname}${
                                item.page === 1 ? "" : `?page=${item.page}`
                            }`}
                            {...item}
                        />
                    )}
                />
            </Route>
        </MemoryRouter>
    );
};

export default PaginationRounded;
