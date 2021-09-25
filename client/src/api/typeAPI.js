import apiCaller from "../util/apiCaller";

const TypeAPI = {
    getAll: (params) => {
        return apiCaller.get("type", { params });
    },
    getMoviesBySlugCatAndSlugType: (slugCat, slugType, page) => {
        return apiCaller.get(`/type/${slugCat}/${slugType}`, { page });
    },
};

export default TypeAPI;
