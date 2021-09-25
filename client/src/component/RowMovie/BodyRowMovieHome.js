import React, { useEffect, useState } from "react";
import MovieAPI from "../../api/movieAPI";
import RowMovie from "./RowMovie";

const BodyRowMovieHome = () => {
    const [nominationMovie, setNominationMovie] = useState([]);
    const [seriesMovies, setSeriesMovies] = useState([]);
    const [oddMovies, setOddMovies] = useState([]);
    const [cartoonMovies, setCartoonMovies] = useState([]);
    useEffect(() => {
        const fetchNominationMovie = async () => {
            try {
                let result = await MovieAPI.nominations();
                setNominationMovie(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchOddMovies = async () => {
            try {
                let result = await MovieAPI.oddMovies();
                setOddMovies(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchSeriesMovies = async () => {
            try {
                let result = await MovieAPI.seriesMovies();
                setSeriesMovies(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchCartoonMovies = async () => {
            try {
                let result = await MovieAPI.cartoonMovies();
                setCartoonMovies(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchAll = async () => {
            fetchNominationMovie();
            fetchSeriesMovies();
            fetchOddMovies();
            fetchCartoonMovies();
        };
        fetchAll();
    }, []);
    return (
        <div className="row-item">
            <RowMovie
                movies={nominationMovie}
                add={true}
                title="Phim Đề Cử"
                link="/phim-de-cu"
            />
            <RowMovie
                movies={oddMovies}
                add={true}
                title="Phim Lẻ Mới Cập Nhật"
                link="/phim-le"
            />
            <RowMovie
                movies={seriesMovies}
                add={true}
                title="Phim Bộ Mới Cập Nhật"
                link="/phim-bo"
            />
            <RowMovie
                movies={cartoonMovies}
                add={true}
                title="Phim Hoạt Hình"
                link="/phim-hoat-hinh"
            />
        </div>
    );
};

export default BodyRowMovieHome;
