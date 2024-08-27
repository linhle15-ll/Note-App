'use client'
import React, { useState } from 'react';
import { dateFormat } from '../utils/dateFormat'
import { Edit, Delete } from '../utils/icons';
import { useNoteStore, deleteNote } from '../stores/noteStore'
import NoteModal from './noteModal';

const NoteCard = ({_id, title, content, tags, deadline, folder, lastUpdated, backgroundColor}) => {
    const [selectedId, setSelectedId] = useState(null);
    const [openNoteModal, setOpenNoteModal] = useState(false);

    const showNoteModal = (_id) => {
        setOpenNoteModal(true);
        setSelectedId(_id);
    }
    return (
        <div className="flex flex-col gap-[1.4px] rounded-[10px] h-30 w-80 p-3 hover:shadow-custom" style={{backgroundColor: backgroundColor}}>
            {/* tags */}
            <div className="flex flex-row justify-between items-center"> 
                <div className="flex flex-wrap max-w-[70%]">
                    {tags?.length > 0 && (
                        <div className="flex flex-center gap-2 flex-wrap mt-2">
                            {tags.map((tag, index) => (
                                <span key={index} className="flex items-center gap-1 text-sm text-slate-900 bg-white px-3 py-1 rounded">
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
            <div>{content.slice(0,60)}</div>
            {deadline?.length !== 0  && (
                <div> {dateFormat(deadline)} </div>
            )}
            <div className="text-darkGrey font-600"> Folder: <span className="font-normal"> {folder} </span></div>
            <div className="flex flex-row"> 
                <div className="text-darkGrey font-600"> Last updated: <span className="font-normal"> {dateFormat(lastUpdated)} </span> </div>
                <button onClick = {() => showNoteModal(_id)}> {Edit} </button> 
            </div>
            
            <NoteModal id={selectedId} open={openNoteModal} setOpen={setOpenNoteModal} isUpdated={true} isCreated={false} />
        </div>
    )
}

export default NoteCard;    