import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import "./Category.css";
import ErrorPage from "../tool/ErrorPage";
import Alert from "@material-ui/lab/Alert";
class Category extends Component {
  state = {
    categoryName: "",
    categoryDescription: "",
    categoryImage: "",
    isAdmin: localStorage.getItem("isAdmin"),
    successSend: false,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    console.log(this.state);
    // this.setState({ submittedName: name, submittedEmail: email })
    this.addCategoryRequest();
  };
  addCategoryRequest = async () => {
    const { categoryName, categoryDescription, categoryImage } = this.state;
    const response = await fetch(
      "http://localhost:8052/api/v1/resource/category",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: categoryName,
          categoryDescription: categoryDescription,
          imageLink: categoryImage,
        }),
      }
    ).catch((error) => {
      console.log("siema", error);
    });
    if (response) {
      console.log("test");
      var data = response.status;
      if (data === 201) {
        this.setState({
          successSend: true,
          categoryName: "",
          categoryDescription: "",
          categoryImage: "",
        });
        setTimeout(() => this.setState({ successSend: false }), 3000);
      }
    }
  };

  render() {
    const { categoryName, categoryDescription, categoryImage } = this.state;
    return this.state.isAdmin ? (
      <Form className="category-form" onSubmit={this.handleSubmit}>
        <Form.Input
          fluid
          label="Nazwa kategorii"
          placeholder="Wprowadź nazwę kategorii"
          name="categoryName"
          value={categoryName}
          onChange={this.handleChange}
        />
        <Form.TextArea
          label="Opis kategorii"
          placeholder="Wprowadź opis kategorii"
          name="categoryDescription"
          value={categoryDescription}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Obraz kategorii"
          placeholder="Wprowadź adres obrazu do kategorii"
          name="categoryImage"
          value={categoryImage}
          onChange={this.handleChange}
        />
        <Form.Button>Dodaj kategorie</Form.Button>
        {this.state.successSend && (
          <Alert severity="success">Poprawnie utworzono nową kategorie</Alert>
        )}
      </Form>
    ) : (
      <ErrorPage message="nie masz uprawnień administratora"></ErrorPage>
    );
  }
}

export default Category;
