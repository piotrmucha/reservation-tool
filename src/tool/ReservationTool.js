import React from "react";
import "./ReservationTool.css";
import ReactDOM from "react-dom";
import SingleResource from "./SingleResource";
import ErrorPage from "./ErrorPage";
import { Item } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

import {
  AccordionWithHeader,
  AccordionNode,
  AccordionHeader,
  AccordionPanel,
} from "react-accordion-with-header";
class BodyTpl extends React.Component {
  renderWholePage = () => {
    ReactDOM.render(
      <SingleResource category={this.props.category} />,
      document.querySelector("#root")
    );
  };

  render() {
    return (
      <div className="full-items">
        <Item.Group>
          <Item>
            <Item.Image size="small" src={this.props.imageLink} />

            <Item.Content>
              <Item.Header as="a">{this.props.name}</Item.Header>
              <Item.Description className="description">
                {this.props.description}
              </Item.Description>
              <br></br>
              <Button positive onClick={this.renderWholePage}>
                Go to resources from category
              </Button>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }
}

class ReservationTools extends React.Component {
  state = { categories: [], email: localStorage.getItem("email") };

  componentDidMount() {
    console.log("czy logged?", this.state.email);
    fetch(`http://localhost:8052/api/v1/resource/category`)
      .then((res) => res.json())
      .then((json) => this.setState({ categories: json }))
      .then(() => console.log(this.state.categories))
      .catch((error) => {
        console.log("siema", error);
      });
  }
  logout = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    return this.state.email ? (
      <div>
        <Button
          color="black"
          size="medium"
          className="exit"
          onClick={this.logout}
        >
          log out
        </Button>
        <AccordionWithHeader className="main">
          {this.state.categories.map((item, i) => {
            return (
              <AccordionNode key={i}>
                <AccordionHeader
                  horizontalAlignment="centerSpaceAround"
                  verticalAlignment="center"
                  className="main-acc"
                >
                  <div>{item.categoryName}</div>
                </AccordionHeader>
                <AccordionPanel>
                  <BodyTpl
                    description={item.categoryDescription}
                    category={item.categoryName}
                    imageLink={item.imageLink}
                  />
                </AccordionPanel>
              </AccordionNode>
            );
          })}
        </AccordionWithHeader>
      </div>
    ) : (
        <div>
          x<ErrorPage message="You're not logged in"></ErrorPage>
        </div>
      );
  }
}

export default ReservationTools;
