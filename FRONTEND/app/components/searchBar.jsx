'use client'
import React, { useState } from "react";
import dynamic from "next/dynamic"
import { useNoteStore } from '../stores/noteStore'
import { useFolderStore  } from "../stores/folderStore";

const SearchBar = () => {

    // const [ search, setSearch ] = useState("")
    // const [ filteredItem, setFilteredItem ] = useState("");

    // const { notesArr } = useNoteStore.getState();
    // const { foldersArr } = useFolderStore.getState();

    // const itemsArr = notesArr.concat(foldersArr)
    // const filteredItems = itemsArr.filter(item =>
    //     item?.title?.toLowerCase().includes(search.toLowerCase()) ||
    //     item?.content?.toLowerCase().includes(search.toLowerCase()) ||
    //     item?.tags?.some(tag => tag?.toLowerCase().includes(search.toLowerCase())) || // some: check at least one item in the tags array meet the condition
    //     item?.deadline?.includes(search) ||
    //     item?.lastUpdated?.includes(search) ||
    //     item?.folder?.toLowerCase().includes(search.toLowerCase()) ||
    //     item?.backgroundColor?.toLowerCase().includes(search.toLowerCase()) ||
    //     item?.name?.toLowerCase().includes(search.toLowerCase()) 
    // );

    // setFilteredItem(filteredItems)

    const handleSearChange = (e) => {
        // setSearch(e.target.value)
    }

    return (
        <form className="relative">
            <label htmlFor="Search" className="sr-only"> Search </label>

            <input
                type="text"
                id="Search"
                placeholder="Search for..."
                className="w-full rounded-md border border-gray-200 py-2.5 px-3 pr-10 shadow-sm focus:outline-none focus:border-strongViolet focus:ring-1 focus:strongViolet sm:text-sm"
                onChange={handleSearChange}
            />

            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </span>
        </form>
    );
}


export default dynamic (() => Promise.resolve(SearchBar), {ssr: false})

// export default SearchBar;
