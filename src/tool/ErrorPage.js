import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Grid } from "@material-ui/core";
import "./ErrorPage.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ErrorPage(props) {
  const classes = useStyles();

  return (
    <Grid container justify="center" className="grid-class">
      <div className={classes.root}>
        <Alert severity="error" className="test">
          <AlertTitle>Error</AlertTitle>
          {props.message}:{" "}
          <strong>
            <a href="/">Log in</a>
          </strong>
        </Alert>
      </div>
    </Grid>
  );
}
