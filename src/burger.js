
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import firebase from "./firebase";

export default function SimpleMenu() {

  const history = useHistory();
    
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseParam = (props) => {
    let path = props; 
    history.push(path);
    setAnchorEl(null);
  };

  const handleSignout = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  return (
    <div>
      <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon fontSize='large' />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onBlur={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleCloseParam(``)}>Home</MenuItem>
        <MenuItem onClick={() => handleCloseParam(`collection`)}>Collection</MenuItem>
        <MenuItem onClick={() => handleSignout()}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}