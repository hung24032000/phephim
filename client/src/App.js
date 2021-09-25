import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./assets/css/app.css";
import RouteCustomHome from "./component/Layout/RouteCustomHome";
import RouteCustom from "./component/routing/RouteCustom";
import RouteCustomList from "./component/routing/RouteCustomList";
import RouteCustomView from "./component/routing/RouteCustomView";
import DetailMovie from "./component/views/DetailMovie";
import Home from "./component/views/Home";
import ListPage from "./component/views/ListPage";
import ViewMovie from "./component/views/ViewMovie";
function App() {
    const theme = createMuiTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200,
            },
        },
    });

    return (
        <Router>
            <Switch>
                <MuiThemeProvider theme={theme}>
                    <RouteCustomList
                        exact
                        path="/danh-sach/:type/:category"
                        component={ListPage}
                    />
                    <RouteCustom
                        exact
                        path="/phim/:slug"
                        component={DetailMovie}
                    />
                    <RouteCustomView
                        exact
                        path="/phim/:slug/xem-phim"
                        component={ViewMovie}
                    ></RouteCustomView>
                    <RouteCustomHome exact path="/trang-chu" component={Home} />
                    <RouteCustomHome exact path="/" component={Home} />
                </MuiThemeProvider>
            </Switch>
        </Router>
    );
}

export default App;
