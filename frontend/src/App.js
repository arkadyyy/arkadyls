import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import store from "./Redux/store";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const lang = useSelector((state) => state.language);
  console.log("lang : ", lang);
  console.log(store);
  const dir = lang === "EN" ? "ltr" : "rtl";
  // document.getElementsByTagName("html")[0].setAttribute("dir", dir);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' exact component={Dashboard} />
          <Route exact path='/sign_in' exact component={SignIn} />
          <Route exact path='/sign_up' exact component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
