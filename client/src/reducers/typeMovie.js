import * as actionType from "../actions/configActionType";

let initialState = {
    listCoutry: [
        {
            name: "Tây Ban Nha",
            slug: "viet-nam",
        },
        {
            name: "Pháp",
            slug: "phap",
        },
        {
            name: "Ấn Độ",
            slug: "an-do",
        },
        {
            name: "Thái Lan",
            slug: "thai-lan",
        },
        {
            name: "Âu Mỹ",
            slug: "au-my",
        },
        {
            name: "Nhật Bản",
            slug: "nhat-ban",
        },
        {
            name: "HongKong",
            slug: "hongkong",
        },
        {
            name: "Đài Loan",
            slug: "thai-lan",
        },
        {
            name: "Trung Quốc",
            slug: "trung-quoc",
        },
        {
            name: "Việt Nam",
            slug: "viet-nam",
        },
    ],
    listTypeMovie: [],
};
const typeMovie = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionType.GET_ALL_TYPE:
            const newArray = payload;
            state = { ...state, listTypeMovie: newArray };
            return state;
        default:
            return state;
    }
};

export default typeMovie;
