'use client'
import React, { useState } from 'react';
import { dateFormat } from '../utils/dateFormat'
import { Edit, Delete } from '../utils/icons';
import { useNoteStore, deleteNote, getNote } from '../stores/noteStore'
import NoteModal from './noteModal';
import ExpandedNoteModal from './expandedNoteModal';

const NoteCard = ({ _id, title, content = '', tags, deadline, folder, lastUpdated, backgroundColor }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [openExpandedNoteModal, setOpenExpandedNoteModal] = useState(false);

    const showNoteModal = (_id) => {
        setOpenNoteModal(true);
        setSelectedId(_id);
    }

    const showExpandedNoteModal = (_id) => {
        setOpenExpandedNoteModal(true);
        // getNote(_id);
        setSelectedId(_id);
    }

    return (
        <div className="flex flex-col gap-[1.4px] min-w-80 rounded-[10px] py-3 px-4 border border-lightGrey hover:shadow-custom cursor:pointer" 
            style={{backgroundColor: backgroundColor}}
            onClick={() => showExpandedNoteModal(_id)}
        >
            {/* tags */}
            <div className="flex flex-row justify-between items-center"> 
                <div className="flex flex-wrap max-w-[70%]">
                    {tags?.length > 0 && (
                        <div className="flex flex-center gap-2 flex-wrap mt-2">
                            {tags.map((tag, index) => (
                                <span key={index} className="flex items-center gap-1 text-sm text-slate-900 bg-white border border-darkGrey px-2 py-1 rounded">
                                    # {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick = {() => deleteNote(_id)}> {Delete} </button>
            </div>

            {/* title */}
            <div className="font-700 text-h8"> {title} </div>
            <div>{content.slice(0,60)}{content.length > 60 ? "..." : ""} </div>
            {deadline !== null  && (
                <div className="text-darkGrey flex flex-row gap-1"> <span className='text-darkGrey font-600'>Deadline: </span>{dateFormat(deadline)} </div>
            )}
            
            
            <div className="text-darkGrey font-600"> Folder: <span className="font-normal"> {folder} </span></div>
            <div className="flex flex-row justify-between"> 
                <div className="text-darkGrey font-normal"> 
                        {lastUpdated !== null  && (
                        <div className="text-darkGrey flex flex-row gap-1"> <span className="text-darkGrey font-600"> Last updated: </span> {dateFormat(lastUpdated)} </div>
                    )} 
                </div> 
                
                <button onClick = {() => showNoteModal(_id)}> {Edit} </button> 
            </div>
            
            <NoteModal id={selectedId} open={openNoteModal} setOpen={setOpenNoteModal} isUpdated={true} isCreated={false} />
            <ExpandedNoteModal id={selectedId} open={openExpandedNoteModal} setOpen={setOpenExpandedNoteModal} />
        </div>
    )
}

export default NoteCard;    