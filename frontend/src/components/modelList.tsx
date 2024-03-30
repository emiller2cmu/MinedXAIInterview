import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModelDataService from '../services/modelService'
import IconButton from '@mui/material/IconButton';
import ModelRow from "./modelRow";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';
import { useForm, Controller } from "react-hook-form";

interface iModel {
    "id": number
    "name": string;
    "runtime"?: Date | undefined;
    "modelMetric": string;
    "modelPath": string;
    "trainingLoss": number;
    "validationLoss": number;
    "notes": string;
    "favorite": boolean;
}
function ModelList() {

    const [listOfModels, setListOfModels] = useState<iModel[]>([]);
    const [filterFavorites, setFilterFavorites] = useState(true);

    const [refreshList, setRefreshList] = useState(false);

    const [open, setOpen] = useState(false);

    function toggleFavorites() {
        setRefreshList(!refreshList);
        setFilterFavorites(!filterFavorites);
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        ModelDataService.getAll()
            .then((response: any) => {
                console.log(response.data);
                const sortedData = response.data.sort((a: iModel, b: iModel) => b.id - a.id);
                setListOfModels(sortedData);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [refreshList])

    const handleAdd = async (data: any) => {
        let newModel = {
            "id": data.id,
            "name": data.name,
            "runtime": data.runtime,
            "modelMetric": data.modelMetric,
            "modelPath": data.modelPath,
            "trainingLoss": data.trainingLoss,
            "validationLoss": data.validationLoss,
            "notes": data.notes,
            "favorite": false,
        }
        ModelDataService.create(newModel)
            .then((response: any) => {
                console.log(response.data);
                setRefreshList(!refreshList);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        handleClose();
        reset();
    };

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            modelMetric: '',
            modelPath: '',
            trainingLoss: 0,
            validationLoss: 0,
            notes: '',
            runtime: new Date(),
        }
    });

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(handleAdd)}>
                    <DialogTitle>Add New Model</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the following information to add your model.
                        </DialogContentText>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} autoFocus margin="dense" label="Dataset Name" fullWidth />
                            )}
                        />
                        <Controller
                            name="runtime"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} autoFocus margin="dense" label="Run Time" fullWidth />
                            )}
                        />
                        <Controller
                            name="modelMetric"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} autoFocus margin="dense" label="Model Metric" fullWidth />
                            )}
                        />
                        <Controller
                            name="modelPath"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} autoFocus margin="dense" label="Model Path" fullWidth />
                            )}
                        />
                        <Controller
                            name="trainingLoss"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} autoFocus margin="dense" label="Training Loss" fullWidth />
                            )}
                        />
                        <Controller
                            name="validationLoss"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} autoFocus margin="dense" label="Validation Loss" fullWidth />
                            )}
                        />
                        <Controller
                            name="notes"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} autoFocus margin="dense" label="Notes" fullWidth />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add Model</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <div>
                <TableContainer component={Paper} sx={{ width: "70vw" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"><IconButton onClick={handleClickOpen}><AddCircleIcon sx={{ color: "#4FC828" }} /></IconButton></TableCell>
                                <TableCell sx={{ fontSize: '16px' }}><b>Dataset Name</b></TableCell>
                                <TableCell align="left" sx={{ fontSize: '16px' }}><b>Run Time</b></TableCell>
                                <TableCell align="left" sx={{ fontSize: '16px' }}><b>Model Metric</b></TableCell>
                                <TableCell align="left" sx={{ fontSize: '16px' }}><b>Model Path</b></TableCell>
                                <TableCell align="left" sx={{ fontSize: '16px' }}><b>Training Loss</b></TableCell>
                                <TableCell align="left" sx={{ fontSize: '16px' }}><b>Validation Loss</b></TableCell>
                                <TableCell align="left" sx={{ fontSize: '16px' }}><b>Notes</b></TableCell>
                                <TableCell align="left">Favorite
                                    <FormGroup>
                                        <FormControlLabel onClick={toggleFavorites} control={<Switch defaultChecked />} label="" />
                                    </FormGroup></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listOfModels.filter(row => !filterFavorites || row.favorite).map((row) => (
                                <ModelRow key={row.id} {...row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default ModelList;