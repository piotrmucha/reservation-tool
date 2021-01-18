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
        log out
      </Button>
      <div className="admin-menu">
        <Button color="violet" size="massive" onClick={goCategory}>
          Add a new category
        </Button>
        <Button color="violet" size="massive" onClick={goResource}>
          Add a new resource
        </Button>
      </div>
    </div>
  ) : (
      <ErrorPage message="you do not have admin rights"></ErrorPage>
    );
};

export default AdminMenu;
