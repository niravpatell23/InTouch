import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import queries from "../queries";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import store from "../store";
import Swal from "sweetalert2";
import { isLoggedIn } from "../helper";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";

const Login = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/main", { replace: true });
    }
  }, []);
  let dispatch = useDispatch();
  const [loginUser] = useLazyQuery(
    queries.user.LOGIN,
    {
      enabled: false,
    },
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function GuestLogin(e, credentials) {
    e.preventDefault();
    const { data } = await loginUser({ variables: credentials });
    if (data.loginUser === null) {
      throw new Error("Either username or password is invalid");
    }
    if (data.loginUser && data.loginUser !== null) {
      dispatch(actions.storeToken(data.loginUser.token));
      localStorage.setItem("token", data.loginUser.token);
      localStorage.setItem("userId", data.loginUser.userId);
      Swal.fire({
        title: "Yay!",
        text: "Successful Login",
        icon: "success",
      });
      setEmail("");
      setPassword("");
      navigate("/main");
    }
  }

  async function PostData(e, direct) {
    e.preventDefault();
    console.log(email, password);
    try {
      if ((!email || email.trim() == "") && !direct?.email) {
        Swal.fire({
          title: "Error!",
          text: "Please enter email to login!",
          icon: "error",
          confirmButtonText: "I'll fix it!",
        });
        // setEmail("");
        return;
      }
      if ((!password || password == "") && !direct?.password) {
        Swal.fire({
          title: "Error!",
          text: "Please enter password to login!",
          icon: "error",
          confirmButtonText: "I'll fix it!",
        });
        // setPassword("");
        return;
      }
      const { data } = await loginUser({ variables: { email, password } });
      if (data.loginUser === null) {
        throw new Error("Either username or password is invalid");
      }
      if (data.loginUser && data.loginUser !== null) {
        dispatch(actions.storeToken(data.loginUser.token));
        localStorage.setItem("token", data.loginUser.token);
        localStorage.setItem("userId", data.loginUser.userId);
        Swal.fire({
          title: "Yay!",
          text: "Successful Login",
          icon: "success",
        });
        setEmail("");
        setPassword("");
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Oops!",
        text: error.message,
        icon: "error",
        confirmButtonText: "I'll fix it!",
      });
    }
  }

  return (
    <div className="main">
      <section className="signup">
        <div className="container2">
          <div className="">
            <form className="signup-form" onSubmit={PostData}>
              <h2 className="form-title">Login as guest</h2>

              {/*  */}

              <Grid
                container
                spacing={3}
                style={{ marginTop: "0px", padding: "1% 5%" }}
              >
                {/*  */}
                <Grid item xs={12} sm={6} md={6} lg={6} key={0}>
                  <Card
                    style={{
                      borderRadius: "7px",
                      height: "50vh",
                      // width: "25vh",
                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      component="img"
                      style={{ height: "30vh" }}
                      image={"https://www.w3schools.com/howto/img_avatar.png"}
                      // alt={user.name}
                      onClick={() => {
                        // navigate(`/user/${user._id}`, {
                        //   state: {
                        //     prevLocation: window.location.pathname,
                        //     prevElement: props.currentBody,
                        //   },
                        // });
                      }}
                    />
                    <CardContent
                      onClick={() => {
                        // navigate(`/user/${user._id}`, {
                        //   state: {
                        //     prevLocation: window.location.pathname,
                        //     prevElement: props.currentBody,
                        //   },
                        // });
                        // setBody("user");
                      }}
                    >
                      <Typography
                        style={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                        }}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {"John Doe"}
                      </Typography>
                    </CardContent>

                    <CardActions style={{ justifyContent: "center" }}>
                      {/*  */}
                      {/* <form className="signup-form" onSubmit={PostData}>
                        <br />

                        <button className="btn-lg btn-danger" type="submit">
                          Log In john1
                        </button>
                      </form> */}
                      {/*  */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          GuestLogin(e, {
                            email: "johndoe1@stevens.edu",
                            password: "John123!",
                          });
                        }}
                      >
                        Select
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6} key={1}>
                  <Card
                    style={{
                      borderRadius: "7px",
                      height: "50vh",

                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      component="img"
                      style={{ height: "30vh" }}
                      image={"https://www.w3schools.com/howto/img_avatar2.png"}
                      // alt={user.name}
                      onClick={() => {
                        // navigate(`/user/${user._id}`, {
                        //   state: {
                        //     prevLocation: window.location.pathname,
                        //     prevElement: props.currentBody,
                        //   },
                        // });
                      }}
                    />
                    <CardContent
                      onClick={() => {
                        // navigate(`/user/${user._id}`, {
                        //   state: {
                        //     prevLocation: window.location.pathname,
                        //     prevElement: props.currentBody,
                        //   },
                        // });
                        // setBody("user");
                      }}
                    >
                      <Typography
                        style={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                        }}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {"Jane Doe"}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          GuestLogin(e, {
                            email: "janedoe778@stevens.edu",
                            password: "Jane123!",
                          });
                        }}
                      >
                        Select
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </section>
      <br></br>

      <section className="signup">
        <div className="container1">
          <div className="">
            <h2 className="form-title">OR</h2>
          </div>
        </div>
      </section>

      <br></br>

      <section className="signup">
        <div className="container1">
          <div className="signup-content">
            <form className="signup-form" onSubmit={PostData}>
              <h2 className="form-title">Login</h2>

              <div className="form-group">
                <label>
                  Enter your email
                  <br />
                  <input
                    className="form-input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  ></input>
                </label>
              </div>

              <div className="form-group">
                <label>
                  Enter your password
                  <br />
                  <input
                    className="form-input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  ></input>
                </label>
              </div>
              <br />

              <button className="btn-lg btn-danger" type="submit">
                Log In
              </button>
            </form>
            <p className="loginhere">
              Don't have an account ?
              <Link
                to={`/signup`}
                className="loginhere-link"
                variant="contained"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
      <br></br>
    </div>
  );
};

export default Login;
