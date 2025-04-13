import React from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import docs from "../images/icons8-google-docs-48.png";
import sheets from "../images/icons8-google-sheets-48.png";
import slides from "../images/icons8-google-slides-48.png";
import forms from "../images/icons8-google-forms-48.png";
import { FiSettings } from 'react-icons/fi';
import { BsQuestionCircle } from 'react-icons/bs';
import './Drawer.css';

const TemporaryDrawer = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div style={{ width: 250 }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {/* Google logo */}
        <ListItem>
          <ListItemText>
            <span style={{ color: "blue", fontWeight: 700, fontSize: "22px", fontFamily: " 'Product Sans',Arial,sans-serif" }}>G</span>
            <span style={{ color: "red", fontWeight: 500, fontSize: "22px", fontFamily: " 'Product Sans',Arial,sans-serif" }}>o</span>
            <span style={{ color: "yellow", fontWeight: 500, fontSize: "22px", fontFamily: " 'Product Sans',Arial,sans-serif" }}>o</span>
            <span style={{ color: "blue", fontWeight: 500, fontSize: "22px", fontFamily: " 'Product Sans',Arial,sans-serif" }}>g</span>
            <span style={{ color: "green", fontWeight: 500, fontSize: "22px", fontFamily: " 'Product Sans',Arial,sans-serif" }}>l</span>
            <span style={{ color: "red", fontWeight: 500, fontSize: "22px", fontFamily: " 'Product Sans',Arial,sans-serif" }}>e</span>
            <span style={{ color: "#5f6368", fontWeight: 500, fontSize: "22px", fontFamily: " 'Product Sans',Arial,sans-serif" }}> DOCS</span>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />

      {/* Menu Items: Docs, Sheets, Slides, Forms */}
      <List>
        {[{ text: 'Docs', icon: docs }, { text: 'Sheets', icon: sheets }, { text: 'Slides', icon: slides }, { text: 'Forms', icon: forms }].map((item, index) => (
          <ListItem button key={index}>
            <img src={item.icon} alt={item.text} style={{ width: 24, marginRight: 10 }} />
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Settings & Help & Feedback */}
      <List>
        <ListItem button className="list_item">
          <FiSettings style={{ marginRight: 10 }} />
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button className="list_item">
          <BsQuestionCircle style={{ marginRight: 10 }} />
          <ListItemText primary="Help & Feedback" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer("left", true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={state.left}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default TemporaryDrawer;
