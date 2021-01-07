import React from "react";
import {
  AccordionWithHeader,
  AccordionNode,
  AccordionHeader,
  AccordionPanel,
} from "react-accordion-with-header";
import Body from "./../body/Body";
import "./SingleResource.css";
class SingleResource extends React.Component {
  state = { category: this.props.category, resources: [], stan: [] };

  componentDidMount() {
    fetch(
      `http://localhost:8052/api/v1/resource/category/resources?categoryName=` +
        this.state.category
    )
      .then((res) => res.json())
      .then((json) => this.setState({ resources: json }))
      .then(() => console.log(this.state.resources))
      .catch((error) => {
        console.log("siema", error);
      });
  }
  check = (a) => {
    const d = [];
    a.map((i) => {
      d.push(i.open);
    });
    this.setState({ stan: d });
    console.log("ada", this.state.stan);
  };
  getValue = (a, i) => {
    if (a) {
      return a[i];
    } else {
      return true;
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.category}</h1>
        <AccordionWithHeader actionCallback={this.check}>
          {this.state.resources.map((item, i) => {
            return (
              <AccordionNode key={i}>
                <AccordionHeader
                  horizontalAlignment="centerSpaceAround"
                  verticalAlignment="center"
                  className="main-acc"
                >
                  <div>{item.resourceName}</div>
                </AccordionHeader>
                <AccordionPanel speed="500">
                  <Body
                    description={item.resourceDescription}
                    imageLink={item.imageLink}
                    name={item.resourceName}
                    limit={item.howManyPeopleCanShare}
                    localization={item.localization}
                    close={this.getValue(this.state.stan, i)}
                  />
                </AccordionPanel>
              </AccordionNode>
            );
          })}
        </AccordionWithHeader>
      </div>
    );
  }
}
export default SingleResource;
