import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../img/inTouch.png";

import Step1 from "../img/howto/Step1.png";
import Step2 from "../img/howto/Step2.png";
import Step3 from "../img/howto/Step3.png";
import Step4 from "../img/howto/Step4.png";

const styles = {
  largeIcon: {
    width: 40,
    height: 45,
  },
};
const Home = () => {
  const navigate = useNavigate();

  const [showHowTo, setshowHowTo] = useState(false);
  return (
    <div className="">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="inTouch Logo" />
        <h1 className="App-title">Welcome to Stevens inTouch!</h1>
      </header>
      <br />
      <br />
      <p>
        Hello! And welcome to Stevens inTouch. To begin, kindly generate your
        Canvas Access Token, and then click the Sign Up button below. If you are
        already a registered user of inTouch, use the Sign in button to sign in
        to your account. If you do not know how to generate your Access token,
        click{" "}
        <Link
          onClick={() => {
            setshowHowTo(true);
          }}
        >
          here
        </Link>
        {/* <Link to="/token-how-to">here</Link> */}
      </p>
      <br />
      <button onClick={() => navigate("/signup")}>Sign up</button>
      <span> </span>
      <button onClick={() => navigate("/login")}>Sign in</button>

      {/*  */}
      {showHowTo && (
        <div className="modal1">
          <div className="modal-contents">
            <div
              className="howto-toggle"
              onClick={() => {
                setshowHowTo(false);
              }}
            >
              <CloseOutlinedIcon style={styles.largeIcon} />
            </div>
            <h1>Follow the steps below to generate your access token!</h1>
            <br />
            <h2>Step 1</h2>
            <img
              className="howToImg"
              src={Step1}
              alt="Navigate to your stevens canvas account, and go to settings."
            />
            <br />
            <br />
            <h2>Step 2</h2>
            <img
              className="howToImg"
              src={Step2}
              alt="Scroll down to Approved Integrations, and click the New Access Token button."
            />
            <br />
            <br />
            <h2>Step 3</h2>
            <img
              className="howToImg"
              src={Step3}
              alt="You can type in the purpose of the access token, and choose an expiry date for the token. We only require your token the first time you sign up, so you can set an expiry date of the next day if you'd like. Click Generate Token once you're done."
            />
            <br />
            <br />
            <h2>Step 4</h2>
            <img
              className="howToImg"
              src={Step4}
              alt="Copy the Access Token that is displayed. Remember to copy it before shutting this window, as once you shut it you will not be able to access it again. You will have to perform the process all over again and generate a new access token if you do not copy it. Now head over to Sign Up and create your account!"
            />
          </div>
          <button
            className="btn btn-danger "
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      )}

      {/*  */}
    </div>
  );
};

export default Home;
