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
import IconButton from '@mui/material/IconButton';
import './modelList.css'
import ModelRow from "./modelRow";

interface iModel{ 
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


    useEffect(() => {
        ModelDataService.getAll()
            .then((response: any) => {
                console.log(response.data);
                const sortedData = response.data.sort((a: iModel, b:iModel) => a.id - b.id);
                setListOfModels(sortedData);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [])

    return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dataset Name</TableCell>
            <TableCell align="left">Run Time</TableCell>
            <TableCell align="left">Model Metric</TableCell>
            <TableCell align="left">Model Path</TableCell>
            <TableCell align="left">Training Loss</TableCell>
            <TableCell align="left">Validation Loss</TableCell>
            <TableCell align="left">Notes</TableCell>
            <TableCell align="left">Favorite</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listOfModels.map((row) => (
            <ModelRow id={row.id} name={row.name} runtime={row.runtime} modelMetric={row.modelMetric} modelPath={row.modelPath}
                trainingLoss={row.trainingLoss} validationLoss={row.validationLoss} notes={row.notes} favorite={row.favorite}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}

export default ModelList;