"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useDebounce from "../../hooks/useDebounce";


export default function SearchBar ({searchItemType}) {
    const [searchValue, setSearchValue] = useState("");
    const debouncedValue = useDebounce(searchValue, 500);
    const router = useRouter();
    useEffect(() => {
        if (debouncedValue) {
            router.push(`?search=${debouncedValue}`);
        }
    }, [debouncedValue, router]);

    return (
        <div>Search: <input 
            type="text"
            value={searchValue}
            onChange={(e)=>{
                setSearchValue(e.target.value);
            }}
            placeholder={searchItemType}
            title="search"></input>
            
        </div>

    )
}