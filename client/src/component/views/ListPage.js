import { Grid, Hidden } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router";
import CardItem from "../Card/CardItem";
import PaginationRounded from "../pagination/PaginationRounded";

const ListPage = () => {
    let { type, category } = useParams();
    const items = [
        {
            _id: 1,
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            chapter: {
                totalChapter: undefined,
                currentChapter: 10,
            },
            slug: "random-name-#1",
        },
        {
            _id: 2,
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            chapter: {
                totalChapter: undefined,
                currentChapter: 10,
            },
            slug: "random-name-#1",
        },
        {
            _id: 3,
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            chapter: {
                totalChapter: undefined,
                currentChapter: 10,
            },
            slug: "random-name-#1",
        },
        {
            _id: 4,
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            chapter: {
                totalChapter: undefined,
                currentChapter: 10,
            },
            slug: "random-name-#1",
        },
        {
            _id: 5,
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            chapter: {
                totalChapter: undefined,
                currentChapter: 10,
            },
            slug: "random-name-#1",
        },
    ];
    const [listMovie, setListMovie] = useState(items);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    return (
        <div>
            <Hidden smDown>
                <div className="list-page-breadcrumb">
                    <h3>
                        Phim Mới /
                        {type === "phim-bo"
                            ? " Phim Bộ /"
                            : type === "phim-le"
                            ? "Phim Lẻ"
                            : "Phim /"}
                        {category}
                    </h3>
                </div>
            </Hidden>
            <div className="list-page-body">
                <div className="list-page-header">
                    <h1>Xem Phim Thể Loại {category}</h1>
                </div>
                <div className="list-page-content">
                    <Grid container direction="row">
                        {listMovie.map((item, index) => {
                            return (
                                <Grid item xs={4} sm={4} lg={3} xl={3}>
                                    <CardItem movie={item} key={index} />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} md={4} lg={8} xl={8}>
                            <div className="list-page-pagination">
                                <PaginationRounded count={totalPage} />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default ListPage;
