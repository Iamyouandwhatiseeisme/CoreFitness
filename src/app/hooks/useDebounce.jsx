import { useEffect, useState } from "react";


function useDebounce(value, delay){
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedValue(value)
        }, delay)
        return ()=>{
            clearTimeout(handler);
        }
    },[value, delay])
    console.log(1)

    return debouncedValue;
}

export default useDebounce