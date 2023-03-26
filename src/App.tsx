import React, {useState} from 'react';
import './App.css';

interface ParamInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const ParamInput: React.FC<ParamInputProps> = ({label, value, onChange}) => {
    return (
        <div>
            <label>{label}</label>
            <input type="text" value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
};

interface Param {
    id: string;
    label: string;
    value: string;
}

interface Model {
    id: string;
    name: string;
    params: Param[];
}

interface ModelEditorProps {
    model: Model;
}

const ModelEditor: React.FC<ModelEditorProps> = ({model}) => {
    const [params, setParams] = useState<Param[]>(model.params);

    const handleParamChange = (paramId: string, value: string) => {
        const updatedParams = params.map((param) => {
            if (param.id === paramId) {
                return {...param, value};
            }
            return param;
        });
        setParams(updatedParams);
    };

    const getModel = (): Model => {
        return {
            ...model,
            params,
        };
    };

    return (
        <div>
            <h2>{model.name}</h2>
            {params.map((param) => (
                <ParamInput
                    key={param.id}
                    label={param.label}
                    value={param.value}
                    onChange={(value) => handleParamChange(param.id, value)}
                />
            ))}
            <button onClick={() => console.log(getModel())}>Save</button>
        </div>
    );
};


const models = [
    {
        id: "1",
        name: "Model 1",
        params: [
            {id: "1", label: "Param 1", value: "Value 1"},
            {id: "2", label: "Param 2", value: "Value 2"},
        ],
    },
    {
        id: "2",
        name: "Model 2",
        params: [
            {id: "3", label: "Param 3", value: "Value 3"},
            {id: "4", label: "Param 4", value: "Value 4"},
        ],
    },
];

function App() {
    return (
        <div className="App">
            {models.map((model) => (
                <ModelEditor key={model.id} model={model}/>
            ))}
        </div>
    );
}

export default App;
