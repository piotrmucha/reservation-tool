import React from "react";
import "./Register.css";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
const RegisterForm = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const [userExists, setUserExists] = useState(false);
  const [registerSuccess, setregisterSuccess] = useState(false);

  const notify = async (email) => {
    const response = await fetch(
      "http://localhost:8050/api/v1/notification/userRegister?clientMail=" +
        email,
      {
        method: "POST",
      }
    ).catch((error) => {
      console.log("siema", error);
    });
    if (response) {
      if (response.status === 201) {
        setregisterSuccess(true);
      }
    }
  };

  const submit = async (formData) => {
    console.log(formData);
    // setSubmitting(true);
    // setServerErrors([]);

    const response = await fetch("http://localhost:8051/api/v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    }).catch((error) => {
      console.log("siema", error);
    });
    var data = 500;
    if (response) {
      data = response.status;
    }
    console.log("response stat", response);
    if (data === 201) {
      console.log("success, redirect to home page");
      notify(formData.email);
      //setServerErrors(data.errors);
    } else if (data === 422) {
      console.log("already exists");
      setUserExists(true);
    } else {
      console.log("error");
    }

    // setSubmitting(false);
  };
  return (
    <div class="ui middle aligned center aligned grid ">
      <div class="column">
        <h2 class="ui teal image header">
          {/* <img src="assets/images/someimage.pgn" class="image" /> */}
          <div class="content">Formularz rejestracyjny</div>
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
            {errors.password && (
              <p class="error-register">{errors.password.message}</p>
            )}
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input
                  type="password"
                  name="password_repeat"
                  placeholder="Powtórz hasło"
                  ref={register({
                    required: "Musisz powtórzyć hasło",
                    validate: (value) =>
                      value === password.current || "Hasła nie pasują",
                  })}
                />
              </div>
            </div>
            {errors.password_repeat && (
              <p class="error-register">{errors.password_repeat.message}</p>
            )}
            <button type="submit" class="ui fluid large teal submit button">
              Zarejestruj się
            </button>
          </div>

          <div class="ui error message"></div>
        </form>
        {userExists && <p class="error-register">Użytkownik już istnieje</p>}
        {registerSuccess && (
          <Alert severity="success">
            Poprawnie się zarejestrowałeś. Sprawdź email i kliknij w link żeby
            potwierdzić założenie konta.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
