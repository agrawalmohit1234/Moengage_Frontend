import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import auth from "./../auth/auth-helper";
import SignUp from "./../user/Signup";
import SearchAnime from "./SearchAnime";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.text.secondary,
  },
  media: {
    minHeight: 400,
  },
}));

export default function Home({ history }) {
  const classes = useStyles();
  const [defaultPage, setDefaultPage] = useState(false);

  useEffect(() => {
    setDefaultPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated());
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <div className={classes.root}>
      {!defaultPage && (
        <div>
          <SignUp />
        </div>
      )}
      {defaultPage && (
        <Grid container spacing={8}>
          <div className="container">
            <h1 className="title">Anime Search</h1>
            <SearchAnime />
          </div>
        </Grid>
      )}
    </div>
  );
}
