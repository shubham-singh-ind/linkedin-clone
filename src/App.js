import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

import "./App.css";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import { useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

// Redux
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
