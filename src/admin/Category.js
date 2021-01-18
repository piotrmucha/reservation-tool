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
          label="Category name"
          placeholder="Enter a name for the category"
          name="categoryName"
          value={categoryName}
          onChange={this.handleChange}
        />
        <Form.TextArea
          label="Description of the category"
          placeholder="Enter a description for the category"
          name="categoryDescription"
          value={categoryDescription}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Category image"
          placeholder="Enter the image address for the category"
          name="categoryImage"
          value={categoryImage}
          onChange={this.handleChange}
        />
        <Form.Button>Add category</Form.Button>
        {this.state.successSend && (
          <Alert severity="success">New category was created correctly</Alert>
        )}
      </Form>
    ) : (
        <ErrorPage message="">you do not have admin rights</ErrorPage>
      );
  }
}

export default Category;
