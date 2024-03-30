import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './navbar.css';

export default function ButtonAppBar() {
    return (
        <Box className="navbar" sx={{ width: '70%' }}>
            <Toolbar className="toolbar">
                <div>
                    <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                        <b>Model Viewer</b>
                    </Typography>
                </div>
            </Toolbar>
        </Box>
    );
}