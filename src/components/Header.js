import React from 'react';
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import formimage from "../images/forms_2020q4_48dp.png"; 
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import Avatar from "@mui/material/Avatar";
import avatarimage from "../images/forms_2020q4_48dp.png";
import TemporaryDrawer from "./TemporaryDrawer";

const Header = () => {
  return (
    <div className="Header">
      <div className="header_info">
        <TemporaryDrawer />
        <IconButton>
          <MenuIcon />
        </IconButton> 
        <img src={formimage}  style={{height:'40px',width:"40px"}} calssName="form_image" alt="Form Logo" />
      <div className="info">
      Forms
      </div>
      </div>

      <div className="header_search">
        <SearchIcon />
        <input type="text" name="Search" placeholder="Search" />
      </div>

      <div className="header_right">
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <Avatar src={avatarimage} alt="User" />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
