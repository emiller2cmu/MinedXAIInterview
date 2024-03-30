import React, { useState, useEffect } from "react";
import ModelDataService from '../services/modelService'

interface iModel{ 
    "name": string; 
    "runtime"?: Date | undefined; 
    "modelMetric": string; 
    "modelPath": string; 
    "trainingLoss": number; 
    "validationLess": number; 
    "notes": string; 
    "favorite": boolean; 
}
function ModelList() {

    const [listOfModels, setListOfModels] = useState<iModel[]>([]);

    useEffect(() => {
        ModelDataService.getAll()
            .then((response: any) => {
                console.log(response.data);
                setListOfModels(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [])

    return (
        <div>
            {listOfModels.map((model, index) => (
                <div key={index}>
                    <p>{model.name}</p>
                    <p>{model.runtime ? model.runtime.toLocaleString() : 'No runtime provided'}</p>
                </div>
            ))}
        </div>
    );
}

export default ModelList;