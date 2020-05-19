import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Collection from "./collection";
import Main from "./main";
import Copyright from "./copyright";
import CssBaseline from "@material-ui/core/CssBaseline";
import Appbar from "./appbar";
import firebase from "./firebase";

// use <Router> to change destination
// <Switch> for stuff like error 404 page

function App() {
  const [auth, setAuth] = useState(false);

  function newAccount(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
    if (firebase.auth().currentUser) {
      setAuth(true);
    }
  }

  function signIn(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
    if (firebase.auth().currentUser) {
      console.log("yes!")
      setAuth(true);
    } else {
      console.log("user not signed in");
    }
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {auth ? (
            <Redirect to="/" />
          ) : (
            <>
              <div>Sign in!</div>
              <button onClick={() => signIn("alx@gmail.com", "123456")}>
                Sign In
              </button>
            </>
          )}
        </Route>
        <Route exact path="/">
          {auth ? (
            <>
              <Appbar />
              <CssBaseline />
              <Main />
              <footer>
                <br />
                <Copyright />
              </footer>
              <br />
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/collection">
          {auth ? (
            <>
              <Appbar />
              <CssBaseline />
              <Collection />
              <footer>
                <br />
                <Copyright />
              </footer>
              <br />
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
