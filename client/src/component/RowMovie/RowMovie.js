import { Link } from "react-router-dom";
import React from "react";
import CarouselRowItem from "../Carousel/CarouselRowItem";

const RowMovie = (props) => {
    const { movies, add, link, title } = props;
    return (
        <div className="rowMovie">
            <div className="rowMovie-body">
                <div className="rowMovie-header">
                    <h2 className="text-uppercase rowMovie-header-title">
                        {title}
                    </h2>
                    {add === true ? (
                        <Link className="rowMovie-header-addMore" to={link}>
                            Thêm
                        </Link>
                    ) : (
                        ""
                    )}
                </div>
                <CarouselRowItem movies={movies} />
            </div>
        </div>
    );
};

export default RowMovie;
