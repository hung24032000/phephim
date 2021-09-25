import axios from "axios";
import * as Config from "../constants/constants";
import queryString from "query-string";
const apiCaller = axios.create({
    baseURL: `${Config.APIEnPoint}`,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

export default apiCaller;
