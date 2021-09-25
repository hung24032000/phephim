import React from "react";
import { Link } from "react-router-dom";
import { hostAPI } from "../../constants/constants";

const CardItem = ({ movie }) => {
    const { name, slug, chapter } = movie;
    const { currentChapter, totalChapter } = chapter;
    return chapter === null ? null : (
        <Link to={`/phim/${slug}`}>
            <div className="card">
                <div className="card-body">
                    <div
                        className="card-poster"
                        style={{
                            backgroundImage: `url(${hostAPI}${movie.images.image[0]})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                        }}
                    ></div>
                    <span className="card-chapper">
                        Tập
                        {movie.chapter.totalChapter === 0
                            ? ` ${currentChapter} `
                            : ` ${currentChapter}/${totalChapter} `}
                        VietSub
                    </span>
                    <Link to={`/phim/${slug}`}>
                        <div className="card-info">
                            <h3 className="color-primary">{name}</h3>
                            <span className="text-muted">{name}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </Link>
    );
};

export default CardItem;
