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
    console.log(prop);
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
      //setServerErrors(data.errors);
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

    // setSubmitting(false);
  };

  return (
    <div class="ui middle aligned center aligned grid ">
      <div class="column">
        <h2 class="ui teal image header">
          {/* <img src="assets/images/logo.png" class="image" /> */}
          <div class="content">Zaloguj się</div>
        </h2>
        <form class="ui large form" onSubmit={handleSubmit(submit)}>
          <div class="u">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="Adres email"
                  ref={register({
                    required: "Musisz podać Email",
                  })}
                />
              </div>
            </div>
            {errors.email && (
              <p class="error-register">{errors.email.message}</p>
            )}
            {userNotExists && (
              <p class="error-register">
                Użytkownik o podanym adresie email nie istnieje
              </p>
            )}
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Hasło"
                  ref={register({
                    required: "Musisz wprowadzić hasło",
                  })}
                />
              </div>
            </div>
            {passwordIncorrect && (
              <p class="error-register">Niepoprawne hasło</p>
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
            Użytkownik nie potwierdził jeszcze konta.
          </p>
        )}
        {serverError && (
          <p class="error-register">Błąd połączenia z serwerem</p>
        )}
        <div class="ui message">
          Nie masz jeszcze konta?
          <br></br>
          <a href="#" onClick={handleClick}>
            Zarejestruj się
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
