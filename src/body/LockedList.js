import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import BlockIcon from "@material-ui/icons/Block";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function LockedList(props) {
  const classes = useStyles();
  const [reservations, setReservations] = useState([]);
  const notify = async () => {
    const response = await fetch(
      "http://localhost:8052/api/v1/reservation/resource?resourceName=" +
        props.resourceName,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setReservations(json);
        console.log(json);
      })
      .catch((error) => {
        console.log("siema", error);
      });
    console.log("his");
  };

  useEffect(() => {
    notify();
  }, []);

  return (
    <div>
      <h1>Rezerwacje</h1>
      <List className={classes.root}>
        {reservations.map((item, i) => {
          return (
            <ListItem key={i}>
              <ListItemAvatar>
                <BlockIcon style={{ fill: "red", fontSize: 40 }} />
              </ListItemAvatar>
              <ListItemText
                primary={item.assignTo}
                secondary={item.reservationUntil}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
