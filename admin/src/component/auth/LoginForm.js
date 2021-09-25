import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
        },
        btnSubmit: {
            backgroundColor: "#66bb6a",
            margin: "0 auto",
            "&:hover": {
                backgroundColor: "#66bb6a",
            },
        },
    })
);

const LoginForm = () => {
    const { loginUser } = useContext(AuthContext);
    const classes = useStyles();
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(user);
            if (loginData) {
                console.log("Login Success");
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form className={classes.root} onSubmit={handleOnSubmit}>
            <TextField
                label="Tài Khoản"
                style={{ margin: 12 }}
                placeholder="Nhập Tài Khoản Truy Cập"
                fullWidth
                className={classes.textField}
                onChange={handleOnChange}
                name="username"
                value={user.username}
                InputLabelProps={{
                    shrink: true,
                    style: { color: "#fff" },
                }}
                inputProps={{
                    style: { color: "#fff" },
                }}
                variant="filled"
            />
            <TextField
                label="Mật Khẩu"
                style={{ margin: 12 }}
                placeholder="Nhập Mật Khẩu"
                name="password"
                value={user.password}
                fullWidth
                className={classes.textField}
                onChange={handleOnChange}
                InputLabelProps={{
                    shrink: true,
                    style: { color: "#fff" },
                }}
                inputProps={{
                    type: "password",
                    style: { color: "#fff" },
                }}
                variant="filled"
            />
            <Button
                variant="contained"
                className={classes.btnSubmit}
                type="submit"
            >
                Đăng Nhập
            </Button>
        </form>
    );
};

export default LoginForm;
