import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { IconButton } from '@mui/material';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './Template.css';

const blank = "https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png";
const party = "https://cdn-icons-png.flaticon.com/512/168/168738.png"; 
const contact = "https://cdn-icons-png.flaticon.com/512/747/747376.png"; 

const Template = () => {
  const navigate = useNavigate();
  
  const createForm = (templateType) => {
    const id = uuid();  // Generate new form ID
    console.log("New form ID:", id);  // Debugging log
    navigate(`/form/${id}/${templateType}`);  // Navigate to form with dynamic ID
  };

  return (
    <div className="template_section">
      <div className="template_top">
        <div className="template_left">
          <span style={{ fontSize: '15px', color: '#202124' }}>Start a new form</span>
        </div>
        <div className="template_right">
          <div className="gallery_button">
            Template gallery
            <UnfoldMoreIcon fontSize="small" />
          </div>
          <IconButton>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </div>
      </div>

      <div className="template_body">
        <div className="card" onClick={() => createForm('blank')}>
          <img src={blank} alt="Blank Form" className="card_image" />
          <p className="card_title">Blank</p>
        </div>

        <div className="card" onClick={() => createForm('party')}>
          <img src={party} alt="Party Invite" className="card_image" />
          <p className="card_title">Party Invite</p>
        </div>

        <div className="card" onClick={() => createForm('contact')}>
          <img src={contact} alt="Contact Info" className="card_image" />
          <p className="card_title">Contact Info</p>
        </div>
      </div>
    </div>
  );
};

export default Template;
