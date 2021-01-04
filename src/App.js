import React from 'react';
import {Router} from "react-router-dom";

import Nav from "./Nav/Nav";
import SideBar from "./SideBar/SideBar";
import Footer from "./Footer/Footer";
import history from "./history";
import Project from "./pages/MainNavigation";
import IdleTimerContainer from "./components/IdleTimerContainer";

function App() {
    console.log("env: ", process.env);
  return (
    <div className="wrapper">
        <IdleTimerContainer/>
        <Router history={history}>
          <SideBar/>
          <div className="main-panel">
              <Nav/>
              <div className="content">
                <Project/>
              </div>
              <Footer/>
          </div>
        </Router>
    </div>
  );
}

export default App;
