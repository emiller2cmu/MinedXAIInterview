import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModelDataService from '../services/modelService';
import './modelList.css';

interface iModel {
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
function ModelRow(props: iModel) {

    const [favorite, setFavorite] = useState(props.favorite);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            <TableCell align="left"></TableCell>
            <TableCell align="left">{props.name}</TableCell>
            <TableCell align="left">{props.runtime?.toLocaleString()}</TableCell>
            <TableCell align="left">{props.modelMetric}</TableCell>
            <TableCell align="left">{props.modelPath}</TableCell>
            <TableCell align="left">{props.trainingLoss}</TableCell>
            <TableCell align="left">{props.validationLoss}</TableCell>
            <TableCell align="left">
                {props.notes.length > 30 ? (
                    <>
                        {props.notes.substring(0, 30)}...
                        <Button onClick={handleClickOpen}>...</Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Note Details</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {props.notes}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                ) : (
                    props.notes
                )}
            </TableCell>
            <TableCell align="left">{favorite ?
                <IconButton onClick={toggleButton}><FavoriteIcon /></IconButton> :
                <IconButton onClick={toggleButton}><FavoriteBorderOutlinedIcon /></IconButton>
            }</TableCell>
        </TableRow>
    );
}

export default ModelRow;