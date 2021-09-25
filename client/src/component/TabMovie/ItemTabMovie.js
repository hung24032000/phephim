import { Link } from "react-router-dom";
import React, { useState } from "react";
import { hostAPI } from "../../constants/constants";

const ItemTabMovie = (props) => {
    const { index, movie } = props;

    return movie === null ? null : (
        <div className="item-tab">
            <Link to={`/phim/${movie.slug}`}>
                <span className="item-tab-rank">{index + 1}</span>
                <div
                    className="item-tab-img-thumbnail"
                    style={{
                        backgroundImage: `url(${hostAPI}${movie.images.image[0]})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "container",
                    }}
                ></div>
                <div className="item-tab-body">
                    <div className="item-tab-title">{movie.name}</div>
                    <div className="item-tab-info">
                        <span>{movie.name}</span>
                        <span>{movie.views} lượt xem</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ItemTabMovie;
