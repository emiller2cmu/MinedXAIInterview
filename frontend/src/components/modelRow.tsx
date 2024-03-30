import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModelDataService from '../services/modelService'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';import IconButton from '@mui/material/IconButton';
import './modelList.css'

interface iModel{ 
    "id": number;
    "name": string; 
    "runtime"?: Date | undefined; 
    "modelMetric": string; 
    "modelPath": string; 
    "trainingLoss": number; 
    "validationLoss": number; 
    "notes": string; 
    "favorite": boolean; 
}
function ModelList(props: iModel) {

    const [favorite, setFavorite] = useState(props.favorite); 

    function toggleButton() {
        let data = { 
            "id": props.id,
            "name": props.name,
            "runtime": props.runtime,
            "modelMetric": props.modelMetric,
            "modelPath": props.modelPath,
            "trainingLoss": props.trainingLoss,
            "validationLoss": props.validationLoss,
            "notes": props.notes,
            "favorite": !favorite,
        }
        ModelDataService.update(props.id.toString(), data)
            .then((response: any) => {
                console.log(response.data);
                setFavorite(!favorite);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    return (
            <TableRow
              key={props.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{props.name}</TableCell>
              <TableCell align="left">{props.runtime?.toLocaleString()}</TableCell>
              <TableCell align="left">{props.modelMetric}</TableCell>
              <TableCell align="left">{props.modelPath}</TableCell>
              <TableCell align="left">{props.trainingLoss}</TableCell>
              <TableCell align="left">{props.validationLoss}</TableCell>
              <TableCell align="left">{props.notes}</TableCell>
              <TableCell align="left">{ favorite ? 
                <IconButton onClick={toggleButton}><FavoriteIcon/></IconButton> : 
                <IconButton onClick={toggleButton}><FavoriteBorderOutlinedIcon/></IconButton>
                }</TableCell>
            </TableRow>
          );
}

export default ModelList;