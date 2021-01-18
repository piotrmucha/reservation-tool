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
    setUserExists(false);
    console.log(formData);

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
    } else if (data === 422) {
      console.log("already exists");
      setUserExists(true);
    } else {
      console.log("error");
    }
  };
  return (
    <div class="ui middle aligned center aligned grid ">
      <div class="column">
        <h2 class="ui teal image header">
          <div class="content">Registration form</div>
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
            {errors.password && (
              <p class="error-register">{errors.password.message}</p>
            )}
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input
                  type="password"
                  name="password_repeat"
                  placeholder="Repeat password                  "
                  ref={register({
                    required: "You must repeat the password",
                    validate: (value) =>
                      value === password.current || "Passwords do not match",
                  })}
                />
              </div>
            </div>
            {errors.password_repeat && (
              <p class="error-register">{errors.password_repeat.message}</p>
            )}
            <button type="submit" class="ui fluid large teal submit button">
              Register
            </button>
          </div>

          <div class="ui error message"></div>
        </form>
        {userExists && <p class="error-register">User already exists</p>}
        {registerSuccess && (
          <Alert severity="success">
            You have successfully registered. Check the email and click the link to confirm account creation.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
