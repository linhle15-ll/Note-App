'use client'
import React, { useEffect, useState } from 'react';
import { dateFormat } from '../utils/dateFormat'
import { Edit, Delete } from '../utils/icons';
import { useNoteStore, deleteNote, getNote, getNotes } from '../stores/noteStore'
import NoteModal from './noteModal';
import ExpandedNoteModal from './expandedNoteModal';
import ConfirmDeleteModal from './confirmDeleteModal'

const NoteCard = ({ id, title, content = '', tags, deadline, folder, lastUpdated, backgroundColor }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
    const [openExpandedNoteModal, setOpenExpandedNoteModal] = useState(false);

    const showNoteModal = () => {
        setOpenNoteModal(true);
        setSelectedId(id);
    }

    const showExpandedNoteModal = async() => {
        await getNote(id);
        setSelectedId(id);
        setOpenExpandedNoteModal(true);
    }

    const showConfirmDeleteNoteModal = () => {
        setOpenConfirmDeleteModal(true);
        setSelectedId(id);

    }

    return (
        <div className="flex flex-col gap-[1.4px] w-80 rounded-[10px] py-3 px-4 border border-lightGrey transition-all duration-300 ease-in-out transform hover:shadow-custom hover:scale-105" 
            style={{backgroundColor: backgroundColor}}
        >
            {/* tags */}
            <div className="flex flex-row justify-between items-center"> 
                <div className="flex flex-wrap max-w-[70%]">
                    {tags?.length > 0 && (
                        <div className="flex flex-center gap-2 flex-wrap mt-2">
                            {tags.map((tag, index) => (
                                <div key={index} className="flex items-center gap-1 text-sm text-slate-900 bg-white border border-darkGrey px-2 py-1 rounded">
                                    # {tag}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick = {showConfirmDeleteNoteModal}> {Delete} </button>
                
            </div>

            {/* title */}
            <div className="font-700 text-h8"> {title} </div>

            <div className='group'>
                <div className='w-60 break-words'>{content.slice(0,80)} 
                    <button className='cursor-pointer font-600' onClick={showExpandedNoteModal}>{content.length > 80 ? " ...Expand" : ""}</button>
                </div>
                {content.length > 80 && (
                    <div className="absolute flex flex-row justify-center bg-black/70 text-h11 p-2 h-3 w-30 mt-2 ml-40 rounded text-white opacity-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300"> 
                    Click to expand 
                    </div>
                )
                }
            </div>
            {/* deadline */}
            {deadline === null  && (
                <div className="text-darkGrey flex flex-row gap-1"> <span className='text-darkGrey font-600'>No deadline set</span> </div>
            )}
            {deadline !== null  && (
                <div className="text-darkGrey flex flex-row gap-1"> <span className='text-darkGrey font-600'>Deadline: </span>{dateFormat(deadline)} </div>
            )}
            {/* folder */}
            {folder.length > 0 &&(
                <div className="text-darkGrey font-600"> Folder: <span className="font-normal"> {folder} </span></div>
            )}

            {folder.length === 0 && (
                <div className='text-darkGrey font-600'> No folder set </div>
            )}
           
            <div className="flex flex-row justify-between"> 
                <div className="text-darkGrey font-normal"> 
                        {lastUpdated !== null  && (
                        <div className="text-darkGrey flex flex-row gap-1"> <span className="text-darkGrey font-600"> Last updated: </span> {dateFormat(lastUpdated)} </div>
                    )} 
                </div> 
                
                <button onClick = {showNoteModal}> {Edit} </button> 
            </div>
            
            <NoteModal id={selectedId} open={openNoteModal} setOpen={setOpenNoteModal} isUpdated={true} isCreated={false} />
            <ExpandedNoteModal id={selectedId} open={openExpandedNoteModal} setOpen={setOpenExpandedNoteModal} />
            <ConfirmDeleteModal id={selectedId} open={openConfirmDeleteModal} setOpen={setOpenConfirmDeleteModal} isFolder={false} isNote={true}/>
        </div>
    )
}

export default NoteCard;    