'use client'
import React, { useEffect, useState } from 'react';
import { dateFormat } from '../utils/dateFormat'
import { Edit, Delete, Folder } from '../utils/icons';
import { useFolderStore, deleteFolder, getFolders } from '../stores/folderStore'
import FolderModal from './folderModal';
import ConfirmDeleteModal from './confirmDeleteModal'

const FolderCard = ({ id, name, lastUpdated }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [openFolderModal, setOpenFolderModal] = useState(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);

    const showFolderModal = () => {
        setOpenFolderModal(true);
        setSelectedId(id);
    }

    const showConfirmDeleteFolderModal = () => {
        setOpenConfirmDeleteModal(true);
        setSelectedId(id);

    }

    return (
        <div className="flex flex-col bg-white rounded-[10px] h-30 w-80 gap-3 py-3 px-4 border border-pastelViolet transition-all duration-300 ease-in-out transform hover:ring-1 hover:ring-pastelViolet hover:shadow-custom hover:scale-105" 
        >
            {/* tags */}
            <div className="flex flex-row justify-between items-center"> 
                {/* title */}
                {Folder}
                <button onClick = {showConfirmDeleteFolderModal}> {Delete} </button>
                
            </div>
            <div className="font-700 text-h8"> {name} </div>

            <div className="flex flex-row justify-between"> 
                <div className="text-darkGrey font-normal"> 
                        {lastUpdated !== null  && (
                        <div className="text-darkGrey flex flex-row gap-1"> <span className="text-darkGrey font-600"> Last updated: </span> {dateFormat(lastUpdated)} </div>
                    )} 
                </div> 
                
                <button onClick = {showFolderModal}> {Edit} </button> 
            </div>
            
            <FolderModal id={selectedId} open={openFolderModal} setOpen={setOpenFolderModal} isUpdated={true} isCreated={false} />
            <ConfirmDeleteModal id={selectedId} open={openConfirmDeleteModal} setOpen={setOpenConfirmDeleteModal} isFolder={true} isNote={false}/>
        </div>
    )
}

export default FolderCard;    