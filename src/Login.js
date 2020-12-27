import React from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const handleClick = (prop) => {
    console.log(prop);
    prop.preventDefault();
    history.push("/register");
  };

  return (
    <div class="ui middle aligned center aligned grid ">
      <div class="column">
        <h2 class="ui teal image header">
          {/* <img src="assets/images/logo.png" class="image" /> */}
          <div class="content">Zaloguj się</div>
        </h2>
        <form class="ui large form">
          <div class="u">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" placeholder="Adres email" />
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Hasło" />
              </div>
            </div>
            <div class="ui fluid large teal submit button">Login</div>
          </div>

          <div class="ui error message"></div>
        </form>

        <div class="ui message">
          Nie masz jeszcze konta?
          <p id="text" onClick={handleClick}>
            Zarejestruj się
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
