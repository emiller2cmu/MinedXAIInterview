import React, { useState } from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
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
import DeleteIcon from '@mui/icons-material/Delete';

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

    const [removeRow, setRemoveRow] = useState(false); 

    const currentTime = new Date(); 
    const oneWeekBefore = new Date(currentTime.getTime() - 7 * 24 * 60 * 60 * 1000);
    const runTime = props.runtime ? new Date(props.runtime) : null;
    const isEarlier = runTime && runTime < oneWeekBefore; 
    

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
            sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover .deleteIcon': {
                    visibility: 'visible'
                }
            }}
        >
            <TableCell align="left"><IconButton className="deleteIcon" sx={{ visibility: 'hidden' }}><DeleteIcon></DeleteIcon></IconButton></TableCell>
            <TableCell align="left" sx={{ fontSize: '16px' }}>{props.name}</TableCell>
            <TableCell align="left" sx={{ fontSize: '16px' }}>{props.runtime?.toLocaleString()}</TableCell>
            <TableCell align="left" sx={{ fontSize: '16px' }}>{props.modelMetric}</TableCell>
            <TableCell align="left" sx={{ fontSize: '16px' }}>{props.modelPath}</TableCell>
            <TableCell align="left" sx={{ fontSize: '16px' }}>{props.trainingLoss}</TableCell>
            <TableCell align="left" sx={{ fontSize: '16px' }}>{props.validationLoss}</TableCell>
            <TableCell align="left" sx={{ fontSize: '16px' }}>
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
                <IconButton onClick={toggleButton}><FavoriteIcon sx={{ color: "#2196f3" }} /></IconButton> :
                <IconButton onClick={toggleButton}><FavoriteBorderOutlinedIcon sx={{ color: "#2196f3" }} /></IconButton>
            }</TableCell>
            <TableCell align="left" sx={{ fontSize: '16px' }}>{isEarlier ? 'Not Completed' : 'Completed'}</TableCell>
        </TableRow>
    );
}

export default ModelRow;