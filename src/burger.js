
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";

export default function SimpleMenu() {

  const history = useHistory();

  const routeChangeA = () =>{ 
    let path = ``; 
    history.push(path);
  }

  const routeChangeB = () =>{ 
    let path = `collection`; 
    history.push(path);
  }
    
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleCloseA = () => {
    routeChangeA();
    setAnchorEl(null);
  };

  const handleCloseB = () => {
    routeChangeB();
    setAnchorEl(null);
  };

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
        onBlur={handleClose}
      >
        <MenuItem onClick={handleCloseA}>Home</MenuItem>
        <MenuItem onClick={handleCloseB}>Collection</MenuItem>
      </Menu>
    </div>
  );
}