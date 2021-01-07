import React, { useEffect } from "react";
import ReservationForm from "./../tool/ReservationForm";
import LockedList from "./LockedList";
import { useState } from "react";
import { Image, Item } from "semantic-ui-react";
import "./Body.css";
export default function Body(props) {
  const [limitForResource, setlimitForResource] = useState(props.limit);
  const [currentUsage, setcurrentUsage] = useState(1);
  const [name, setname] = useState(props.name);

  const renderFunction = () => {
    console.log(name, currentUsage, limitForResource);
    fetch(
      `http://localhost:8052/api/v1/reservation/resource/limit?resourceName=` +
        name
    )
      .then((res) => res.text())
      .then((value) => {
        setcurrentUsage(value);
      })
      .catch((error) => {
        console.log("siema", error);
      });
  };

  useEffect(() => {
    renderFunction();
  });
  if (props.close) {
    return (
      <div className="full-items">
        <Item.Group>
          <Item>
            <Item.Image size="small" src={props.imageLink} />

            <Item.Content>
              <Item.Header as="a">{props.name}</Item.Header>
              <Item.Meta>
                <span className="locali">{props.localization}</span>
              </Item.Meta>
              <Item.Description>{props.description}</Item.Description>
            </Item.Content>
          </Item>
          {currentUsage >= limitForResource ? (
            <LockedList resourceName={name}></LockedList>
          ) : (
            <ReservationForm
              resourceName={props.name}
              renderFunction={renderFunction}
            ></ReservationForm>
          )}
        </Item.Group>
      </div>
    );
  } else {
    return null;
  }
}
