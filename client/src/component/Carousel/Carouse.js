import { Button } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import "./css.css";

function Carouse(props) {
    var items = [
        {
            name: "Trường Hành Ca",
            description:
                "Probably the most random thing you have ever seen!Probably the most random thing you have ever seen!",
        },
        {
            name: "Random Name #2",
            description:
                "Hello World!Probably the most random thing you have ever seen!",
        },
    ];

    return (
        <Carousel
            indicators={false}
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            animation="slide"
            timeout={400}
        >
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
}
function Item(props) {
    return (
        <Link to="/movie-detail" className="carousel-item-link">
            <img src="./img/test.png" alt="" />
            <div className="carousel-header-body">
                <h2 className="carousel-header-item-name text-uppercase">
                    {props.item.name}
                </h2>
                <p className="carousel-header-item-description">
                    {props.item.description}
                </p>
                <Button className="CheckButton">Check it out!</Button>
            </div>
        </Link>
    );
}
export default Carouse;
