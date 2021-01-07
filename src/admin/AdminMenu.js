import React from "react";
import { Button } from "semantic-ui-react";
import "./AdminMenu.css";
import ErrorPage from "../tool/ErrorPage";
import { useHistory } from "react-router-dom";
const AdminMenu = () => {
  const history = useHistory();
  const isAdmin = localStorage.getItem("isAdmin");

  const goCategory = () => {
    history.push("/categoryAdmin");
  };
  const goResource = () => {
    history.push("/resourceAdmin");
  };
  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  console.log(isAdmin);
  return isAdmin ? (
    <div>
      <Button color="black" size="medium" className="exit" onClick={logout}>
        wyloguj
      </Button>
      <div className="admin-menu">
        <Button color="violet" size="massive" onClick={goCategory}>
          Dodaj nową kategorie
        </Button>
        <Button color="violet" size="massive" onClick={goResource}>
          Dodaj nowy zasób
        </Button>
      </div>
    </div>
  ) : (
    <ErrorPage message="nie masz uprawnień administratora"></ErrorPage>
  );
};

export default AdminMenu;
