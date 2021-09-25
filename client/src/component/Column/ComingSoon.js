import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ItemTabMovie from "../TabMovie/ItemTabMovie";
import MovieAPI from "../../api/movieAPI";

const ComingSoon = () => {
    const [comingSoon, setComingSoon] = useState([]);
    useEffect(() => {
        const fetchUpcomingMovie = async () => {
            try {
                let result = await MovieAPI.upcomingMovie();
                setComingSoon(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUpcomingMovie();
    }, []);
    return (
        <div className="box-coming-soon">
            <div className="coming-soon-header">
                <h2>Phim Sắp Chiếu</h2>
                <Link to="/sap-ra-mat">Add</Link>
            </div>
            <div className="coming-soon-container">
                {comingSoon.map((item, index) => {
                    return (
                        <ItemTabMovie movie={item} index={index} key={index} />
                    );
                })}
            </div>
        </div>
    );
};

export default ComingSoon;
