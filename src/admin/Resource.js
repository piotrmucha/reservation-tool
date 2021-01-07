import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import "./Category.css";
import ErrorPage from "../tool/ErrorPage";
import Alert from "@material-ui/lab/Alert";
const options = [
  { key: "1", text: "1", value: "1" },
  { key: "2", text: "2", value: "2" },
  { key: "3", text: "3", value: "3" },
];

class Resource extends Component {
  state = {
    categories: [],
    resourceName: "",
    resourceDescription: "",
    resourceImage: "",
    localization: "",
    howManyPeopleCanShare: "",
    resourceCategory: "",
    isAdmin: localStorage.getItem("isAdmin"),
    successSend: false,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    console.log(this.state);
    this.addResourceRequest();
  };

  addResourceRequest = async () => {
    const {
      resourceName,
      resourceDescription,
      resourceImage,
      localization,
      howManyPeopleCanShare,
      resourceCategory,
    } = this.state;
    const response = await fetch("http://localhost:8052/api/v1/resource", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resourceName: resourceName,
        resourceDescription: resourceDescription,
        imageLink: resourceImage,
        howManyPeopleCanShare: howManyPeopleCanShare,
        categoryName: resourceCategory,
        localization: localization,
      }),
    }).catch((error) => {
      console.log("siema", error);
    });
    if (response) {
      console.log("test");
      var data = response.status;
      if (data === 201) {
        this.setState({
          successSend: true,
          resourceName: "",
          resourceDescription: "",
          imageLink: "",
          howManyPeopleCanShare: "",
          resourceCategory: "",
          resourceImage: "",
          localization: "",
        });
        setTimeout(() => this.setState({ successSend: false }), 3000);
      }
    }
  };

  getCategories = () => {
    var map = [];
    this.state.categories.map((item, i) => {
      map.push({
        key: item.categoryName,
        text: item.categoryName,
        value: item.categoryName,
      });
    });
    return map;
  };

  componentDidMount() {
    fetch(`http://localhost:8052/api/v1/resource/category`)
      .then((res) => res.json())
      .then((json) => this.setState({ categories: json }))
      .then(() => console.log(this.state.categories))
      .catch((error) => {
        console.log("siema", error);
      });
  }

  render() {
    const {
      resourceName,
      resourceDescription,
      resourceImage,
      localization,
      howManyPeopleCanShare,
      resourceCategory,
    } = this.state;
    return this.state.isAdmin ? (
      <div>
        <Form className="category-form" onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            label="Nazwa zasobu"
            placeholder="Wprowadź nazwę zasobu"
            name="resourceName"
            value={resourceName}
            onChange={this.handleChange}
            width={5}
          />
          <Form.TextArea
            label="Opis zasobu"
            placeholder="Wprowadź opis zasobu"
            name="resourceDescription"
            value={resourceDescription}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Obraz zasobu"
            placeholder="Wprowadź adres obrazu do zasobu"
            name="resourceImage"
            value={resourceImage}
            onChange={this.handleChange}
            width={6}
          />
          <Form.Input
            fluid
            label="Lokalizacja zasobu"
            placeholder="Wprowadź lokalizacje"
            name="localization"
            value={localization}
            onChange={this.handleChange}
            width={6}
          />

          <Form.Select
            fluid
            label="Kategoria"
            options={this.getCategories()}
            placeholder="Wybierz kategorie"
            name="resourceCategory"
            value={resourceCategory}
            onChange={this.handleChange}
            width={2}
          />
          <Form.Select
            fluid
            label="Ile osób może współdzielić zasób"
            name="howManyPeopleCanShare"
            value={howManyPeopleCanShare}
            onChange={this.handleChange}
            options={options}
            placeholder="ilość"
            width={2}
          />
          <Form.Button>Dodaj zasób</Form.Button>
        </Form>
        {this.state.successSend && (
          <Alert severity="success">Poprawnie utworzono nowy zasób</Alert>
        )}
      </div>
    ) : (
      <ErrorPage message="nie masz uprawnień administratora"></ErrorPage>
    );
  }
}

export default Resource;
