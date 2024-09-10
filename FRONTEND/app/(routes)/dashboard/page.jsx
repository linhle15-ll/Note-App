"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import DashboardHeader from '../../components/dashboardHeader'
import SideMenu from "../../components/sideMenu"
import { Plus } from '../../utils/icons'
import FolderModal from '../../components/folderModal'
import NoteModal from '../../components/noteModal'
import FolderCard from '../../components/folderCard'
import NoteCard from '../../components/noteCard'
import { useFolderStore, getFolders } from '../../stores/folderStore'
import { useNoteStore } from '../../stores/noteStore'

const Dashboard = () => {
    const { foldersArr } = useFolderStore.getState();
    const { notesArr } = useNoteStore.getState()

    // Open add note modal
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [openFolderModal, setOpenFolderModal] = useState(false);

    const showNoteModal = () => setOpenNoteModal(true);

    const showFolderModal = () => setOpenFolderModal(true);

    return (
        
        <div>
            <DashboardHeader />
            <div className="flex flex-row bg-magnolia">
                <SideMenu />
                {/* Dashboard content */}
                <div className="flex flex-col p-9 pb-0 gap-9">
                    {/* Folders */}
                    <div className="flex flex-col">
                   
                        <div className="flex flex-row gap-2 items-center cursor-pointer">
                            <div className="text-darkGrey font-700 text-h7"> My Folders </div>
                            <div className='group flex gap-2'> 
                                <button onClick = {showFolderModal}> {Plus} </button>
                                <div className='flex flex-row justify-center bg-black/70 text-h11 p-2 h-3 w-30 mt-2 rounded text-white opacity-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300'
                                > Add New Folder </div>
                            </div>
                            
                        </div>
                        {/* Add Folder */}
                        <div className="flex flex-row gap-5 items-center p-2 overflow-auto">
                            <div className="flex flex-row items-center gap-5 w-[50%] mt-5 p-2">
                                {foldersArr?.map((folder, index) => (
                                    <div key={index}>
                                        <FolderCard 
                                            id={folder._id}
                                            name={folder.name}
                                            lastUpdated={folder.updatedAt}
                                        />

                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Notes */}
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2 items-center cursor-pointer">
                            <div className="text-darkGrey font-700 text-h7"> My Notes </div>
                            <div className='group flex gap-2'>
                                <button onClick = {showNoteModal}>{Plus}</button>
                                <div className='flex flex-row justify-center bg-black/70 text-h11 p-2 h-3 w-30 mt-2 rounded text-white opacity-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300'
                                > Add New Note </div>
                            </div>
                            
                        </div>
                        
                        {/* Add Notes */}
                        <div className="flex flex-col flex-wrap gap-5 max-w-[100%] h-[1000px] overflow-auto mt-5 p-2">
                            {notesArr?.map((note, index) => (
                                <div key={index}>
                                    <NoteCard 
                                        id={note._id}
                                        title={note.title}
                                        content={note.content}
                                        tags={note.tags}
                                        deadline={note.deadline}
                                        folder={note.folder}
                                        lastUpdated={note.updatedAt}
                                        backgroundColor={note.backgroundColor}
                                    />

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <FolderModal open={openFolderModal} setOpen={setOpenFolderModal} isUpdated={false} isCreated={true}/>
            <NoteModal id={null} open={openNoteModal} setOpen={setOpenNoteModal} isUpdated={false} isCreated={true} />
        </div>
    )
}

// export default Dashboard
export default dynamic (() => Promise.resolve(Dashboard), {ssr: false})