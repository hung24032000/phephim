import AuthContextProvider from "./component/contexts/AuthContext";
import ProtectedRoute from "./component/routing/ProtectedRoute";
import Auth from "./component/views/Auth";
import Landing from "./component/layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route
                        exact
                        path="/login"
                        render={(props) => <Auth {...props} />}
                    />
                </Switch>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
