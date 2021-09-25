import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import "./css.css";
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: "100%",
        marginTop: 20,
        backgroundColor: "#242526",
    },
    root: {
        color: "#D8D8D8",
        fontSize: "1.3rem",
        backgroundColor: "#333",
    },
    select: {
        fontSize: "1.5rem",
        padding: "10px 20px",
    },
}));

const Filter = () => {
    const classes = useStyles();
    const [filter, setFilter] = useState({
        sort: "",
        type: "",
        category: "",
    });
    const onChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setFilter({ ...filter, [name]: value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Submit");
        console.log(filter);
    };
    return (
        <div className="box-filter">
            <div className="box-filter-header">
                <h2>Lọc Phim</h2>
            </div>
            <div className="box-filter-container">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="label">Sắp Xếp Theo</label>
                        <select
                            name="sort"
                            value={filter.sort}
                            onChange={onChange}
                        >
                            <option value="">-Sắp Xếp-</option>
                            <option value={1}>Theo Lượt Xem</option>
                            <option value={2}>Năm Phát Hành</option>
                            <option value={3}>Tên Phim</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Loại</label>
                        <select
                            name="type"
                            value={filter.type}
                            onChange={onChange}
                        >
                            <option value="">-Loại-</option>
                            <option value={1}>Phim Lẻ</option>
                            <option value={2}>Phim Bộ</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Thể Loại</label>
                        <select
                            name="category"
                            value={filter.category}
                            onChange={onChange}
                        >
                            <option value="">-Thể Loại-</option>
                            <option value={1}>Theo Lượt Xem</option>
                            <option value={2}>Năm Phát Hành</option>
                            <option value={3}>Tên Phim</option>
                        </select>
                    </div>
                    <div className="btn-filter">
                        <Button type="submit">Lọc kết quả</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Filter;
