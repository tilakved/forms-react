import { useState } from "react";
import json from '../json/form.json';

export function useData(){
    
    const [data, setData] = useState(json);

    return data
}