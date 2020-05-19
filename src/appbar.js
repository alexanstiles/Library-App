import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Burger from "./burger";
import { Grid } from "@material-ui/core";

export default function Appbar() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Grid container direction="row" spacing={10}>
          <Grid item>
            <Typography variant="h2" color="inherit" noWrap>
              Librario
            </Typography>
          </Grid>
          <Grid item style={{ marginLeft: "auto", paddingTop: "48px" }}>
            <Burger />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
