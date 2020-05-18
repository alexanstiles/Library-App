import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Collection from "./collection";
import Main from "./main";
import Copyright from "./copyright";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Burger from "./burger";
import { Grid } from "@material-ui/core";

// use <Router> to change destination
// <Switch> for stuff like error 404 page

function App() {
  return (
    <Router>
      <AppBar position="relative">
        <Toolbar>
          <Grid container direction="row" spacing={10}>
            <Grid item>
              <Typography variant="h2" color="inherit" noWrap>
                Librario
              </Typography>
            </Grid>
            <Grid item style={{marginLeft: 'auto', paddingTop: '48px'}}>
              <Burger />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/login">
          <div>Sign in</div> 
        </Route>
        <Route exact path="/">
          <CssBaseline />
          <Main />
          <footer>
            <br />
            <Copyright />
          </footer>
          <br />
        </Route>
        <Route exact path="/collection">
          <CssBaseline />
          <Collection />
          <footer>
            <br />
            <Copyright />
          </footer>
          <br />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
