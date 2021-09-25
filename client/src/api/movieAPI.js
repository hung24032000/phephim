import apiCaller from "../util/apiCaller";

const MovieAPI = {
    getAll: (limit, page) => {
        return apiCaller.get("movie", { limit, page }).then((response) => {
            return response.data;
        });
    },
    getBySlug: (slug) => {
        return apiCaller.get(`movie/${slug}`).then((response) => {
            return response.data;
        });
    },
    nominations: () => {
        return apiCaller.get("movie/nominations").then((response) => {
            return response.data;
        });
    },
    oddMovies: () => {
        return apiCaller.get("movie/phim-le").then((response) => {
            return response.data;
        });
    },
    seriesMovies: () => {
        return apiCaller.get("movie/phim-bo").then((response) => {
            return response.data;
        });
    },
    cartoonMovies: () => {
        return apiCaller.get("movie/phim-hoat-hinh").then((response) => {
            return response.data;
        });
    },
    getMoviesBySlugCatAndSlugType: (slugCat, slugType, page) => {
        return apiCaller
            .get(`/type/${slugCat}/${slugType}`, { page })
            .then((response) => {
                return response.data;
            });
    },
    sortViewMovies: (slug) => {
        return apiCaller.get(`movie/sort-view/${slug}`).then((response) => {
            return response.data.data;
        });
    },
    upcomingMovie: () => {
        return apiCaller.get(`movie/upcomingMovie`).then((response) => {
            return response.data;
        });
    },
    lastThreeChapter: (slug) => {
        return apiCaller
            .get(`/movie/${slug}/lastThreeChapter`)
            .then((response) => {
                return response.data;
            });
    },
};

// const handleError = (err) => {
//     console.log(err);
//     return null;
// };
export default MovieAPI;
