import React from "react";
import Slider from "react-slick";
import CardItem from "../Card/CardItem";

const SlideRowMovie = ({ movies }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        adaptiveHeight: true,
    };

    return (
        <Slider {...settings}>
            {movies.map((item, index) => {
                return <CardItem movie={item} key={index} />;
            })}
        </Slider>
    );
};
export default SlideRowMovie;
