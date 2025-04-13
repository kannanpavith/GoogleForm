import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';  // Removed FiSettings since not used
import { AiOutlineEye } from 'react-icons/ai';  // Correct import for eye icon
import { IconButton } from '@mui/material';
import { IoMdFolderOpen } from 'react-icons/io';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import './Formheader.css';
import { useParams } from 'react-router-dom';

// ✅ Online image URLs
const form_image = "https://ssl.gstatic.com/docs/forms/forms_logo_2022q4_48dp.png";
const avatarimage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Formheader = () => {
    const [doc_name, setDocName] = useState("Untitled form");

    const handleDocNameChange = (event) => {
        setDocName(event.target.value);
    };

    return (
        <div className="form_header">
            <div className="form_header_left">
                <img src={form_image} style={{ height: "45px", width: "40px" }} alt="Google Forms logo" />
                <input 
                    type="text" 
                    placeholder="Untitled form" 
                    className="form_name" 
                    value={doc_name} 
                    onChange={handleDocNameChange} 
                />
                <IoMdFolderOpen className="form_header_icon" style={{ marginRight: "10px" }} />
                <FiStar className="form_header_icon" style={{ marginRight: "10px" }} />
                <span style={{ fontSize: "12px", fontWeight: "600" }}>All changes saved in Drive</span>
            </div>
            <div className="form_header_right">
                <IconButton>
                    <ColorLensIcon size="small" className="form_header_icon" />
                </IconButton>
                <IconButton>
                    <AiOutlineEye className="form_header_icon" />
                </IconButton>
                <IconButton>
                    <MoreVertIcon className="form_header_icon" />
                </IconButton>
                <IconButton>
                    <Avatar alt="User Avatar" src={avatarimage} style={{ height: "30px", width: "30px" }} />
                </IconButton>
            </div>
        </div>
    );
};

export default Formheader;
