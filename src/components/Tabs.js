import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook (for React Router v6)
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        boxShadow: 'none', 
        backgroundColor: '#f9f9f9', 
    },
    tabs: {
        height: 48, 
        padding: '0 16px', 
        backgroundColor: '#f9f9f9', 
        borderBottom: '1px solid #ddd',
    },
    tab: {
        fontSize: 14,
        color: '#5f6368', 
        textTransform: 'none', 
        fontWeight: '600',
        fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
        padding: '10px 20px',
        minWidth: 120, 
        '&:hover': {
            color: '#1a73e8',
            opacity: 1,
        },
        '&.Mui-selected': {
            color: '#1a73e8', 
            fontWeight: '700', 
        },
    },
    indicator: {
        backgroundColor: '#1a73e8',
        height: 3,
    }
});

function CenteredTabs() {
    const classes = useStyles();
    const navigate = useNavigate(); // Initialize useNavigate (for React Router v6)
    const [value, setValue] = useState(0); // State to track selected tab

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Navigate to the corresponding route based on tab selected
        if (newValue === 0) {
            navigate('/form/questions'); // Navigate to 'questions' route
        } else {
            navigate('/form/responses'); // Navigate to 'responses' route
        }
    };

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value} // Bind the selected tab value
                onChange={handleChange} // Handle tab change
                classes={{
                    root: classes.tabs,
                    indicator: classes.indicator,
                }}
                textColor="primary"
                indicatorColor="primary"
                centered
            >
                <Tab label="Questions" className={classes.tab} />
                <Tab label="Responses" className={classes.tab} />
            </Tabs>
        </Paper>
    );
}

export default CenteredTabs;
