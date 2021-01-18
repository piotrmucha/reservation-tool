import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import UserProfile from "./UserProfile";
import "./Login.css";
const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [userNotExists, setUserNotExists] = useState(false);
  const [passwordIncorrect, setpasswordIncorrect] = useState(false);
  const [userNotConfirmed, setuserNotConfirmed] = useState(false);
  const [serverError, setserverError] = useState(false);
  useEffect(() => {
    console.log(localStorage.getItem("email"));
    if (localStorage.getItem("isAdmin")) {
      history.push("/adminMenu");
    } else if (localStorage.getItem("email")) {
      history.push("/reservationTool");
    }
  });

  const handleClick = (prop) => {
    prop.preventDefault();
    history.push("/register");
  };
  const checkIfAdministrator = async (email) => {
    const response = await fetch(
      "http://localhost:8051/api/v1/user/administrator?mail=" + email,
      {
        method: "GET",
      }
    ).catch((error) => {
      console.log("siema", error);
      setserverError(true);
    });
    var data = 500;
    if (response) {
      console.log("response stat", response);
      data = response.status;
    }
    if (data === 200) {
      console.log("success login");
      localStorage.setItem("isAdmin", "true");
      history.push("/adminMenu");
    } else if (data === 404) {
      localStorage.setItem("email", email);
      history.push("/reservationTool");
    } else {
      console.log("error");
      setserverError(true);
    }
  };
  const checkIfApproved = async (email) => {
    const response = await fetch(
      "http://localhost:8051/api/v1/user/confirmation/" + email,
      {
        method: "GET",
      }
    ).catch((error) => {
      console.log("siema", error);
      setserverError(true);
    });
    var data = 500;
    if (response) {
      console.log("response stat", response);
      data = response.status;
    }
    if (data === 200) {
      checkIfAdministrator(email);
    } else if (data === 403) {
      console.log("user not confirmed");
      setuserNotConfirmed(true);
    } else {
      console.log("error");
      setserverError(true);
    }
  };

  const verifyPassword = async (email, password) => {
    const response = await fetch(
      "http://localhost:8051/api/v1/user/password?mail=" +
      email +
      "&password=" +
      password,
      {
        method: "GET",
      }
    ).catch((error) => {
      console.log("siema", error);
      setserverError(true);
    });
    var data = 500;
    if (response) {
      console.log("response stat", response);
      data = response.status;
    }
    if (data === 200) {
      checkIfApproved(email);
      console.log("success login");
    } else if (data === 403) {
      console.log("password incorrect");
      setpasswordIncorrect(true);
    } else {
      console.log("error");
      setserverError(true);
    }
  };

  const submit = async (formData) => {
    console.log("siema", formData);
    setserverError(false);
    setUserNotExists(false);
    setpasswordIncorrect(false);
    setuserNotConfirmed(false);
    const response = await fetch(
      "http://localhost:8051/api/v1/user/" + formData.email,
      {
        method: "GET",
      }
    ).catch((error) => {
      console.log("siema", error);
      setserverError(true);
    });
    var data = 500;
    if (response) {
      data = response.status;
    }
    console.log("response stat", response);
    if (data === 200) {
      console.log("success, redirect to home page");
      verifyPassword(formData.email, formData.password);
      //setServerErrors(data.errors);
    } else if (data === 404) {
      console.log("already exists");
      setUserNotExists(true);
    } else {
      console.log("error");
      setserverError(true);
    }
  };

  return (
    <div class="ui middle aligned center aligned grid ">
      <div class="column">
        <h2 class="ui teal image header">
          <div class="content">Log in to the application</div>
        </h2>
        <form class="ui large form" onSubmit={handleSubmit(submit)}>
          <div class="u">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  ref={register({
                    required: "You must provide an Email",
                  })}
                />
              </div>
            </div>
            {errors.email && (
              <p class="error-register">{errors.email.message}</p>
            )}
            {userNotExists && (
              <p class="error-register">
                The user with the given email address does not exist
              </p>
            )}
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={register({
                    required: "You must enter a password",
                  })}
                />
              </div>
            </div>
            {passwordIncorrect && (
              <p class="error-register">Incorrect password</p>
            )}
            {errors.password && (
              <p class="error-register">{errors.password.message}</p>
            )}
            <button type="submit" class="ui fluid large teal submit button">
              Login
            </button>
          </div>

          <div class="ui error message"></div>
        </form>
        {userNotConfirmed && (
          <p class="error-register">
            The user has not yet confirmed the account.
          </p>
        )}
        {serverError && (
          <p class="error-register">Server connection error</p>
        )}
        <div class="ui message">
          You dont have an account yet?
          <br></br>
          <a href="#" onClick={handleClick}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
